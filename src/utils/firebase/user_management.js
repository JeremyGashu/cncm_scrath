import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { database } from "../../firebase";


const getUserByUserId = async (userId) => {
    const userRef = doc(database, 'users', userId);
    let userData = await getDoc(userRef)
    return userData
}

const addUserToDatabase = async (userInfo) => {
    try {
        console.log(userInfo)
        const userRef = doc(database, 'users', userInfo.uid);
        await setDoc(userRef, userInfo, { merge: true })
        return true
    }
    catch (e) {
        console.log(e)
        return false
    }
}
const addUserInfo = async (userInfo) => {
    try {
        const userRef = doc(database, 'users', userInfo.uid);
        await setDoc(userRef, userInfo, { merge: true })
        return true
    }
    catch (e) {
        console.log(e)
        return false
    }
}

const userRegistered = async (email) => {
    const q = query(collection(database, "users"), where("email", "==", email));
    let userData = await getDocs(q)
    return userData.size > 0
}

const suspendUser = (id) => {
    const userRef = doc(database, 'users', id)
    updateDoc(userRef, { active: false })
}

const activateUser = (id) => {
    const userRef = doc(database, 'users', id)
    updateDoc(userRef, { active: true })
}

const revokeBloggerRole = (id) => {
    const userRef = doc(database, 'users', id)
    updateDoc(userRef, { role: 'user' })
}

const grantBloggerRole = (id) => {
    const userRef = doc(database, 'users', id)
    updateDoc(userRef, { role: 'blogger' })
}

export {
    getUserByUserId,
    addUserToDatabase,
    userRegistered,
    suspendUser,
    activateUser,
    grantBloggerRole,
    revokeBloggerRole,
    addUserInfo,
}