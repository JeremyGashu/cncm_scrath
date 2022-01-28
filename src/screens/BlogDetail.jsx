import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { docData } from 'rxfire/firestore'
import { singlePublishedBlog as singlePublishedBlogQuery } from '../query/query'
import FullPageLoading from '../components/FullPageLoading'
import { Box, Typography, Grid, Paper, Avatar, FormControl, Input, InputLabel, Button, Breadcrumbs, Link, useMediaQuery, useTheme } from '@mui/material'
import { FavoriteBorderOutlined, CommentSharp, FavoriteOutlined, VisibilityOutlined, ArrowForwardIos } from '@mui/icons-material'
import Navbar from '../components/NavBar'
import { useAuth } from '../hooks/auth'
import moment from 'moment'
import { useSnackbar } from 'notistack'
import { addCommentToBlog, deleteBlog, likeBlog, publishBlog, updateViewData } from '../utils/firebase/blog_management'
import { kGreenColor } from '../styles/colors'
import Footer from '../components/Footer'
import JsonToJsx from '../utils/json_to_jsx'
const BloggerDetail = () => {

    const theme = useTheme()
    const query = useMediaQuery(theme.breakpoints.down(700))

    const params = useParams()
    const [blog, setBlog] = useState()
    const [commentText, setCommentText] = useState('')
    const [loadingBlog, setLoadingBlog] = useState(false)
    const { user, active, loading, isAnonymous, currentRole } = useAuth()
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const handleBlogStateChange = (id) => {

        publishBlog(id)

    }
    const handleDelete = async (id) => {
        let status = await deleteBlog(id)
        if (status) {
            navigate('/admin/blogs')
        }
    }

    useEffect(() => {
        setLoadingBlog(true)
        docData(singlePublishedBlogQuery(params.id), { idField: 'id' })
            .subscribe(blog => {
                console.log(blog)
                setBlog(blog)
                setLoadingBlog(false)
            })

        incrementViewData()


        return () => {

        }
    }, [params])

    const incrementViewData = () => {
        if (user) {
            console.log('checking if i can update')
            updateViewData(user.uid, params.id).then(val => {
                console.log(val)
            })
        }
        else {
            console.log('Why i am not running')
        }
    }

    const handleCommentButtonClick = async () => {
        if (!user) {
            enqueueSnackbar('Please Login to give Feedback!', { variant: 'warning' })
            return
        }
        if (isAnonymous) {
            enqueueSnackbar('Please Login to give Feedback!', { variant: 'warning' })
            return
        }
        if (commentText === '') return
        let comment = {
            blogId: params.id || '',
            comment: commentText || '',
            username: user.name || '',
            userId: user.uid || '',
            createdAt: new Date()
        }

        console.log(user)

        await addCommentToBlog(comment, blog)


        setCommentText('')

    }
    return (
        <>
            <Navbar readingBlog={true} />
            {loadingBlog && <FullPageLoading />}

            {
                !loadingBlog && blog && <Grid sx={{ px: query ? 2 : 20, my: 3 }} container direction='row' justifyContent='space-between' alignItems='center'>
                    <Grid item>
                        <Breadcrumbs separator={<ArrowForwardIos fontSize='small' />} >
                            <Link sx={{ color: '#444', fontSize: 12, textDecoration: 'none' }} to='/admin/blogs'>Blog</Link>
                            <Link sx={{ color: '#444', fontSize: 12, textDecoration: 'none' }} to='/admin/blogs' >{`${blog.title}`}</Link>

                        </Breadcrumbs>
                    </Grid>
                    <Grid item>
                        {
                            !loadingBlog && blog && !blog.active && currentRole === 'admin' && <>
                                <Button onClick={() => { handleBlogStateChange(blog.id) }} sx={{ color: 'white', backgroundColor: kGreenColor, mx: 1, fontWeight: 'bold', '&:hover': { backgroundColor: kGreenColor } }}>Publish</Button>
                                <Button onClick={() => { handleDelete(blog.id) }} sx={{
                                    mx: 1, fontWeight: 'bold', color: 'white', backgroundColor: 'red', '&:hover': {
                                        backgroundColor: 'red',

                                    }
                                }} >Delete</Button></>
                        }

                        {
                            !loadingBlog && blog && blog.active && currentRole === 'admin' && <>
                                <Button onClick={() => { handleDelete(blog.id) }} sx={{
                                    mx: 1, fontWeight: 'bold', color: 'white', backgroundColor: 'red', '&:hover': {
                                        backgroundColor: 'red',

                                    }
                                }} >Delete</Button></>
                        }
                    </Grid>
                </Grid>
            }

            {!loadingBlog && blog && <Box sx={{ px: query ? 2 : 20 }}>
                <Typography sx={{ mb: 2, color: '#444' }} variant='h3' >{blog.title}</Typography>
                <Typography>{blog.blogger}</Typography>
                <Typography sx={{ fontSize: 11 }}>{moment(blog.createdAt.toDate()).fromNow()}</Typography>
            </Box>}

            {!loadingBlog && blog && <>
                <Box sx={{ px: query ? 2 : 20 }}>
                    <img alt='Cover' style={{ padding: 30 }} src={blog.coverImage} />
                </Box>
            </>}
            {!loadingBlog && blog &&
                < JsonToJsx block={JSON.parse(blog.blockData)} />
            }

            {(!loadingBlog && !loading && blog) &&
                <Box sx={{ mt: 10, mb: 5, px: query ? 2 : 20 }} >

                    <Grid container direction='row' gap={3}>
                        <Grid onClick={() => {
                            if (!user) {
                                enqueueSnackbar('Please first Login to interact with Blogs!', { variant: 'warning' })
                                return
                            }
                            if (user.uid === blog.bloggerId) {
                                enqueueSnackbar('Cannot Like your own Blog!', { variant: 'warning' })
                                return
                            }
                            if (isAnonymous) {
                                enqueueSnackbar('Please Login give feedback with this Blog!', { variant: 'warning' })
                                return
                            }
                            if (!active) {
                                enqueueSnackbar('Cannot Interact to Blogs you are suspended!', { variant: 'warning' })
                                return
                            }
                            if (!blog.likes.includes(user.uid)) {
                                likeBlog(user, blog.id, blog.bloggerId)
                            }

                            else {
                                enqueueSnackbar('Already Liked Blog!!', { variant: 'warning' })
                                return
                            }
                        }} item>
                            {blog.likes && blog.likes.includes(user.uid) ? <FavoriteOutlined sx={{ cursor: 'pointer' }} color={'#444'} /> : <FavoriteBorderOutlined sx={{ cursor: 'pointer' }} color={'#444'} />}
                        </Grid>
                        <Grid item>

                            <Typography>{blog.likesCount}</Typography>
                        </Grid>

                        <Grid item>

                            <CommentSharp color={'#444'} />
                        </Grid>
                        <Grid item>
                            <Typography>{blog.commentsCount}</Typography>
                        </Grid>
                        <Grid item>

                            <VisibilityOutlined color={'#444'} />
                        </Grid>
                        <Grid item>
                            <Typography>{blog.viewsCount}</Typography>
                        </Grid>
                    </Grid>
                </Box>}
            {!loadingBlog && blog && <Box sx={{ px: query ? 2 : 20, py: 1 }}><Typography variant='h4' >Comments</Typography></Box>}

            {(!loadingBlog && !loading && blog) && <Box sx={{ px: query ? 2 : 20, py: 2 }} >
                <Grid container gap={3}>
                    <Grid item md={10} sm={10} lg={10}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-amount">Comment...</InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                value={commentText}
                                onChange={(e) => {
                                    setCommentText(e.target.value)
                                }}
                            />
                        </FormControl>
                    </Grid>

                    <Button onClick={handleCommentButtonClick} variant='text'>Comment</Button>
                </Grid>
            </Box>}


            {!loadingBlog && blog && <Box sx={{ px: query ? 2 : 20 }} >
                {blog.comments.map(comment => {
                    return (
                        <Paper sx={{ px: query ? 2 : 20 }}>
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item>
                                    <Avatar alt="Example" />
                                </Grid>
                                <Grid justifyContent="left" item xs zeroMinWidth>
                                    <Typography variant='h6' style={{ margin: 0, textAlign: "left", fontSize: 12 }}>{comment.username || 'Unknown'}</Typography>
                                    <Typography variant='p' style={{ textAlign: "left" }}>
                                        {comment.comment}
                                    </Typography>
                                    <Typography sx={{ py: 1, fontSize: 12 }} style={{ textAlign: "left", color: "gray" }}>
                                        {moment(comment.createdAt.toDate()).fromNow()}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    )
                }).reverse()}

            </Box>}
            <Footer />


        </>
    )
}

export default BloggerDetail