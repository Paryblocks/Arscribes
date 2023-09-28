import { db, storage } from "../firebase/config"

import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut, signInWithEmailAndPassword} from 'firebase/auth'
import { useState, useEffect } from 'react'
import { collection, setDoc, doc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

import defaultPf from '../images/DefaultPf.jpg'

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

            const storageRef = ref(storage, 'profiles/' + user.uid + '/perfil.jpg')
            
            const file = await fetch(defaultPf)
            const fileBlob = await file.blob()
           
            await uploadBytes(storageRef, fileBlob)
            const photoURL = await getDownloadURL(storageRef)

            const usuariosCollectionRef = collection(db, "usuarios")
            const userDocRef = doc(usuariosCollectionRef, user.uid)
            await setDoc(userDocRef, {
                displayName: data.nome,
                photoURL: photoURL,
                bio: null,
                sistemas: null,
                fichasCriadas: null,
                colecao: null,
                personagensCriados: null,
                registro: user.metadata.creationTime
            });

            await updateProfile(user, {
                displayName: data.nome,
                photoURL: photoURL
            })

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
        } finally {
            setLoading(false)
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
        } finally {
            setLoading(false)
        }
    }

    //editar

    const editUser = async (data) => {
        checkIfIsCancelled()
        setLoading(true)
        setError(null)

        try{
            await updateProfile(auth.currentUser, {
                displayName: data.nome,
            })

            const usuariosCollectionRef = collection(db, "usuarios")
            const userDocRef = doc(usuariosCollectionRef, auth.currentUser.uid)
            await setDoc(userDocRef, {
              displayName: data.nome,
              bio: data.bio,
              sistemas: data.sistemas.split(",").map((sistema) => sistema.trim()),
            }, { merge: true } )
        
            if (data.foto) {
                const storageRef = ref(storage, 'profiles/' + auth.currentUser.uid + '/perfil.jpg')

                await uploadBytes(storageRef, data.foto)

                const photoURL = await getDownloadURL(storageRef)

                await setDoc(userDocRef, {
                        photoURL: photoURL,
                    }, { merge: true } )

                    await updateProfile(auth.currentUser, {
                        photoURL: photoURL,
                    })
            }

        }catch(error){
            let systemErrorMessage
            systemErrorMessage = "Ocorreu um erro, por favor, tente mais tarde."
            setError(systemErrorMessage)
        } finally {
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
        login,
        editUser
    }
}