import { collection, doc, query, where } from "firebase/firestore"
import { database } from "../firebase"

export const publishedBlogsQuery = query(
    collection(database, 'blog_description'),
    where('active', '==', true)
)

export const allBlogsForAdminQuery = query(
    collection(database, 'blog_description'),
    // where('state', '==', 'CO')
);

export const blogsByBloggerQuery = (id) => query(
    collection(database, 'blog_description'),
    where('bloggerId', '==', id))

export const unPublishedBlogsQuery = query(
    collection(database, 'blog_description'),
    where('active', '==', false)
)

export const usersAndBloggserQuery = () => query(
    collection(database, 'users'),
    where('role', '!=', 'admin')
)


export const singlePublishedBlog = (id) => {
    return doc(database, 'blog_blocks', id)
}

