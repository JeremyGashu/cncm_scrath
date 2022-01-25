import { Table, Paper, Box, TableHead, TableRow, TableCell, TableBody, TableContainer, Typography, Switch } from '@mui/material';

import React from 'react'
import { useState, useEffect } from 'react'
import { collectionData } from 'rxfire/firestore'
import FullPageLoading from '../components/FullPageLoading'
import Navbar from '../components/NavBar'
import { useAuth } from '../hooks/auth'
import { bloggersQuery } from '../query/query';
// import { usersAndBloggserQuery } from '../query/query'
import { activateUser, grantBloggerRole, revokeBloggerRole, suspendUser } from '../utils/firebase/user_management';
const AdminBloggers = () => {
    const { user, active } = useAuth()
    const [loading, setLoading] = useState()
    const [bloggers, setBloggers] = useState()
    const [rows, setRows] = useState([])

    useEffect(() => {
        if (user && active) {
            setLoading(true)
            collectionData(bloggersQuery(), { idField: 'id' }).subscribe(bloggers => {
                console.log(bloggers)
                setBloggers(bloggers)
                let bloggerRows = bloggers.map(blogger => createData(blogger))
                setRows(bloggerRows)
                setLoading(false)
            })
        }
        return () => {

        }
    }, [user, active])

    const handleUserStateChange = (e, user_id) => {
        if (e.target.checked) {
            activateUser(user_id)
        }
        else if (!e.target.checked) {
            suspendUser(user_id)
        }
    }

    const handleChangeUserRole = (e, user_id) => {
        if (e.target.checked) {
            grantBloggerRole(user_id)
        }
        else if (!e.target.checked) {
            revokeBloggerRole(user_id)
        }
    }

    const createData = ({ name, email, role, active, id, posts }) => {
        return { name, email, role, active, id, posts };
    }

    return (
        <div>
            <Navbar />
            {
                loading && <FullPageLoading />
            }

            {
                !loading && bloggers &&
                <Box>
                    <Box sx={{ padding: 5 }}>
                        <TableContainer>
                            <Table sx={{ maxWidth: 600 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><Typography sx={{ fontSize: 12 }}>Name</Typography></TableCell>
                                        <TableCell align="right"><Typography sx={{ fontSize: 12 }}>Email</Typography></TableCell>
                                        <TableCell align="right"><Typography sx={{ fontSize: 12 }}>Posts</Typography></TableCell>
                                        <TableCell align="right"><Typography sx={{ fontSize: 12 }}>Activity Status</Typography></TableCell>
                                        <TableCell align="right"><Typography sx={{ fontSize: 12 }}>Blogger Role</Typography></TableCell>
                                        <TableCell align="right"><Typography sx={{ fontSize: 12 }}>Suspend/Activate</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Typography sx={{ fontSize: 12 }}>{row.name}</Typography>
                                            </TableCell>
                                            <TableCell align="right"><Typography sx={{ fontSize: 12 }}>{row.email}</Typography></TableCell>
                                            <TableCell align="right"><Typography sx={{ fontSize: 12 }}>{row.posts || 0}</Typography></TableCell>
                                            <TableCell align="right"><Typography sx={{ color: row.active ? 'green' : 'red', fontSize: 12 }}>{row.active ? 'Active' : 'Suspended'}</Typography></TableCell>
                                            <TableCell align="right"><Switch checked={row.role === 'blogger'} onChange={(e) => { handleChangeUserRole(e, row.id) }} color='success'>Active</Switch></TableCell>
                                            <TableCell align="right"><Switch checked={row.active} onChange={(e) => { handleUserStateChange(e, row.id) }} color='success'>Active</Switch></TableCell>


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


export default AdminBloggers