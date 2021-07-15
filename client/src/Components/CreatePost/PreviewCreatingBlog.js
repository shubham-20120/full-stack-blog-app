import React, { useEffect, useState } from 'react';
import '../ViewBlog/ViewBlog.css';
import headerPhoto from '../Images/back.jpg';
import { Link, useParams, useLocation } from 'react-router-dom';
import Comment from '../ViewBlog/Comment';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
const PreviewCreatingBlog = () => {

    const [title, setTitle] = useState('');
    const [headerPhoto, setHeaderPhoto] = useState('');
    const [paras, setParas] = useState([]);
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(true);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            setTitle(localStorage.getItem('title'));
            setHeaderPhoto(localStorage.getItem('headerPhoto'));
            setParas(JSON.parse(localStorage.getItem('paras')));
            setDate(Date.now());

            setTimeout(() => {
                setLoading(!loading)
            }, 2000)

            localStorage.removeItem('title')
            localStorage.removeItem('headerPhoto')
            localStorage.removeItem('paras')
        } catch {
            setLoading(true);
        }
    }, [])

    return (
        !loading ?
            <div className='viewblog-main'>
                <div className="viewblog-heading" >
                    <div className='viewblog-title'>{title}</div>
                    <img className='viewvlog-photo' src={headerPhoto} alt="header photo" />
                </div>
                <div className="viewblog-aboutpost">
                    <div className="viewblog-author">Author: <Link to='#'>Shubham Patel</Link> </div>
                    <div className="viewblog-date"><Link to="#">Date: {date}</Link></div>
                </div>
                <div className="viewblog-lower">
                    <div className="viewblog-left">
                        {
                            (paras === null || paras.length == 0) ? <p>Something Went wrong, please try again</p> :
                                paras.map((para, index) => {
                                    return (
                                        <p key={index}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {para}</p>
                                    )
                                })

                        }
                    </div>
                    <div className="viewblog-right">
                        <Comment />
                    </div>
                </div>

            </div>
            : <div style={{ width: "100%", height: '94vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'cyan' }}>
                <CircularProgress color="secondary" />
            </div>
    )
}

export default PreviewCreatingBlog
