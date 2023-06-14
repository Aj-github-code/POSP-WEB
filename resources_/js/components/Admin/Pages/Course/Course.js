import React, { useEffect } from 'react'



import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Api from '../../../../api';
import Swal from 'sweetalert2';
import { Box } from '@material-ui/core';
import BreadCrumb from "../../BreadCrumb/BreadCrumb";

import Courses from '../../../Courses/Courses';

export default function Course() {
    var roles = JSON.parse(localStorage.getItem('user_roles'))

    const [courses, setCourses] = React.useState({});

//     const apiCtrl = new Api;
// //     React.useEffect(()=>{
// //         apiCtrl.callAxios('get-campaign').then((res)=>{
// // console.log('Response ',res);
// //             if(res.success == true){
// //                 setCourses({...res.data});
// //             }
// //         })
// //     },[])

const [isVisible, setIsVisible] = React.useState({'-1':false})
    const [btnVariant1, setBtnVariant1] = React.useState({variant:'outlined', backgroundColor:"#1F5B54"});
    const [btnVariant2, setBtnVariant2] = React.useState({variant:'contained', backgroundColor:"#1F5B54"});
    const [btnVariant3, setBtnVariant3] = React.useState({variant:'contained', backgroundColor:"#1F5B54"});

    const apiCtrl = new Api;
    React.useEffect(()=>{
        handleCampaign('all');
    },[])
    const handleCampaign = (filter) => {
        apiCtrl.callAxios('get-campaign', {assigned:filter}).then((res)=>{
            // console.log('Response ',res);
            if(res.success == true){
                setCourses({...res.data});
            }
        })
    }

  return (
    <>
 
        <BreadCrumb breadcrumb="Courses"  />
            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
            <Courses head={''} />
        </Box>
    </>
  )
}

