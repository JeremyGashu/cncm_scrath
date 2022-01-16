import { addDoc, arrayUnion, collection, doc, increment, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
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
            createdAt: serverTimestamp(),
            commentsCount: 0,
            likesCount: 0,
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