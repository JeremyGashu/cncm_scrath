import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { docData } from 'rxfire/firestore'
import { singlePublishedBlog as singlePublishedBlogQuery } from '../query/query'
import jsonToJSX from '../utils/json_to_jsx'
import FullPageLoading from '../components/FullPageLoading'
import { Box, Typography, Grid, Paper, Avatar, FormControl, Input, InputLabel, Button } from '@mui/material'
import moment from 'moment'
import { FavoriteBorderOutlined, CommentSharp, FavoriteOutlined, ViewArrayOutlined, VisibilityOutlined } from '@mui/icons-material'
import Navbar from '../components/NavBar'
import { useAuth } from '../hooks/auth'
import { useSnackbar } from 'notistack'
import { addCommentToBlog, likeBlog, updateViewData } from '../utils/firebase/blog_management'
const BloggerDetail = () => {

    const params = useParams()
    const [blog, setBlog] = useState()
    const [commentText, setCommentText] = useState('')
    const [loadingBlog, setLoadingBlog] = useState(false)
    const { user, active, loading, isAnonymous } = useAuth()
    const { enqueueSnackbar } = useSnackbar();

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

        await addCommentToBlog(comment)


        setCommentText('')

    }
    return (
        <>
            <Navbar />
            {loadingBlog && <FullPageLoading />}

            {!loadingBlog && blog && <Box sx={{ px: 20 }}>
                <Typography sx={{ mb: 2 }} variant='h2' >{blog.title}</Typography>
                <Typography>{blog.blogger}</Typography>
                <Typography sx={{ fontSize: 11 }}>{moment(blog.createdAt.toDate()).fromNow()}</Typography>
            </Box>}

            {!loadingBlog && blog && <>
                <Box sx={{ px: 20 }}>
                    <img alt='Cover' style={{ padding: 30 }} src={blog.coverImage} />
                </Box>
            </>}
            {!loadingBlog && blog &&
                jsonToJSX(JSON.parse(blog.blockData))}

            {(!loadingBlog && !loading && blog) &&
                <Box sx={{ mt: 10, mb: 5, px: 20 }} >

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
                                likeBlog(user.uid, blog.id)
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
            {!loadingBlog && blog && <Box sx={{ px: 20, py: 1 }}><Typography variant='h4' >Comments</Typography></Box>}

            {(!loadingBlog && !loading && blog) && <Box sx={{ px: 20, py: 2 }} >
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


            {!loadingBlog && blog && <Box sx={{ px: 20 }} >
                {blog.comments.map(comment => {
                    return (
                        <Paper style={{ padding: "40px 20px" }}>
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item>
                                    <Avatar alt="Example" />
                                </Grid>
                                <Grid justifyContent="left" item xs zeroMinWidth>
                                    <Typography variant='h6' style={{ margin: 0, textAlign: "left", fontSize: 12 }}>{comment.username || 'Unknown'}</Typography>
                                    <Typography variant='p' style={{ textAlign: "left" }}>
                                        {comment.comment}
                                    </Typography>
                                    <Typography sx={{ py: 1 , fontSize : 12}} style={{ textAlign: "left", color: "gray" }}>
                                        {moment(comment.createdAt.toDate()).fromNow()}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    )
                }).reverse()}
            </Box>}


        </>
    )
}

export default BloggerDetail