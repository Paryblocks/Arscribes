import { db, storage } from '../firebase/config'
import { useState, useEffect } from 'react'
import { collection, updateDoc, setDoc, getDoc, doc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
//lembrar de dar o Yarn add uuid
import { v4 } from 'uuid'


export const useSheet = () => {
    const [loading, setLoading] = useState(true)
    const [cancelled, setCancelled] = useState(false)
    
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
            const personagensCriados = userDoc.data().personagensCriados || []            
            personagensCriados.push(sheetURL)
            await updateDoc(userDocRef, { personagensCriados })

            const sheetsCollectionRef = collection(db, "fichas")
            const sheetDocRef = doc(sheetsCollectionRef, fileName)
            await setDoc(sheetDocRef, {
                nome: data.nome,
                descricao: data.descricao,
                sistema: data.sistema,
                sheetURL: sheetURL,
                Idcriador: auth.currentUser.uid
            })

        }catch(error){
            console.log('Erro: ' + error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        postSheet
    }
}