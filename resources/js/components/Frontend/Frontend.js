import React from 'react'

import Navbar from '../Navbar/Navbar'
import About_us from '../../Pages/About'
import MainHomePage from '../../Pages/Main_home_page'
import Adventure from '../../Pages/Adventure'

import Form from '../../Pages/Form'
import SiderBar from '../SiderBar/SiderBar'

import SignUp from '../SignUp/SignUp';

import Courses from '../Courses/Courses'
import MyCourses from '../MyCourses/MyCourses'
import Video from '../Video/Video'
import QNA from '../QNA/QNA'
import Results from '../Results/Results'

import '../../../assets/js/admin/admin.js';
 import '../../../css/admin/admin.css';
 
 import '../../../css/admin/font-awesome.min.css';
 import '../../../assets/js/admin/jquery.easing.min.js';

import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import ResultHistory from '../Admin/Pages/Result_History/Result_History'

 const Frontend = () => {
    return (
        <>
        <Router> 

        <Navbar/>
        <Routes>       

            <Route exact path="/" element={ <Courses campaign_type={"exam"}/>} />
            <Route exact path="/courses" element={<Courses campaign_type={"courses"}/>} />
            <Route path="/adventure" element={<Adventure />} />
            <Route path="/about" element={<About_us />} />
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/training" element={<Video />} />
            <Route path="/qna/:any" element={<QNA />} />
            <Route path="/result/:any" element={<Results />} />
            <Route path ='/training/result-history' element={<ResultHistory/>}/>
           

            {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
        </Router>
        </>
    )
}

export default Frontend;