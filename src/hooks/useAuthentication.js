import { db } from "../firebase/config"

import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut, signInWithEmailAndPassword} from 'firebase/auth'
import { useState, useEffect } from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled(){
        if(cancelled){
            return
        }
    }

    //cadastro

    const createUser = async (data) => {
        checkIfIsCancelled()
        setLoading(true)
        setError(null)

        try{
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.senha
            )

            await updateProfile(user, {
                displayName: data.nome
            })

            setLoading(false)

            return user

        }catch(error){
            let systemErrorMessage
            if(error.message.includes("Password")){
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres."
            }else if(error.message.includes("email-already")){
                systemErrorMessage = "E-mail já cadastrado."
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor, tente mais tarde."
            }
            setError(systemErrorMessage)
        }
    }

    //logout

    const logout = () => {
        checkIfIsCancelled()
        signOut(auth)
    }

    //login

    const login = async(data) => {
        checkIfIsCancelled()
        setLoading(true)
        setError(false)

        try{
            await signInWithEmailAndPassword(auth, data.email, data.senha)
            setLoading(false)
        } catch (error) {
            let systemErrorMessage
            if(error.message.includes("user-not-found")){
                systemErrorMessage = "Usuário não encontrado."
            }else if(error.message.includes("wrong-password")){
                systemErrorMessage = "Senha incorreta."
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor, tente mais tarde."
            }
            setError(systemErrorMessage)
            setLoading(false)
        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }
}