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
import Dashboard from'../Dashboard/Dashboard'

import '../../../assets/js/admin/admin.js';
 import '../../../css/admin/admin.css';
 
 import '../../../css/admin/font-awesome.min.css';
 import '../../../assets/js/admin/jquery.easing.min.js';

import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import ResultHistory from '../Admin/Pages/Result_History/Result_History'
import { ExamAnswerList } from '../Admin/Pages/Result_History/Examanswer'
import My_Profile from '../MyProfile/My_Profile'
import { useState } from 'react'
import { useEffect } from 'react'
import Api from '../../api'
import Crypt from '../../Services/Crypt'


 const Frontend = () => {
    const cryptCtrl = new Crypt;

    const [state,setState]=useState({
        id:""
    })
    const apiCtrl=new Api

    useEffect(()=>{
        var x = cryptCtrl.decrypt(localStorage.getItem("posp_user_details"));
       // console.log("getlocatdata=>",x)

        let localdata=JSON.parse(x) 
        const data={
            email:localdata.email
            
        }





        apiCtrl.callAxios("users/myprofile",{}).then(res=>{

        //	console.log("response=>",res)
            setState({...res.data})

        })

        },[])
    return (
        <>
        <Router> 

        <Navbar data={state}/>
        <Routes>       

            <Route exact path="/" element={ <Courses campaign_type={"training"} head={'margin_60_35'} />} />
            <Route exact path="/courses" element={<Courses campaign_type={"courses"} head={'margin_60_35'} />} />
            <Route path="/adventure" element={<Adventure />} />
            <Route path="/about" element={<About_us />} />
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/training" element={<Video />} />
            <Route path="/qna/:any" element={<QNA />} />
            <Route path="/result/:any" element={<Results />} />
            <Route path ='/training/result-history' element={<ResultHistory/>}/>
            <Route path='/examans-list' element={<ExamAnswerList head={'margin_60_35'}/>}/>
            <Route path ='/dashboard' element={<Dashboard/>}/>
            {/* <Route path='/my-profile' element={<MyProfile/>}/> */}
            {<Route path='/my-profile' element={<My_Profile />}/>}
           

            {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
        </Router>
        </>
    )
}

export default Frontend;