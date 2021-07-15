import React from 'react';
import './BlogBanner.css';
import { Button } from '@material-ui/core';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import ViewBlog from './ViewBlog';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogBanner = (props) => {
    console.log('props from BlogBanner');
    console.log(props);
    toast.configure();
    const deleteBlog = (blogId) => {
        if (props.owener != localStorage.getItem('userId')) {
            toast.error("You are not Author of this blog");
            setTimeout(() => {
                toast.error("Your are not allowed to delete this Blog");
            }, 1000)
            return;
        }
        fetch("/delete-blog", {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem('userToken')
            },
            body: JSON.stringify({
                blogId
            })
        }).then(res => res.json()).then(data => {
            if (data.error) {
                toast.error(data.error);
                return;
            }
            window.location.reload();
            setTimeout(() => {
                toast.success("Blog deleted successfully!")
            }, 300)
        })
    }
    const sendToView = {
        pathname: `/blog/${props.blogId}`,
        state: {
            title: props.title,
            headerPhoto: props.photo,
            paras: props.paras,
            blogId: props.blogId,
            owener: props.owener,
            date: props.date
        }

    };

    return (
        <div className="blogBanner-container">
            <img src={props.photo} style={{ height: '200px', width: '250px', borderRadius: '10px' }} alt="blog photo" />
            <div className="blogBanner-right">
                <div className="blogBanner-title">{
                    props.title.length > 120 ? props.title.slice(0, 120) + '...' : props.title
                }</div>
                <div className="blogBanner-btns">
                    <Link to="#" style={{ color: 'black' }}>Date: <span style={{ color: 'blue' }}>{props.date.slice(0, 10)}</span></Link>
                    <i onClick={() => { deleteBlog(props.blogId) }} style={{ fontSize: '1.3rem', color: 'blue' }} className="fas fa-trash"></i>
                    <Link to={sendToView} >View Blog</Link>
                </div>
            </div>
        </div>
    )
}

export default BlogBanner
