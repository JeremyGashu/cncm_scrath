import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
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
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [currentRole, setCurrentRole] = useState(null)


    const handleUser = async (rawUser) => {
        if (rawUser) {
            const user = formatUser(rawUser)
            const userData = await getUserByUserId(user.uid)

            console.log(user)
            setUser(user)
            if (userData.exists && userData.data()) {

                setCurrentRole(userData.data()['role'])
            }
            else {

                let success = await addUserToDatabase({ uid: user.uid, name: user.name, email: user.email, role: 'user', active: true, image: user.photoUrl })
                console.log(success)
                setCurrentRole('user')
            }
            setLoading(false)

            return user
        } else {
            setLoading(false)
            setUser(false)
            return false
        }
    }

    const signinWithGitHub = () => {

        setLoading(true)
        return signInWithPopup(auth, new GithubAuthProvider())
            .then((response) => {
                console.log(response.user)
            })
    }

    const registerUserManually = async (email, password) => {
        setLoading(true)
        let userExists = await userRegistered(email)
        if (userExists) {
            return { success: false, message: 'User is registered with this email!' }
        }
        return createUserWithEmailAndPassword(auth, email, password)
            .then((response) => {
                handleUser(response.user)
                return { success: true }
            }).catch(e => {
                return { success: false, message: 'Error creating user. Please try Again!' }
            })
    }

    const loginManually = async (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                if (response.user) {
                    handleUser(response.user)
                    return { success: true }
                }
                else {
                    return { success: false, message: 'Incorrect username or passwrd!' }
                }

            }).catch(e => {
                if (e.code = 'auth/user-not-found') {
                    return { success: false, message: 'Incorrect username or password!' }
                }
                else {
                    console.log(e.code)
                    return { success: false, message: 'Error signing in. Please try Again!' }
                }
            })
    }

    const signInWithGoogle = () => {

        setLoading(true)
        return signInWithPopup(auth, new GoogleAuthProvider())
    }


    const signout = async () => {
        console.log(user)
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
        loginManually,
        registerUserManually,
        signinWithGitHub,
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