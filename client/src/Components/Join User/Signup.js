import React, { useState } from 'react';
import './Signup.css';
import { MDBInput } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {
    toast.configure();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const history = useHistory();
    const sendToBackend = () => {
        if (password != cpassword) {
            toast.error("passwords must be same")
            return;
        }
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, password
            })
        }).then(res => res.json()).then(data => {
            if (data.error) {
                toast.success(data.error)
                return;
            }
            toast.success(data.message);
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userId', data.user._id);
            history.push('/');
        })
    }



    return (
        <div className='signup-main'>
            <div className="signup-upper">
                <div className="signup-title"> <a href="/">Share Plus</a> </div>

                <div className="signup-signup">Sign Up</div>
            </div>
            <div className="signup-middle">
                <div className='signup-temp'> <MDBInput value={name} onChange={(e) => { setName(e.target.value) }} type='text' className='mbd-input-color' label="Name" icon="user" /></div>
                <div className='signup-temp'> <MDBInput value={email} onChange={(e) => { setEmail(e.target.value) }} type='email' className='mbd-input-color' label="Email" icon="envelope" /></div>
                <div className='signup-temp'> <MDBInput value={password} onChange={(e) => { setPassword(e.target.value) }} type='password' className='mbd-input-color' label="Password" icon="unlock-alt" /></div>
                <div className='signup-temp'> <MDBInput value={cpassword} onChange={(e) => { setCPassword(e.target.value) }} type='password' className='mbd-input-color' label="Confirm Password" icon="unlock-alt" /></div>
                <div className="input-btn">
                    <Button variant="contained" color="primary" onClick={sendToBackend}>Sign Up</Button>
                </div>
            </div>
            <div className="signup-bottom-notice" >
                Already have an Account ? <a style={{ color: 'white', textDecoration: 'underline' }} href='/signin'> Sign In</a>
            </div>
            <div className="signup-lower"></div>
        </div>
    )
}

export default Signup
