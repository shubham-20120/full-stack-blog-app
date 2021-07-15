import React, { useState, useEffect } from 'react';
import './ViewBlog.css';
import { useLocation } from 'react-router-dom';
import Comment from './Comment';

const ViewBlog = () => {
    const { state } = useLocation();
    const [author, setAuthor] = useState('Denied to display')
    console.log(state);
    useEffect(() => {
        fetch("/get-user-name-by-id", {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("userToken")
            },
            body: JSON.stringify({ _id: state.owener })
        }).then(res => res.json()).then(data => {
            setAuthor(data);
            console.log('name');
            console.log(data);
        })
    }, [])
    return (
        <div className='viewblog-main'>
            <div className="viewblog-heading" >
                <div className='viewblog-title'>{state.title}</div>
                <img className='viewvlog-photo' src={state.headerPhoto} alt="header photo" />
            </div>
            <div className="viewblog-aboutpost">
                <div className="viewblog-author">Author: <span style={{ color: 'blue' }}>{author}</span> </div>
                <div className="viewblog-date">Date: <span style={{ color: 'blue' }}>{state.date.slice(0, 10)}</span></div>
            </div>
            <div className="viewblog-lower">
                <div className="viewblog-left">

                    {
                        state.paras.length ?
                            state.paras.map((para, index) => {
                                return (
                                    <p key={index}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {para}</p>
                                )
                            })
                            : <h3><b>Unfortunately this blog has no Descriptive stuff</b></h3>
                    }
                </div>
                <div className="viewblog-right">
                    <Comment blogId={state.blogId} />
                </div>
            </div>

        </div>
    )
}

export default ViewBlog
