import axios from "axios"
import { BASE_URL } from "../../utils/urls"

export const fetchPosts = async () => {
    const result = await axios.get(`${BASE_URL}/posts`)
    return result.data
}

export const fetchComments = async (id) => {
    const result = await axios.get(`${BASE_URL}/comments?post=${id}`)
    return result.data
}

export const addComments = async ({ post, author_name, author_email, content }) => {

    let result = await axios({
        method: 'post',
        url: `${BASE_URL}/comments`,
        data: { post, author_email, author_name, content, date: new Date() }
    });




    if (result.status === 201) return true
    return false

}

export const getImageUrl = async (id, large = false) => {
    const mediaResult = await axios.get(`${BASE_URL}/media/${id}`)
    return large ? mediaResult.data.guid.rendered : mediaResult.data.media_details.sizes.medium.source_url
}

export const getAuthorName = async (id) => {
    const usersResult = await axios.get(`${BASE_URL}/users/${id}`)
    return usersResult.data.name
}