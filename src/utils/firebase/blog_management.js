import { addDoc, arrayUnion, collection, doc, getDoc, increment, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { database } from "../../firebase";

export const addBlogData = async (blogDescription, savedData) => {
    const blogsDescriptionRef = collection(database, "blog_description");
    console.log(blogDescription)

    try {
        let res = await addDoc(blogsDescriptionRef, blogDescription)
        const blogMeta = {
            id: res.id,
            blockData: JSON.stringify(savedData.blocks),
            likes: [],
            comments: [],
            createdAt: serverTimestamp(),
            commentsCount: 0,
            likesCount: 0,
            viewsCount: 0,
            coverImage: blogDescription.coverImage || '',
            bloggerId: blogDescription.bloggerId || '',
            blogger: blogDescription.blogger
        };
        await setDoc(doc(database, "blog_blocks", res.id), blogMeta);
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export const likeBlog = async (userId, blogId) => {
    let docRef = doc(database, 'blog_blocks', blogId)
    await updateDoc(docRef, { likes: arrayUnion(userId), likesCount: increment(1) })
}

export const addCommentToBlog = async (comment) => {
    console.log(comment)
    let docRef = doc(database, 'blog_blocks', comment.blogId)
    await updateDoc(docRef, { comments: arrayUnion(comment), commentsCount: increment(1) })
}

export const publishBlog = (id) => {
    const userRef = doc(database, 'blog_description', id)
    updateDoc(userRef, { active: true })
}

export const unpublishBlog = (id) => {
    const userRef = doc(database, 'blog_description', id)
    updateDoc(userRef, { active: false })
}

export const updateViewData = async (userId, blogId) => {
    const viewsRef = doc(database, 'views', `${userId}_${blogId}`)
    const viewData = await getDoc(viewsRef)
    console.log(viewData.exists())
    if (!viewData.exists()) {
        const blogRef = doc(database, 'blog_blocks', blogId)
        await setDoc(viewsRef, { lastSeen: serverTimestamp() })
        await updateDoc(blogRef, { viewsCount: increment(1) })
        return true
    }
    else {
        //saved last seen time
        const lastSeenTimeStamp = viewData.data()['lastSeen'].seconds * 1000
        const currentDate = new Date()
        //current timestamp
        const currentTimeStamp = currentDate.getTime()

        //difference between current timestamp and lastseen timestamp
        const difference = (currentTimeStamp - lastSeenTimeStamp) / (60 * 1000)
        console.log('difference',difference)
        if (difference > 10) {
            console.log('Updating Views data again')
            const blogRef = doc(database, 'blog_blocks', blogId)
            await setDoc(viewsRef, { lastSeen: serverTimestamp() })
            await updateDoc(blogRef, { viewsCount: increment(1) })
            return true
        }
        else {
            console.log('views data shoud not be incremented!')
            return false
        }
    }
}