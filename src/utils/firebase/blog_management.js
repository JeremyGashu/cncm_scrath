import { addDoc, arrayUnion, collection, doc, getDoc, deleteDoc,increment, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
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
            active: false,
            comments: [],
            createdAt: serverTimestamp(),
            commentsCount: 0,
            likesCount: 0,
            viewsCount: 0,
            title: blogDescription.title || '',
            coverImage: blogDescription.coverImage || '',
            bloggerId: blogDescription.bloggerId || '',
            blogger: blogDescription.blogger
        };
        await setDoc(doc(database, "blog_blocks", res.id), blogMeta);
        await updateDoc(doc(database, 'users', blogDescription.bloggerId), { posts: increment(1) })
        await updateDoc(doc(database, 'stats', 'stats'), { likes: increment(1) })

        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export const likeBlog = async (user, blogId, bloggerId) => {
    let docRef = doc(database, 'blog_blocks', blogId)
    let descriptionRef = doc(database, 'blog_description', blogId)
    await updateDoc(docRef, { likes: arrayUnion(user.uid), likesCount: increment(1) })
    await updateDoc(descriptionRef, { likesCount: increment(1) })
    await updateDoc(doc(database, 'stats', 'stats'), { likes: increment(1) })
    await addDoc(collection(database, 'likesData'), { timestamp: serverTimestamp() })
    await addDoc(collection(database, 'notifications'), { notification: `${user.name} Liked your blog`, timestamp: serverTimestamp(), to: bloggerId, seen: false });
}

export const addCommentToBlog = async (comment, blog) => {
    console.log(comment)
    let docRef = doc(database, 'blog_blocks', comment.blogId)
    let descriptionRef = doc(database, 'blog_description', comment.blogId)
    await updateDoc(docRef, { comments: arrayUnion(comment), commentsCount: increment(1) })
    await updateDoc(descriptionRef, { commentsCount: increment(1) })
    await addDoc(collection(database, 'notifications'), { notification: `${comment.username} commentd your blog.`, timestamp: serverTimestamp(), to: blog.bloggerId, seen: false });
}

export const publishBlog = (id) => {
    const userRef = doc(database, 'blog_description', id)
    const blogMetaRef = doc(database, 'blog_blocks', id)
    updateDoc(userRef, { active: true })
    updateDoc(blogMetaRef, { active: true })
}

export const markNotificationAsRead = async (id) => {
    const userRef = doc(database, 'notifications', id)
    await updateDoc(userRef, { seen: true })
}

export const unpublishBlog = (id) => {

    const userRef = doc(database, 'blog_description', id)
    const blogMetaRef = doc(database, 'blog_blocks', id)
    updateDoc(userRef, { active: false })
    updateDoc(blogMetaRef, { active: false })
}

export const deleteBlog = async (id) => {

    const userRef = doc(database, 'blog_description', id)
    const blogMetaRef = doc(database, 'blog_blocks', id)
    await deleteDoc(userRef)
    await deleteDoc(blogMetaRef)
    return true
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
        console.log('difference', difference)
        if (difference > 10) {
            console.log('Updating Views data again')
            const blogRef = doc(database, 'blog_blocks', blogId)
            await setDoc(viewsRef, { lastSeen: serverTimestamp() })
            await updateDoc(blogRef, { viewsCount: increment(1) })
            await updateDoc(doc(database, 'stats', 'stats'), { views: increment(1) })
            await addDoc(collection(database, 'viewsData'), { timestamp: serverTimestamp() })

            return true
        }
        else {
            console.log('views data shoud not be incremented!')
            return false
        }
    }
}