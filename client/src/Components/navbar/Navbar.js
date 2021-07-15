import React from 'react';
import Button from '@material-ui/core/Button';
import './Navbar.css';
import {
    Link
} from 'react-router-dom';
const Navbar = () => {
    return (
        <div className='navbar-main'>
            <div className="navbar-left" style={{ width: '150px' }}> < Link className="navbar-left" to='/'>Share Plus</Link> </div>
            <div className="navbar-right">
                <Link to='signin'> <Button variant="contained" color="secondary">Sign In</Button></Link>
                <Link to='signup'> <Button variant="contained" color="secondary">Sign Up</Button></Link>
            </div>
        </div>
    )
}

export default Navbar
