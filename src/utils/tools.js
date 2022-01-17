import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
const Header = require("@editorjs/header");
const Embed = require("@editorjs/embed");
const Image = require("@editorjs/image");
const List = require("@editorjs/list");
const Delimiter = require("@editorjs/delimiter");
const Link = require("@editorjs/link");
const Quote = require("@editorjs/quote");
const Table = require("@editorjs/table");
const Underline = require("@editorjs/underline");
const Personality = require("@editorjs/personality");

export const Editor_JS_TOOLS = {
    header: {
        class: Header,
        inlineToolbar: true,
    },
    embed: {
        class: Embed,
        inlineToolbar: false,
        config: {
            services: {
                youtube: true,
                telegram: true,
            },
        },
    },
    delimiter: {
        class: Delimiter,
        inlineToolbar: true,
    },
    image: {
        class: Image,
        inlineToolbar: true,
        config: {
            uploader: {
                uploadByFile(file) {
                    return new Promise((resolve, reject) => {
                        uploadBytesResumable(ref(storage, "images/" + file.name), file, {
                            contentType: "image/jpeg",
                        }).on(
                            "state_changed",
                            (snapshot) => {
                                const progress =
                                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                console.log("Upload is " + progress + "% done");
                                switch (snapshot.state) {
                                    case "paused":
                                        console.log("Upload is paused");
                                        break;
                                    case "running":
                                        console.log("Upload is running");
                                        break;
                                }
                            },
                            (error) => {
                                console.log(error);
                            },
                            () => {
                                getDownloadURL(
                                    uploadBytesResumable(ref(storage, "images/" + file.name), file, {
                                        contentType: "image/jpeg",
                                    }).snapshot.ref
                                ).then((downloadURL) => {
                                    console.log("File available at", downloadURL);
                                    resolve({
                                        success: 1,
                                        file: {
                                            url: downloadURL,
                                        },
                                    });
                                });
                            }
                        );
                    });
                },
            },
        },
    },
    list: List,
    qoute: Quote,
    // linkTool: {
    //     class: Link,
    //     inlineToolbar: true,
    // },
    // table: Table,
    underline: Underline,
    personality: {
        class: Personality,
        inlineToolbar: true,
        config: {
            uploader: {
                uploadByFile(file) {
                    return new Promise((resolve, reject) => {
                        uploadBytesResumable(ref(storage, "images/" + file.name), file, {
                            contentType: "image/jpeg",
                        }).on(
                            "state_changed",
                            (snapshot) => {
                                const progress =
                                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                console.log("Upload is " + progress + "% done");
                                switch (snapshot.state) {
                                    case "paused":
                                        console.log("Upload is paused");
                                        break;
                                    case "running":
                                        console.log("Upload is running");
                                        break;
                                }
                            },
                            (error) => {
                                console.log(error);
                            },
                            () => {
                                getDownloadURL(
                                    uploadBytesResumable(ref(storage, "images/" + file.name), file, {
                                        contentType: "image/jpeg",
                                    }).snapshot.ref
                                ).then((downloadURL) => {
                                    console.log("File available at", downloadURL);
                                    resolve({
                                        success: 1,
                                        file: {
                                            url: downloadURL,
                                        },
                                    });
                                });
                            }
                        );
                    });
                },
            },
        },
    },
};
