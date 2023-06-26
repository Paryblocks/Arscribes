import { db } from "../firebase/config"
import { useState, useEffect } from 'react'
import { collection, getDoc, doc } from "firebase/firestore"

export const useRetrieveDatabase = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [cancelled, setCancelled] = useState(false)

    function checkIfIsCancelled(){
        if(cancelled){
            return
        }
    }

    //pegar info do usuario
    const retrieveUser = async (userId) => {
        checkIfIsCancelled()
        setLoading(true)

        try {
            const userDocRef = doc(collection(db, 'usuarios'), userId)
            const userDocSnapshot = await getDoc(userDocRef)

            if (userDocSnapshot.exists()) {
                setUser(userDocSnapshot.data())
            } else {
                console.log('Usuario não encontrado')
            }
        
        } catch (error) {
            console.log('Erro ao buscar usuário: ' + error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        loading,
        user,
        retrieveUser
    }
}