import React, { useEffect, useState } from 'react';
import './ViewBlog.css';
import { MDBInput } from "mdbreact";
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ShowComments = ({ totalComments }) => {
    return (
        <div className="showComments-main">
            <b style={{ fontSize: '1.5rem', textAlign: 'center' }}>Comments</b>
            <hr />
            <div className="total-comments">
                {
                    totalComments.length ?
                        totalComments.map((oneComment, index) => {
                            return <div key={index}>
                                <i className="fas fa-long-arrow-alt-right" style={{ fontSize: '1.5rem' }}></i> &nbsp;&nbsp; <b style={{ fontSize: '1.2rem' }}>{oneComment.by}</b>
                                <p style={{ padding: '10px' }}>
                                    {oneComment.commentContent}
                                </p>
                                <hr />
                            </div>
                        })
                        :
                        <h3>no comments</h3>
                }
            </div>
        </div>
    );
}

const Comment = ({ blogId }) => {
    const [totalComments, setTotalComments] = useState([]);
    const [commentContent, setCommentContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(true);
    toast.configure();
    useEffect(() => {
        fetch("/get-comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem('userToken')
            },
            body: JSON.stringify({
                blogId: blogId
            })
        }).then(res => res.json()).then(data => {
            setTotalComments(data);
        })
        setTimeout(() => {
            setLoading(false)
        }, 1100)

    }, [refresh])
    useEffect(() => {
        setRefresh(!refresh)
    }, [])

    const sendCommentToBackend = () => {
        fetch("/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem('userToken')
            },
            body: JSON.stringify({
                commentContent,
                onBlog: blogId
            })
        }).then(res => res.json()).then(data => {
            if (data.error) {
                toast.error(data.error)
                return;
            }
            toast.success(data.message)
            setRefresh(!refresh);
        })
    }


    return (
        <div className='comment-main'>
            <div className="doComment-container">
                <div className='docomment-input'><MDBInput
                    type="textarea"
                    label="Thoughts on this Blog"
                    rows="4"
                    icon="pencil-alt"
                    value={commentContent}
                    onChange={e => { setCommentContent(e.target.value) }}
                /></div>
                <Button variant="contained" color="primary" onClick={sendCommentToBackend}>Comment</Button>
            </div>
            {
                loading ? < CircularProgress style={{ marginTop: '10vh' }} color="primary" /> :
                    <ShowComments totalComments={totalComments} />
            }
        </div>

    )
}

export default Comment
