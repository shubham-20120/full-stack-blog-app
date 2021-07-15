import React from 'react'
import './LoggedInNavbar.css';
import Button from '@material-ui/core/Button';
import {
    BrowserRouter as Router,
    Route,
    Link,
    useHistory
} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoggedInNavbar = () => {
    toast.configure()

    const history = useHistory();
    const logOutFunc = () => {
        localStorage.removeItem("userToken");
        history.push('/');
        setTimeout(() => {
            toast.success("Logged Out", { autoClose: 2000 })
            toast.success("Hope to see you again", { autoClose: 2500 })
        }, 500)
        window.location.reload(false);
    }
    return (
        <div className='LoggedinNav-main'>
            <div className="LoggedinNav-left">< Link className="navbar-left" to='/'>Share Plus</Link></div>
            <div className="LoggedinNav-right">
                <Link to='/my-blog'><div className="LoggedinNav-myposts LoggedinNav-right-btns"><Button color="inherit">My Posts</Button></div></Link>
                <Link to='/create-blog'><div className="LoggedinNav-Create LoggedinNav-right-btns"><Button color="inherit">Create Post</Button></div></Link>
                <Link to='#'><div className="LoggedinNav-logout LoggedinNav-right-btns"><Button color="inherit" onClick={logOutFunc}>Log Out</Button></div></Link>
            </div>
        </div>
    )
}

export default LoggedInNavbar
