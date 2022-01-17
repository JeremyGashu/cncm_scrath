import { createUserWithEmailAndPassword, GoogleAuthProvider, signInAnonymously, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import React, { useState, useEffect, useContext, createContext } from 'react'
import { auth } from '../firebase'
import { authState } from 'rxfire/auth'
import { addUserToDatabase, getUserByUserId, userRegistered } from '../utils/firebase/user_management'

const authContext = createContext()

export function AuthProvider({ children }) {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext)
}

function useProvideAuth() {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState()
    const [currentRole, setCurrentRole] = useState()
    const [active, setActive] = useState()
    const [isAnonymous, setIsAnonymous] = useState()


    const handleUser = async (rawUser) => {
        if (rawUser) {
            if (rawUser.isAnonymous) {
                setActive(false)
                setIsAnonymous(true)
                setCurrentRole('anonymous')
                let user = { uid: rawUser.uid, name: 'Anonymous', email: '', role: 'anonymous', active: true, image: '' }
                await addUserToDatabase(user)
                setUser(user)
            }
            else {
                setIsAnonymous(false)

                const user = formatUser(rawUser)
                const userData = await getUserByUserId(user.uid)

                console.log(user)
                setUser(user)
                if (userData.exists && userData.data()) {

                    setCurrentRole(userData.data()['role'])
                    setActive(userData.data()['active'])
                }
                else {

                    let success = await addUserToDatabase({ uid: user.uid, name: user.name, email: user.email, role: 'user', active: true, image: user.photoUrl })
                    console.log(success)
                    setCurrentRole('user')
                }
            }
            setLoading(false)
            return user
        } else {
            await signInAnonymously(auth)
            return false
        }
    }

    const loginAnonymously = () => {
        return signInAnonymously(auth)
    }

    const signInWithGoogle = () => {

        setLoading(true)
        return signInWithPopup(auth, new GoogleAuthProvider())
    }

    const registerUserManually = async (email, password) => {
        setLoading(true)
        let userExists = await userRegistered(email)
        if (userExists) {
            return { success: false, message: 'User is registered with this email!' }
        }
        return createUserWithEmailAndPassword(auth, email, password)
            .then((response) => {
                return { success: true }
            }).catch(e => {
                return { success: false, message: 'Error creating user. Please try Again!' }
            })
    }

    const loginManually = async (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                if (response.user) {
                    return { success: true }
                }
                else {
                    return { success: false, message: 'Incorrect username or passwrd!' }
                }

            }).catch(e => {
                if (e.code === 'auth/user-not-found') {
                    return { success: false, message: 'Incorrect username or password!' }
                }
                else {
                    console.log(e.code)
                    return { success: false, message: 'Error signing in. Please try Again!' }
                }
            })
    }


    const signout = async () => {
        
        setCurrentRole('')
        await signOut(auth)
        console.log(user)
    }

    useEffect(() => {
        authState(auth).subscribe(user => {
            console.log(user)
            handleUser(user)
        });
    }, [])

    return {
        user,
        loading,
        currentRole,
        active,
        isAnonymous,
        loginAnonymously,
        loginManually,
        registerUserManually,
        signInWithGoogle,
        signout,
    }
}

const formatUser = (user) => {
    return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL,
    }
}