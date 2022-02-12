import { BASE_URL } from "../../utils/urls"

export const fetchPosts = async () => {
    const result = await fetch(`${BASE_URL}/posts`)
    return result.json()
}

export const fetchComments = async (id) => {
    const result = await fetch(`${BASE_URL}/comments?post=${id}`)
    return result.json()
}

export const addComments = async () => {

}

export const getImageUrl = async (id) => {
    const mediaResult = await fetch(`${BASE_URL}/media/${id}`)
    const mediaJson = await mediaResult.json()
    return mediaJson.source_url
}

export const getAuthorName = async (id) => {
    const usersResult = await fetch(`${BASE_URL}/users/${id}`)
    const userJson = await usersResult.json()
    return userJson.name
}