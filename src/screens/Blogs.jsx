import { Avatar, Card } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Navbar from '../components/NavBar'
import { collectionData} from 'rxfire/firestore'
import { publishedBlogsQuery } from '../query/query'
import FullPageLoading from '../components/FullPageLoading'
import moment from 'moment'
import {  useNavigate } from 'react-router-dom'



const BlogsPage = () => {

    const [blogs, setBlogs] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        collectionData(publishedBlogsQuery, {idField : 'id'})
            .subscribe(blogs => {
                console.log(blogs)
                setBlogs(blogs)
                setLoading(false)
            })
        return () => {

        }
    }, [])

    return (
        <div>
            <Navbar />
            {loading && <FullPageLoading />}
            <div className="container">
                {!loading && blogs &&
                    blogs.map(blog => {
                        return <div onClick={() => {
                            navigate(`/blogs/${blog.id}`)
                            console.log(blog.id)
                        }} key={blog.id} className="card">
                            <div className="card__header">
                                <img src={blog.coverImage} alt="card__image" className="card__image" width={600} />
                            </div>
                            <div className="card__body">
                                <h4>{blog.title}</h4>
                                <p>{blog.description}</p>
                            </div>
                            <div className="card__footer">
                                <div className="user">
                                    <Avatar />
                                    <div className="user__info">
                                        <h5>{blog.blogger}</h5>
                                        <small>{moment(blog.createdAt.toDate()).fromNow()}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>

            <Card>

            </Card>
        </div>
    )
}


export default BlogsPage