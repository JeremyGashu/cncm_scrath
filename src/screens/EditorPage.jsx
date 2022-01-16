// editorjs create article with coverimage and title
import React, { useState, useRef, useEffect } from "react";
import EditorJS from "react-editor-js";
import { Editor_JS_TOOLS } from "../utils/tools.js";
import {
    serverTimestamp,
} from "firebase/firestore";

import { useDropzone } from "react-dropzone";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import {
    Button,
    TextField,
    Stack,
    Box,
    Modal,
    Typography,
    Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircularProgress, {
} from "@mui/material/CircularProgress";
import moment from "moment";
import { useSnackbar } from "notistack";
// import { useNavigate } from "react-router-dom";
import FullPageLoading from "../components/FullPageLoading";
import { useAuth } from "../hooks/auth";
import { storage } from "../firebase.js";
import BlogJSX from "../components/BlogJSX.jsx";
import { readTime } from "../utils/read_time.js";
import { addBlogData } from "../utils/firebase/blog_management.js";
import { useNavigate } from "react-router-dom";

// const CircularProgressWithLabel = (props
// ) => {
//     return (
//         <Box sx={{ position: "relative", display: "inline-flex" }}>
//             <CircularProgress variant='determinate' {...props} />
//             <Box
//                 sx={{
//                     top: 0,
//                     left: 0,
//                     bottom: 0,
//                     right: 0,
//                     position: "absolute",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                 }}
//             >
//                 <Typography
//                     variant='caption'
//                     component='div'
//                     color='text.secondary'
//                 >{`${Math.round(props.value)}%`}</Typography>
//             </Box>
//         </Box>
//     );
// }



const EditorJs = () => {
    const [blogTitle, setBlogTitle] = useState("");
    const [savedData, setSavedData] = useState();
    const [imageAsFile, setImageAsFile] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    const [imageAsUrl, setImageAsUrl] = useState("");
    const [imageUploading, setImageUploading] = useState(false);
    // const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    // const [admins, setAdmins] = useState();
    const [open, setOpen] = useState(false);

    const { user, active } = useAuth()
    const navigate = useNavigate()



    const { enqueueSnackbar } = useSnackbar();
    const instanceRef = useRef();
    // const navigate = useNavigate();

    // const userRef = doc(database, "users", `${user.uid}`);

    const handleOpen = async () => {
        const savedData = await instanceRef.current.save();
        setSavedData(savedData);
        console.log(savedData);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleTitle = (event) => {
        setBlogTitle(event?.currentTarget?.value);
    };

    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } =
        useDropzone({
            accept: "image/*",
            onDrop: (acceptedFiles) => {
                setImageAsFile(acceptedFiles);
                setImagePreview(acceptedFiles.map((file) => URL.createObjectURL(file)));
                setImageUploading(true);
            },
        });

    useEffect(() => {
        console.log('rendering')
        if (imageAsFile.length > 0) {
            const file = imageAsFile[0];

            const storageRef = ref(storage, "images/" + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file, {
                contentType: "image/jpeg",
            });

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // setProgress(progress);
                },
                (error) => {
                    console.log(error);
                },
                async () => {
                    await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageAsUrl(downloadURL);
                        setImageUploading(false);
                    });
                }
            );
        } else {
            setImageAsUrl("");
        }
    }, [imageAsFile]);



    const handleSave = async () => {
        console.log(user)
        const savedData = await instanceRef.current.save();

        const { time, paragraph } = readTime(savedData.blocks);
        if (blogTitle && savedData && imageAsUrl && paragraph) {
            setLoading(true);

            const blogDescription = {
                title: blogTitle,
                coverImage: imageAsUrl,
                description: paragraph.slice(0, 200),
                readTime: time,
                numLikes: 0,
                numComments: 0,
                blogger: user.name,
                bloggerId: user.uid,
                bloggerImage: user.image || '',
                deleted: false,
                active: false,
                createdAt: serverTimestamp(),
            };
            if (user && active === true) {
                let success = await addBlogData(blogDescription, savedData)

                if (user && savedData && success) {
                    enqueueSnackbar(`${blogTitle} Saved successfully`, {
                        variant: "success",
                    });
                    setLoading(false);
                    navigate("/blogger/blogs");
                }
            } else {
                enqueueSnackbar(
                    "errorsaving your blog please contact the customer services",
                    {
                        variant: "error",
                    }
                );
                // navigate("/blogger/my-blogs");
            }
        } else {
            enqueueSnackbar(
                blogTitle.length === 0
                    ? "add a blog title"
                        ? paragraph.length > 100
                            ? "your blog is shoter than it should be"
                            : "fill out all the fields"
                        : "fill out all the fields"
                    : "fill out all the fields",
                { variant: "info" }
            );
        }
    };

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            imagePreview.forEach((file) => URL.revokeObjectURL(file.preview));
        },
        [imagePreview]
    );

    useEffect(() => {
        console.log('rendering')
        // onSnapshot(userRef, (doc) => {
        //     setuser(doc.data());
        // });
        // onSnapshot(
        //     query(collection(database, "users"), where("role", "==", "admin")),
        //     (snapshot) => {
        //         setAdmins(snapshot.docs.map(doc => ({
        //             id: doc.id
        //         })));
        //     }
        // );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <>
            <Paper>
                <Stack
                    display={"flex"}
                    direction='row'
                    justifyContent={"space-between"}
                    sx={{ background: "#eeeeee", p: 2 }}
                    alignItems={"center"}
                >
                    <Typography>{moment().format("MMMM Do YYYY, h:mm:ss a")}</Typography>
                    <Button onClick={() => handleOpen()} >
                        preview
                    </Button>
                </Stack>
                <Stack
                    spacing={3}
                    sx={{
                        height: "80vh",
                        overflow: "scroll",
                    }}
                >
                    <Box sx={{ px: { sm: 2, md: 5, lg: 30 }, mt: 3 }} textAlign='center'>
                        <TextField
                            onChange={handleTitle}
                            id='outlined-basic'
                            placeholder='Title'
                            multiline
                            fullWidth
                            variant='standard'
                            InputProps={{
                                sx: {
                                    fontSize: 40,
                                    fontWeight: 550,
                                    pb: 3,
                                },
                                disableUnderline: true,
                            }}
                        />

                        {imageAsFile.length <= 0 ? (
                            <>
                                <Box
                                    {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
                                    sx={{
                                        flex: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        padding: "20px",
                                        borderWidth: "2px",
                                        borderRadius: "2px",
                                        borderStyle: "dashed",
                                        backgroundColor: "#fafafa",
                                        color: "#bdbdbd",
                                        outline: "none",
                                        transition: "border .24s ease-in-out",
                                    }}
                                >
                                    <input {...getInputProps()} />
                                    <p>Drag and drop Cover image here, or click to select files</p>
                                </Box>
                            </>
                        ) : imageUploading ? (
                            <>
                                <FullPageLoading />
                            </>
                        ) : imageAsUrl ? (
                            <Stack direction='column'>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        height: 500,
                                        width: "100%",
                                        mb: 3,
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                        backgroundImage: `url(${imageAsUrl && imageAsUrl})`,
                                    }}
                                ></Paper>
                                <Button
                                    onClick={() => {
                                        setImageAsUrl("");
                                        setImageAsFile([]);
                                        // setProgress(0);
                                    }}
                                >
                                    Remove Image
                                </Button>
                            </Stack>
                        ) : (
                            <>
                                <img src={imageAsUrl} alt={imageAsUrl} style={{ width: "100%" }} />
                                <Button
                                    onClick={() => {
                                        setImageAsUrl("");
                                        setImageAsFile([]);
                                        // setProgress(0);
                                    }}
                                >
                                    Remove Image
                                </Button>
                            </>
                        )}
                    </Box>
                    <EditorJS
                        placeholder={"Tell Your Story..."}
                        tools={Editor_JS_TOOLS}
                        instanceRef={(instance) => {
                            instanceRef.current = instance;
                        }}
                    />
                </Stack>
                <Modal open={open} onClose={handleClose} sx={{}}>
                    <Box
                        flex={1}
                        overflow='auto'
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: { sm: 300, md: 750 },
                            bgcolor: "background.paper",
                            borderRadius: "10px",
                            boxShadow: 24,
                        }}
                    >
                        <Stack
                            display={"flex"}
                            direction='row'
                            justifyContent={"space-between"}
                            sx={{ background: "#eeeeee", p: 2 }}
                            alignItems={"center"}
                        >
                            <Button onClick={() => setOpen(false)}>
                                <ArrowBackIcon />{" "}
                            </Button>
                            <Button
                                size='large'
                                disabled={loading}
                                sx={{ width: "20%" }}
                                onClick={() => handleSave()}
                                endIcon={
                                    loading && (
                                        <CircularProgress
                                            size={24}
                                            sx={{
                                                color: "#1D212A",
                                            }}
                                        />
                                    )
                                }
                            >
                                {loading ? "saving...." : "save"}
                            </Button>
                        </Stack>
                        <Box
                            sx={{
                                p: 3,
                                height: "70vh",
                                overflow: "scroll",
                            }}
                        >
                            <Typography variant='h4' gutterBottom fontWeight={"bold"}>
                                {blogTitle}
                            </Typography>
                            <img
                                src={imageAsUrl && imageAsUrl}
                                alt={imageAsUrl}
                                style={{ width: "100%" }}
                            />
                            {savedData && <BlogJSX jsxBlog={savedData} />}
                        </Box>
                    </Box>
                </Modal>
            </Paper>
        </>
    );
};

export default EditorJs;
