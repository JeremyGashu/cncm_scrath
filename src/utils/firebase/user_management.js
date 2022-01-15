import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
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
        await setDoc(userRef, userInfo)
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

export {
    getUserByUserId,
    addUserToDatabase,
    userRegistered
}