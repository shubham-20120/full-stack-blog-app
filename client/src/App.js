import React, { useEffect, useState } from 'react'
import HomeWithoutJoin from './Components/Home/HomeWithoutJoin'
import Navbar from './Components/navbar/Navbar';
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import LoggedinHome from './Components/LoggedIn/LoggedinHome';
import { Button } from '@material-ui/core';



const App = () => {
  const userToken = localStorage.getItem('userToken');
  const [isMobileShow, setIsMobileShow] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 825) {
      setIsMobileShow(true);
    } else {
      setIsMobileShow(false);
    }
  }, [])
  return (
    <div>
      {
        isMobileShow ?
          <div className="mobileMessage">
            <div style={{ fontSize: '1.3rem', width: '75%', textAlign: 'center', margin: '25px 0', fontWeight: '500' }}>This website is not responsive for smaller devices  yet...</div>
            <div style={{ fontSize: '1.3rem', width: '75%', textAlign: 'center', margin: '25px 0', fontWeight: '500' }}>Please open in device with width more than 825 pixels</div>
            <Button variant="contained" color="primary" onClick={() => { setIsMobileShow(false) }}>Proceed Anyways</Button>
          </div>
          :
          <Router>
            {
              userToken ?
                <Route path='/' component={LoggedinHome} />
                :
                <Route path='/' component={HomeWithoutJoin} />
            }
          </Router>
      }
    </div>
  )
}

export default App
