import { collection, doc, query, where } from "firebase/firestore"
import { database } from "../firebase"

export const publishedBlogsQuery = query(
    collection(database, 'blog_description'),
    where('active', '==', true)
)

export const unPublishedBlogsQuery = query(
    collection(database, 'blog_description'),
    where('active', '==', false)
)


export const singlePublishedBlog = (id) => {
    return doc(database,'blog_blocks', id)
}

