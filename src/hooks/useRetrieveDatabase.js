import { db } from "../firebase/config"
import { useState, useEffect } from 'react'
import { collection, getDoc, getDocs, doc } from "firebase/firestore"

export const useRetrieveDatabase = () => {
    const [sheet, setSheet] = useState(null)
    const [list, setList] = useState([])
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

    //pegar catalogo
    const getSheets = async () => {
        checkIfIsCancelled()
        setLoading(true)

        try {
            const sheetsRef = collection(db, 'fichas')
            const querySnapshot = await getDocs(sheetsRef)

            const newData = []
            querySnapshot.forEach((doc) => {
                newData.push({id: doc.id, ...doc.data()})
            })

            setList(newData)
        
        } catch (error) {
            console.log('Erro: ' + error)
        } finally {
            setLoading(false)
        }
    }

    //pegar informações de uma ficha
    const getInfo = async (sheetId) => {
        checkIfIsCancelled()
        setLoading(true)

        try {
            const sheetDocRef = doc(collection(db, 'fichas'), sheetId)
            const sheetDocSnapshot = await getDoc(sheetDocRef)

            if (sheetDocSnapshot.exists()) {
                setSheet(sheetDocSnapshot.data())
            } else {
                console.log('Ficha não encontrada')
            }
        
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
        loading,
        user,
        retrieveUser,
        getInfo,
        getSheets,
        sheet,
        list
    }
}