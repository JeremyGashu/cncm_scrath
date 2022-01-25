import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, signInAnonymously, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import React, { useState, useEffect, useContext, createContext } from 'react'
import { auth, database } from '../firebase'
import { authState } from 'rxfire/auth'
import { addUserInfo, addUserToDatabase, getUserByUserId, userRegistered } from '../utils/firebase/user_management'
import { doc, increment, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'

const authContext = createContext()

export const AuthProvider = ({ children }) => {
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
                await updateDoc(doc(database, 'stats', 'stats'), { anonymous_users: increment(1) })
                let user = { uid: rawUser.uid, name: 'Anonymous', email: '', role: 'anonymous', active: true, image: '', createdAt: serverTimestamp() }
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
                    if (!userData.data()['uid']) {
                        console.log('adding the rest of the user data user data')
                        await addUserInfo({ uid: user.uid, email: user.email, role: 'user', active: true, createdAt: serverTimestamp() })
                        await updateDoc(doc(database, 'stats', 'stats'), { registered_users: increment(1) })
                        setCurrentRole('user')
                        setActive(true)
                    }
                    else {
                        setCurrentRole(userData.data()['role'])
                        setActive(userData.data()['active'])
                    }

                }
                else {
                    let success = await addUserToDatabase({ uid: user.uid, name: user.name, email: user.email, role: 'user', active: true, image: user.photoUrl, createdAt: serverTimestamp() })
                    await updateDoc(doc(database, 'stats', 'stats'), { registered_users: increment(1) })
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

    const signInWithFacebook = () => {
        signInWithPopup(auth, new FacebookAuthProvider())
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                console.log(user)

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                console.log(credential)
                const accessToken = credential.accessToken;
                console.log(accessToken)

                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);

                // ...
            });
    }

    const registerUserManually = async (email, password, name, image) => {
        setLoading(true)
        let userExists = await userRegistered(email)
        if (userExists) {
            return { success: false, message: 'User is registered with this email!' }
        }
        try {
            let userCredential = await createUserWithEmailAndPassword(auth, email, password)

            if (userCredential.user) {
                let userRef = doc(database, 'users', userCredential.user.uid)
                await setDoc(userRef, { name, image }, { merge: true })
            }

            return { success: true }
        } catch {
            return { success: false, message: 'Error creating user. Please try Again!' }
        }
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
        signInWithFacebook,
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