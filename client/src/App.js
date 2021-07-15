import React from 'react'
import HomeWithoutJoin from './Components/Home/HomeWithoutJoin'
import Navbar from './Components/navbar/Navbar'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Signin from './Components/Join User/Signin';
import Signup from './Components/Join User/Signup';
import LoggedInNavbar from './Components/LoggedIn/LoggedInNavbar';
import LoggedinHome from './Components/LoggedIn/LoggedinHome';
import CreatePost from './Components/CreatePost/CreatePost';
const App = () => {
  const userToken = localStorage.getItem('userToken');
  return (
    <div>
      <Router>
        {
          userToken ?
            <Route path='/' component={LoggedinHome} />
            :
            <Route path='/' component={HomeWithoutJoin} />
        }
      </Router>
    </div>
  )
}

export default App
