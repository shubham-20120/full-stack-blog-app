import React, { useEffect, useState } from 'react'
import './BlogBanner.css';
import BlogBanner from './BlogBanner';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import ViewBlog from './ViewBlog';

const AllMyBlogList = () => {
    const [blogData, setBlogData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/my-blog", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem('userToken')
            }
        }).then(res => res.json()).then(data => {
            if (data.error) {
                alert(data.error);
                return;
            }
            // console.log('data');
            // console.log(data);
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
