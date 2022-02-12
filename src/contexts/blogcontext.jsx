import { useState } from "react";
import { createContext } from "react";

export const BlogContext = createContext()

const BlogDetailProvider = (props) => {
    const [selectedBlog, setSelectedBlog] = useState()
    return <BlogContext.Provider value={[selectedBlog, setSelectedBlog]}>
        {props.children}
    </BlogContext.Provider>
}

export default BlogDetailProvider