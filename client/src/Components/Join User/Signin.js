import React, { useState } from 'react';
import './Signin.css';
import { MDBInput } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { Button } from '@material-ui/core';
import { Link, BrowserRouter, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    toast.configure()
    const sendToBackend = () => {
        fetch("http://localhost:5000/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email, password
            })
        }).then(res => res.json()).then(data => {
            if (data.error) {
                toast.error(data.error)
            }
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userId', data.user._id);

            toast.success('successfully loggedin')
            history.push('/');
        })
    }
    return (
        <div className='signin-main' style={{ height: '65vh' }}  >
            <div className="signin-upper">
                <div className="signin-title"> <a href="/">Share Plus</a> </div>
                <div className="signin-signin">Sign In</div>
            </div>
            <div className="signin-middle">
                <div className='signin-temp'> <MDBInput value={email} onChange={e => { setEmail(e.target.value) }} type='text' className='mbd-input-color' label="Email" icon="envelope" /></div>
                <div className='signin-temp'> <MDBInput value={password} onChange={e => { setPassword(e.target.value) }} type='password' className='mbd-input-color' label="Password" icon="unlock-alt" /></div>
                <div className="input-btn">
                    <Button variant="contained" color="primary" onClick={sendToBackend}>Sign In</Button>
                </div>
            </div>
            <div className="signin-bottom-notice">
                Don't have an Account ? <a style={{ color: 'white', textDecoration: 'underline' }} href='/signup'> Sign Up</a>
            </div>
            <div className="signin-lower"></div>
        </div>
    )
}

export default Signin
