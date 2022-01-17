import moment from 'moment'
import React from 'react'
import { Table, Paper, Box, TableHead, TableRow, TableCell, TableBody, TableContainer, Typography, Switch, Button } from '@mui/material';

import { useState, useEffect } from 'react'
import { collectionData } from 'rxfire/firestore'
import FullPageLoading from '../components/FullPageLoading'
import Navbar from '../components/NavBar'
import { useAuth } from '../hooks/auth'
import { allBlogsForAdminQuery } from '../query/query'
import { publishBlog, unpublishBlog } from '../utils/firebase/blog_management';
import { useNavigate } from 'react-router-dom';
const AdminBlogs = () => {
    const { user, active } = useAuth()
    const [loading, setLoading] = useState()
    const [blogs, setBlogs] = useState()
    const [rows, setRows] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        if (user && active) {
            setLoading(true)
            collectionData(allBlogsForAdminQuery, { idField: 'id' }).subscribe(blogs => {
                console.log(blogs)
                setBlogs(blogs)
                let blogRows = blogs.map(blog => createData(blog))
                setRows(blogRows)
                setLoading(false)
            })
        }
        return () => {

        }
    }, [user, active])

    const handleBlogStateChange = (e, blog_id) => {
        // console.log(e.target.checked)
        // console.log(blog_id)
        if (e.target.checked) {
            publishBlog(blog_id)
        }
        else if (!e.target.checked) {
            unpublishBlog(blog_id)
        }
    }

    const createData = ({ blogger, createdAt, readTime, title, active, id }) => {
        return { blogger, createdAt, readTime, title, active, id };
    }

    return (
        <div>
            <Navbar />
            {
                loading && <FullPageLoading />
            }

            {
                !loading && blogs &&
                <Box>
                    <Box sx={{ padding: 5 }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><Typography sx={{ fontSize: 12 }}>Name</Typography></TableCell>
                                        <TableCell align="right"><Typography sx={{ fontSize: 12 }}>Crated At</Typography></TableCell>
                                        <TableCell align="right"><Typography sx={{ fontSize: 12 }}>Read Time</Typography></TableCell>
                                        <TableCell align="right"><Typography sx={{ fontSize: 12 }}>Title</Typography></TableCell>
                                        <TableCell align="right"><Typography sx={{ fontSize: 12 }}>Activity Status</Typography></TableCell>
                                        {/* <TableCell align="right"><Typography sx={{ fontSize: 12 }}>Deleted</Typography></TableCell> */}
                                        <TableCell align="right"><Typography sx={{ fontSize: 12 }}>Change Status</Typography></TableCell>
                                        <TableCell align="right"><Typography sx={{ fontSize: 12 }}>View</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Typography sx={{ fontSize: 12 }}>{row.blogger}</Typography>
                                            </TableCell>
                                            <TableCell align="right"><Typography sx={{ fontSize: 12 }}>{moment(row.createdAt.toDate()).fromNow()}</Typography></TableCell>
                                            <TableCell align="right"><Typography sx={{ fontSize: 12 }}>{row.readTime + ' Minutes'}</Typography></TableCell>
                                            <TableCell align="right"><Typography sx={{ fontSize: 12 }}>{row.title}</Typography></TableCell>
                                            <TableCell align="right"><Typography sx={{ color: row.active ? 'green' : 'red', fontSize: 12 }}>{row.active ? 'Published' : 'Unpublished'}</Typography></TableCell>
                                            <TableCell align="right"><Switch checked={row.active} onChange={(e) => { handleBlogStateChange(e, row.id) }} color='success'>Active</Switch></TableCell>
                                            <TableCell align="right"><Button color='secondary' onClick={() => { navigate(`/blogs/${row.id}`) }} >Read</Button></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            }
        </div>
    )
}


export default AdminBlogs