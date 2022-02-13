import { Avatar, Button, Divider, FormControl, Grid, Input, InputLabel, Paper, useMediaQuery, useTheme } from '@mui/material'
import { useContext, useEffect } from 'react'
import { BlogContext } from '../contexts/blogcontext'
import { Box, Typography } from '@mui/material'
import moment from 'moment'
import parse from 'html-react-parser'
import Navbar from '../components/NavBar'
import { addComments, fetchComments, getAuthorName, getImageUrl } from '../controllers/wordpress/posts'
import { useState } from 'react'
import { useAuth } from '../hooks/auth'

const BloggerDetailWordpress = () => {

    const theme = useTheme()
    const query = useMediaQuery(theme.breakpoints.down(700))
    const [commentText, setCommentText] = useState('')
    const { user, active } = useAuth()

    const [image, setImage] = useState()
    const [author, setAuthor] = useState()


    const [comments, setComments] = useState()
    const [selectedBlog, setSelectedBlog] = useContext(BlogContext)
    useEffect(() => {
        if (selectedBlog) {
            fetchComments(selectedBlog.id).then(res => {
                setComments(res)
            })
            getImageUrl(selectedBlog.featured_media).then(res => {
                setImage(res)
            })
            getAuthorName(selectedBlog.author).then(res => {
                setAuthor(res)
            })
        }
        return () => {

        }
    }, [selectedBlog])

    const handleComment = async ({ post, author_name, author_email, content }) => {
        const success = await addComments({ post, author_name, author_email, content })
        fetchComments(selectedBlog.id).then(res => {
            setComments(res)
        })
        setCommentText('')
    }

    return (
        <Typography>
            <Navbar />
            {selectedBlog && <Box sx={{ px: query ? 2 : 20, mt: 2 }}>
                <Typography sx={{ mb: 2, color: '#444' }} variant='h3' >{selectedBlog.title.rendered}</Typography>
                <Typography>{author}</Typography>
                <Typography sx={{ fontSize: 11 }}>{moment(selectedBlog.date).fromNow()}</Typography>
            </Box>}

            {
                selectedBlog && <Box sx={{ m: 5 }} ><Divider /></Box>
            }

            {selectedBlog && <>
                <Box sx={{ px: query ? 2 : 20 }}>
                    <img alt='Cover' style={{ padding: 20 }} src={image} />
                </Box>
            </>}
            {selectedBlog &&
                <Box sx={{ mx: 5 }}>
                    {
                        parse(selectedBlog.content.rendered)
                    }
                </Box>
            }

            {
                selectedBlog && <Box sx={{ m: 5 }} ><Divider /></Box>
            }

            {selectedBlog && <Box sx={{ px: query ? 2 : 20, py: 2 }} >
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

                    <Button onClick={() => {
                        console.log();
                        handleComment({ post: selectedBlog.id, author_name: user.displayName || 'Anonymous', content: commentText, author_email: user.email || "" });
                    }} variant='text'>Comment</Button>
                </Grid>
            </Box>}

            {
                selectedBlog && comments &&
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