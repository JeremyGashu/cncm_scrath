import { collection, doc, query, where } from "firebase/firestore"
import { database } from "../firebase"

const daysCount = { 0: 31, 1: 28, 2: 31, 3: 30, 4: 31, 5: 30, 6: 31, 7: 31, 8: 30, 9: 31, 10: 30, 11: 31, }


export const publishedBlogsQuery = query(
    collection(database, 'blog_description'),
    where('active', '==', true)
)

export const allBlogsForAdminQuery = query(
    collection(database, 'blog_description'),
);

export const allUsers = query(
    collection(database, 'users'),
);

export const allLikesDataQuery = query(
    collection(database, 'likesData'),
);

export const allViewsDataQuery = query(
    collection(database, 'viewsData'),
);


export const statsQuery = doc(database, 'stats', 'stats')



export const blogsByBloggerQuery = (id) => query(
    collection(database, 'blog_description'),
    where('bloggerId', '==', id))

export const unPublishedBlogsQuery = query(
    collection(database, 'blog_description'),
    where('active', '==', false)
)

export const usersAndBloggserQuery = () => query(
    collection(database, 'users'),
    where('role', 'not-in', ['admin', 'anonymous']),
)

export const ordinaryUsersQuery = () => query(
    collection(database, 'users'),
    where('role', '==', 'user'),
)

export const bloggersQuery = () => query(
    collection(database, 'users'),
    where('role', '==', 'blogger'),
)

export const getBlogsByMonthsQuery = (month) => {
    let date = new Date()
    let year = date.getFullYear()
    let startDate = new Date(year, month, 1)
    let endeDate = new Date(year, month, daysCount[month])
    return query(collection(database, 'blog_description'), where('createdAt', '>', startDate), where('createdAt', '<=', endeDate));
}

export const getLikesByMonthQuery = (month) => {
    let date = new Date()
    let year = date.getFullYear()
    let startDate = new Date(year, month, 1)
    let endeDate = new Date(year, month, daysCount[month])
    return query(collection(database, 'likesData'), where('timestamp', '>', startDate), where('timestamp', '<=', endeDate));
}

export const getViewsByMonthQuery = (month) => {
    let date = new Date()
    let year = date.getFullYear()
    let startDate = new Date(year, month, 1)
    let endeDate = new Date(year, month, daysCount[month])
    return query(collection(database, 'viewsData'), where('timestamp', '>', startDate), where('timestamp', '<=', endeDate));
}

export const getUsersByMonthQuery = (month) => {
    let date = new Date()
    let year = date.getFullYear()
    let startDate = new Date(year, month, 1)
    let endeDate = new Date(year, month, daysCount[month])
    return query(collection(database, 'users'), where('createdAt', '>', startDate), where('createdAt', '<=', endeDate));
}




export const singlePublishedBlog = (id) => {
    return doc(database, 'blog_blocks', id)
}

