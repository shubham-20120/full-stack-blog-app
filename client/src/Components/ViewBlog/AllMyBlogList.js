import React, { useEffect, useState } from 'react'
import './BlogBanner.css';
import BlogBanner from './BlogBanner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AllMyBlogList = () => {
    const [blogData, setBlogData] = useState([]);
    toast.configure();

    useEffect(() => {
        fetch("/my-blog", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem('userToken')
            }
        }).then(res => res.json()).then(data => {
            if (data.error) {
                toast.error(data.error);
                return;
            }
            setBlogData(data);
        })
    }, [])

    return (
        <div className="blogBanner-main">
            {
                blogData.length ?
                    blogData.map(blog => {
                        return <>
                            <BlogBanner owener={blog.owener} title={blog.title} photo={blog.headerPhoto} paras={blog.description} date={blog.createdAt} blogId={blog._id} />
                        </>
                    })
                    :
                    <h2>No Posts</h2>
            }
        </div>
    )
}

export default AllMyBlogList
