import React from 'react'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import About_us from '../Pages/About'
import MainHomePage from '../Pages/Main_home_page'
import Adventure from '../Pages/Adventure'

import Form from '../Pages/Form'
import SiderBar from '../components/SiderBar/SiderBar'

import SignUp from '../components/SignUp/SignUp';
import Layout from '../components/Admin/Layout/Layout'

import Login  from '../components/Login/Login'

import Courses from '../components/Courses/Courses'
import MyCourses from '../components/MyCourses/MyCourses'
import Video from '../components/Video/Video'
import QNA from '../components/QNA/QNA'
import Results from '../components/Results/Results'


const isLoggedIn = () => {
  
  if(localStorage.getItem('_token')){

    return true
  } else {
    return false
  }
}
const Routerss = () => {
  var roles = JSON.parse(localStorage.getItem('user_roles'))
  return (
    <div>
      
      {isLoggedIn()
      
      
        ? 
        <>
          {  ((roles[0].role_code === "SA") || (roles[0].role_code === "AD")) 
            ?
            <Layout />
            :
            <Router> 

              <Navbar/>
              <Routes>       
  
                  <Route exact path="/" element={<Courses head={'margin_60_35'} />} />
                  <Route path="/adventure" element={<Adventure />} />
                  <Route path="/about" element={<About_us />} />
                  <Route path="/my-courses" element={<MyCourses />} />
                  <Route path="/exam" element={<Video />} />
                  <Route path="/qna/:any" element={<QNA />} />
                  <Route path="/result/:any" element={<Results />} />

                  {/* <Route path="/login" element={<Login />} /> */}
                </Routes>
                </Router>
            }
        </>
          
        :
        <Login />
 
        
        }
    </div>
  )
}

export default Routerss

