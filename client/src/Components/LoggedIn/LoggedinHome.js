import React, { useEffect, useState } from 'react'
import ViewBlog from '../ViewBlog/ViewBlog';
import './LoggedinHome.css';
import LoggedInNavbar from './LoggedInNavbar';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import CreatePost from '../CreatePost/CreatePost';
import HomeWithoutJoin from '../Home/HomeWithoutJoin';
import AllMyBlogList from '../ViewBlog/AllMyBlogList';
import PreviewCreatingBlog from '../CreatePost/PreviewCreatingBlog';
import CircularProgress from '@material-ui/core/CircularProgress';
import BlogBanner from '../ViewBlog/BlogBanner';

const LoggedinHomeContainer = ({ allPostsData }) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(!loading)
        }, 800)
    }, [])
    return (
        < div className="loggedinhome-container" >
            {
                loading
                    ? <CircularProgress />
                    :
                    <>
                        {
                            allPostsData.length ?
                                allPostsData.map((blog, index) => {
                                    return <div key={index}><BlogBanner owener={blog.owener} title={blog.title} photo={blog.headerPhoto} paras={blog.description} date={blog.createdAt} blogId={blog._id} /></div>
                                })
                                :
                                <>
                                    <p>No Blogs Present to Show : (</p>
                                    <a href='/create-blog' style={{ color: 'blue', textDecoration: 'underline' }}>Be the first to create blog</a>
                                </>

                        }

                    </>

            }
        </div >
    )
}

const LoggedinHome = () => {
    const [allPostsData, setAllPostsData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/all-posts", {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem('userToken')
            }
        }).then(res => res.json()).then(data => {
            setAllPostsData(data);
        })


    }, [])

    const userToken = localStorage.getItem('userToken');
    return (
        userToken ?
            <div className='loggedinhome-main'>
                <Router>
                    <LoggedInNavbar />
                    <Route exact path='/'  > <LoggedinHomeContainer allPostsData={allPostsData} /> </Route>
                    <Route path='/my-blog' component={AllMyBlogList} />
                    <Route path='/blog/:id' render={props => <ViewBlog state={props} />} />
                    <Route path='/preview/:id' render={props => < PreviewCreatingBlog state={props} />} />
                    <Route exact path='/create-blog' component={CreatePost} />
                </Router>
            </div>
            :
            <HomeWithoutJoin />
    )
}

export default LoggedinHome
