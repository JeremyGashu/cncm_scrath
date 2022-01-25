import { useState, useEffect } from "react"
import { useAuth } from "../hooks/auth"
import { collectionData } from 'rxfire/firestore'
import { blogsByBloggerQuery } from "../query/query"
import FullPageLoading from "../components/FullPageLoading"
import { useNavigate } from "react-router"
import Navbar from "../components/NavBar"
import BlogCard from "../components/BlogCard"


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
                        return <BlogCard blog={blog} />
                    })
                }
            </div>
        </>
    )
}

export default MyBLogs