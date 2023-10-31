import { db, storage } from '../firebase/config'
import { useState, useEffect } from 'react'
import { collection, updateDoc, setDoc, getDoc, doc, query, where, getDocs } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import { v4 } from 'uuid'


export const useSheet = () => {
    const [loading, setLoading] = useState(null)
    const [cancelled, setCancelled] = useState(false)
    const [folders, setFolders] = useState(null)
    
    const auth = getAuth()

    function checkIfIsCancelled(){
        if(cancelled){
            return
        }
    }

    //postar modelo pronto
    const postSheet = async (data) => {
        checkIfIsCancelled()
        setLoading(true)

        try{
            const fileName = v4() + '.pdf'
            const storageRef = ref(storage, 'sheets/' + fileName)

            await uploadBytes(storageRef, data.file)
            const sheetURL = await getDownloadURL(storageRef)

            const usuariosCollectionRef = collection(db, "usuarios")
            const userDocRef = doc(usuariosCollectionRef, auth.currentUser.uid)

            const userDoc = await getDoc(userDocRef)
            const fichasCriadas = userDoc.data().fichasCriadas || []            
            fichasCriadas.push(sheetURL)
            await updateDoc(userDocRef, { fichasCriadas })

            const sheetsCollectionRef = collection(db, "fichas")
            const sheetDocRef = doc(sheetsCollectionRef, fileName)
            await setDoc(sheetDocRef, {
                nome: data.nome,
                descricao: data.descricao,
                sistema: data.sistema,
                template: data.templ,
                tipo: data.type,
                sheetURL: sheetURL,
                Idcriador: auth.currentUser.uid,
                NomeCriador: auth.currentUser.displayName
            })

        }catch(error){
            console.log('Erro: ' + error)
        } finally {
            setLoading(false)
        }
    }

    //adicionar ficha na coleção
    const addSheet = async (data) => {
        checkIfIsCancelled()
        setLoading(true)

        try{
            const usuariosCollectionRef = collection(db, "usuarios")
            const userDocRef = doc(usuariosCollectionRef, auth.currentUser.uid)

            const userDoc = await getDoc(userDocRef)
            const colecao = userDoc.data().colecao || []  
            colecao.push(data)
            await updateDoc(userDocRef, { colecao })
        } catch(error) {
            console.log('Erro: ' + error)
        } finally {
            setLoading(false)
        }
    }

    //pegar pastas
    const getFolders = async () => {
        checkIfIsCancelled()
        setLoading(true)

        try {
            const sheetsQuery = query(collection(db, 'pastas'), where('Idcriador', '==', auth.currentUser.uid));
            const sheetsQuerySnapshot = await getDocs(sheetsQuery);
            const userSheets = sheetsQuerySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() }
              })
            setFolders(userSheets)
        
        } catch (error) {
            console.log('Erro: ' + error)
            return []
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        postSheet,
        addSheet,
        getFolders,
        folders,
        loading
    }
}