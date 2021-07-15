import React, { useState } from 'react'
import './HomeWithoutJoin.css';
import transitions from '@material-ui/core/styles/transitions';
import Navbar from '../navbar/Navbar';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Signin from '../Join User/Signin';
import Signup from '../Join User/Signup';
import LoggedinHome from '../LoggedIn/LoggedinHome'

const LandingHomeDesign = () => {
    return (
        < div className="HomeWithoutJoin-container" >
            <div className="HomeWithoutJoin-temp">
                <span className='HomeWithoutJoin-title'>Share Plus</span>
                <span className="HomeWithoutJoin-quote">Be shareable</span>
                <div className="HomeWithoutJoin-btns">
                    <Link to='/signin'> <Button variant="contained" color="secondary">Sign In</Button></Link>
                    <Link to='/signup'> <Button variant="contained" color="secondary">Sign Up</Button></Link>
                </div>
            </div>
        </div >
    )
}

const HomeWithoutJoin = () => {
    toast.configure()
    const userToken = localStorage.getItem('userToken');
    return (

        userToken
            ?
            <>
                <Route path='/' exact component={LoggedinHome} />
            </>
            :
            <div className='HomeWithoutJoin-main' >
                <Navbar />
                <Route path='/' exact component={LandingHomeDesign} />
                <div className="HomeWithoutJoin-JoinUser">
                    <Route path='/signin' exact component={Signin} />
                    <Route path='/signup' component={Signup} />
                </div>
                {/* {toast.success('Please Login to access all functionality')} */}
            </div>

    )
}

export default HomeWithoutJoin
