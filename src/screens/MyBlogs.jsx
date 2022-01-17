import { useState, useEffect } from "react"
import moment from "moment"
import { Avatar, Typography } from '@mui/material'
import { useAuth } from "../hooks/auth"
import { collectionData } from 'rxfire/firestore'
import { blogsByBloggerQuery } from "../query/query"
import FullPageLoading from "../components/FullPageLoading"
import { useNavigate } from "react-router"
import Navbar from "../components/NavBar"


const MyBLogs = () => {
    const { user, active } = useAuth()
    const [blogs, setBlogs] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        if (user && active) {
            setLoading(true)
            collectionData(blogsByBloggerQuery(user.uid), { idField: 'id' }).subscribe(blogs => {
                console.log(blogs)
                setBlogs(blogs)
                setLoading(false)
            })
        }
        return () => {

        }
    }, [user, active])
    return (
        <>
            <Navbar />
            {
                loading && <FullPageLoading />
            }

            <div className='container'>

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

                            <Typography sx={{ ml: 3, mb: 1, color: blog.active ? 'green' : 'yellow' }} >{blog.active ? 'Status : Published' : 'Statuc : Pending'}</Typography>
                        </div>
                    })
                }
            </div>
        </>
    )
}

export default MyBLogs