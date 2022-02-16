import { Avatar, Button, Divider, FormControl, Grid, Input, InputLabel, Paper, useMediaQuery, useTheme } from '@mui/material'
import { Box, Typography } from '@mui/material'
import moment from 'moment'
import parse from 'html-react-parser'
import Navbar from '../components/NavBar'
import { addComments, fetchComments, fetchSinglePost, getAuthorName, getImageUrl } from '../controllers/wordpress/posts'
import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/auth'
import { useParams } from 'react-router-dom'
import FullPageLoading from '../components/FullPageLoading'

const BloggerDetailWordpress = () => {

    const { slug } = useParams()

    const theme = useTheme()
    const query = useMediaQuery(theme.breakpoints.down(700))
    const [commentText, setCommentText] = useState('')
    const [blog, setBlog] = useState()
    const [sendingComment, setSendingComment] = useState(false)
    const [loadingBlog, setLoadingBlog] = useState(false)
    const { user } = useAuth()
    const [image, setImage] = useState()
    const [author, setAuthor] = useState()

    const [comments, setComments] = useState()
    useEffect(() => {
        setLoadingBlog(true)
        fetchSinglePost(slug).then(postRes => {
            console.log(postRes)
            setBlog(postRes)
            fetchComments(postRes.id).then(commentRes => {
                setComments(commentRes)
            })
            getImageUrl(postRes.featured_media, true).then(imageRes => {
                setImage(imageRes)
            })
            getAuthorName(postRes.author).then(authorRes => {
                setAuthor(authorRes)
            })

            setLoadingBlog(false)
        }).catch(err => {
            setLoadingBlog(false)
        })
        // setLoadingBlog(false)

        return () => {

        }
    }, [slug])

    const handleComment = async ({ post, author_name, author_email, content }) => {
        setSendingComment(true)
        await addComments({ post, author_name, author_email, content })
        fetchComments(blog.id).then(res => {
            setComments(res)
        })
        setSendingComment(false)
        setCommentText('')
    }

    return (
        <Typography>
            <Navbar />
            {
                loadingBlog && <FullPageLoading />
            }
            {blog && !loadingBlog && <Box sx={{ px: query ? 2 : 20, mt: 2 }}>
                <Typography sx={{ mb: 2, color: '#444' }} variant='h4' >{blog.title.rendered}</Typography>
                <Typography>{author}</Typography>
                <Typography sx={{ fontSize: 11 }}>{moment(blog.date).fromNow()}</Typography>
            </Box>}

            {
                blog && !loadingBlog && <Box sx={{ m: 5 }} ><Divider /></Box>
            }

            {blog && !loadingBlog && <>
                <Box sx={{ px: query ? 2 : 20 }}>
                    <img alt='Cover' style={{ padding: 20 }} src={image} />
                </Box>
            </>}
            {blog && !loadingBlog &&
                <Box sx={{ px: query ? 2 : 20 }}>
                    {
                        parse(blog.content.rendered)
                    }
                </Box>
            }

            {
                blog && <Box sx={{ m: 5 }} ><Divider /></Box>
            }

            {blog && !loadingBlog && <Box sx={{ px: query ? 2 : 20, py: 2 }} >
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

                    <Button disabled={sendingComment} onClick={() => {
                        handleComment({ post: blog.id, author_name: user.name || 'Anonymous', content: commentText, author_email: user.email || "" });
                    }} variant='text'>Comment</Button>
                </Grid>
            </Box>}

            {
                blog && !loadingBlog && comments &&
                comments.map(comment => {
                    return (
                        <Paper sx={{ px: query ? 2 : 20, mb: 2 }}>
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item>
                                    <Avatar alt="Example" />
                                </Grid>
                                <Grid justifyContent="left" item xs zeroMinWidth>
                                    <Typography variant='h6' style={{ margin: 0, textAlign: "left", fontSize: 12 }}>{comment.author_name || 'Unknown'}</Typography>
                                    <Typography variant='p' style={{ textAlign: "left" }}>
                                        {
                                            parse(comment.content.rendered)
                                        }
                                    </Typography>
                                    <Typography sx={{ py: 1, fontSize: 12 }} style={{ textAlign: "left", color: "gray" }}>
                                        {moment(comment.date).fromNow()}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    )
                })
            }




        </Typography>
    )


    // return (
    // <p>Example Example</p>
    {/* 
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
                                        {moment(comment.createdAt).fromNow()}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    )
                }).reverse()}

            </Box>}
            <Footer /> */}


    // )
}

export default BloggerDetailWordpress