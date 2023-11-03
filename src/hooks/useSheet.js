import { db, storage } from '../firebase/config'
import { useState, useEffect } from 'react'
import { collection, updateDoc, setDoc, getDoc, doc, query, where, getDocs, deleteDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import { v4 } from 'uuid'


export const useSheet = () => {
    const [loading, setLoading] = useState(null)
    const [cancelled, setCancelled] = useState(false)
    const [folder, setFolder] = useState(null)
    
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
            return userSheets
        
        } catch (error) {
            console.log('Erro: ' + error)
            return []
        } finally {
            setLoading(false)
        }
    }

    //registrar coleção
    const postCollection = async (data) => {
        checkIfIsCancelled()
        setLoading(true)

        try{
            const sheetsCollectionRef = collection(db, "pastas");
            const sheetDocRef = doc(sheetsCollectionRef);
          
            const dataToInsert = {
              nome: data.nome,
              sistema: data.sistema,
              sheetURL: data.sheetURL,
              Idcriador: auth.currentUser.uid,
            };
          
            if (data.template) {
              dataToInsert.template = data.template;
            }
          
            if (data.tipo) {
              dataToInsert.tipo = data.tipo;
            }
          
            await setDoc(sheetDocRef, dataToInsert);

        }catch(error){
            console.log('Erro: ' + error)
        } finally {
            setLoading(false)
        }
    }

    //pegar informação de uma coleção
    const getContents = async (folderId) => {
        checkIfIsCancelled()
        setLoading(true)

        try {
            const sheetDocRef = doc(collection(db, 'pastas'), folderId)
            const sheetDocSnapshot = await getDoc(sheetDocRef)

            if (sheetDocSnapshot.exists()) {
                setFolder(sheetDocSnapshot.data())
            } else {
                console.log('Ficha não encontrada')
            }
        
        } catch (error) {
            console.log('Erro: ' + error)
        } finally {
            setLoading(false)
        }
    }

    //salva um personagem
    const saveCharacter = async (id, pdf) => {
        checkIfIsCancelled()
        setLoading(true)

        try {
            const fileName = v4() + '.pdf'
            const storageRef = ref(storage, 'characters/' + fileName)

            await uploadBytes(storageRef, pdf)
            const sheetURL = await getDownloadURL(storageRef)

            const usuariosCollectionRef = collection(db, "usuarios")
            const userDocRef = doc(usuariosCollectionRef, auth.currentUser.uid)

            const userDoc = await getDoc(userDocRef)
            const personagensCriados = userDoc.data().personagensCriados || []            
            personagensCriados.push(sheetURL)
            await updateDoc(userDocRef, { personagensCriados })

            const pastaRef = collection(db, "pastas")
            const pastaDocRef = doc(pastaRef, id)

            const pastaDoc = await getDoc(pastaDocRef)
            const personagensPasta = pastaDoc.data().personagensPasta || []            
            personagensPasta.push(sheetURL)
            await updateDoc(pastaDocRef, { personagensPasta })

        } catch (error) {
            console.log('Erro: ' + error)
        } finally {
            setLoading(false)
        }
    }

    //deletar coleção
    const deleteFolder = async (id, pdf) => {
        checkIfIsCancelled()
        setLoading(true)

        try {
            const characterRef = doc(db, 'pastas', id)
            await deleteDoc(characterRef)

            const pathname = pdf.pathname
            const pathSegments = pathname.split('/')
            const fileNameWithToken = pathSegments[pathSegments.length - 1]
            const fileName = fileNameWithToken.split('?')[0] 
          
            const storageRef = ref(storage, `characters/${fileName}`)
            await deleteObject(storageRef)

            const fieldRef = doc(db, `usuarios/${auth.currentUser.uid}/personagensCriados`);
            fieldRef.orderByValue().equalTo(pdf).once('value', (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    childSnapshot.ref.remove()
                })
            })
      
        } catch (error) {
            console.log('Erro: ' + error)
        } finally {
            setLoading(false)
        }
      }

    //deletar personagem
    const deleteChara = async (pdf) => {
        checkIfIsCancelled()
        setLoading(true)

        try {
            const fieldRef = doc(db, `usuarios/${auth.currentUser.uid}/personagensCriados`);
            fieldRef.orderByValue().equalTo(pdf).once('value', (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    childSnapshot.ref.remove()
                })
            })
      
        } catch (error) {
            console.log('Erro: ' + error)
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
        postCollection,
        getContents,
        saveCharacter,
        deleteFolder,
        deleteChara,
        folder,
        loading
    }
}