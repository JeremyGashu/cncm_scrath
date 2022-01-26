import moment from 'moment'
import React from 'react'
import { Table, Paper, Box, TableHead, TableRow, TableCell, TableBody, TableContainer, Typography, Switch, Button, IconButton, Grid } from '@mui/material';

import { useState, useEffect } from 'react'
import { collectionData } from 'rxfire/firestore'
import FullPageLoading from '../components/FullPageLoading'
import Navbar from '../components/NavBar'
import { useAuth } from '../hooks/auth'
import { allBlogsForAdminQuery } from '../query/query'
import { publishBlog, unpublishBlog } from '../utils/firebase/blog_management';
import { useNavigate } from 'react-router-dom';
import { VisibilityOutlined } from '@mui/icons-material';
import { kGreenColor } from '../styles/colors';
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

    const createData = ({ blogger, createdAt, readTime, title, active, id, likesCount, commentsCount }) => {
        return { blogger, createdAt, readTime, title, active, id, likesCount, commentsCount };
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
                            <Table sx={{ maxWidth: 700 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right"><Typography sx={{ fontSize: 12 }}>Title</Typography></TableCell>
                                        <TableCell align="right"><Typography sx={{ fontSize: 12 }}>Likes</Typography></TableCell>
                                        <TableCell align="right"><Typography sx={{ fontSize: 12 }}>Comments</Typography></TableCell>
                                        {/* <TableCell align="right"><Typography sx={{ fontSize: 12 }}>Views</Typography></TableCell> */}
                                        <TableCell align="right"><Typography sx={{ fontSize: 12 }}>View</Typography></TableCell>
                                        <TableCell align="right"><Typography sx={{ fontSize: 12 }}>Published</Typography></TableCell>

                                        {/* <TableCell><Typography sx={{ fontSize: 12 }}>Name</Typography></TableCell> */}
                                        {/* <TableCell align="right"><Typography sx={{ fontSize: 12 }}>Crated At</Typography></TableCell> */}
                                        {/* <TableCell align="right"><Typography sx={{ fontSize: 12 }}>Read Time</Typography></TableCell> */}
                                        {/* <TableCell align="right"><Typography sx={{ fontSize: 12 }}>Title</Typography></TableCell> */}
                                        {/* <TableCell align="right"><Typography sx={{ fontSize: 12 }}>Activity Status</Typography></TableCell> */}
                                        {/* <TableCell align="right"><Typography sx={{ fontSize: 12 }}>Deleted</Typography></TableCell> */}
                                        {/* <TableCell align="right"><Typography sx={{ fontSize: 12 }}>Change Status</Typography></TableCell> */}
                                        {/* <TableCell align="right"><Typography sx={{ fontSize: 12 }}>View</Typography></TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Box>
                                                    <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>{row.title}</Typography>
                                                    <Grid container alignItems='center'>
                                                        <Typography sx={{ fontSize: 13, mr: 2 }}>{row.blogger}</Typography>
                                                        <Typography sx={{ fontSize: 11, color: '#444' }}>{moment(row.createdAt.toDate()).fromNow()}</Typography>
                                                    </Grid>
                                                </Box>
                                            </TableCell>

                                            <TableCell component="th" scope="row">
                                                <Typography align="right" sx={{ fontSize: 12 }}>{row.likesCount}</Typography>
                                            </TableCell>

                                            <TableCell component="th" scope="row">
                                                <Typography align="right" sx={{ fontSize: 12 }}>{row.commentsCount}</Typography>
                                            </TableCell>

                                            {/* <TableCell component="th" scope="row">
                                                <Typography sx={{ fontSize: 12 }}>{row.views}</Typography>
                                            </TableCell> */}
                                            <TableCell align="right"><IconButton onClick={() => { navigate(`/blogs/${row.id}`) }} ><VisibilityOutlined sx={{ color: kGreenColor }}></VisibilityOutlined></IconButton></TableCell>


                                            <TableCell align="right"><Switch checked={row.active} onChange={(e) => { handleBlogStateChange(e, row.id) }} color='success'>Active</Switch></TableCell>

                                            {/* <TableCell align="right"><Typography sx={{ fontSize: 12 }}>{moment(row.createdAt.toDate()).fromNow()}</Typography></TableCell>
                                            <TableCell align="right"><Typography sx={{ fontSize: 12 }}>{row.readTime + ' Minutes'}</Typography></TableCell>
                                            <TableCell align="right"><Typography sx={{ fontSize: 12 }}>{row.title}</Typography></TableCell>
                                            <TableCell align="right"><Typography sx={{ color: row.active ? 'green' : 'red', fontSize: 12 }}>{row.active ? 'Published' : 'Unpublished'}</Typography></TableCell>
                                           
                                            <TableCell align="right"><IconButton onClick={() => { navigate(`/blogs/${row.id}`) }} ><VisibilityOutlined sx={{ color: kGreenColor }}></VisibilityOutlined></IconButton></TableCell> */}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            }
        </div >
    )
}


export default AdminBlogs