import { Button } from '@mui/material';
import React from 'react'
import { useLocation, Link, useNavigate  } from 'react-router-dom';

import { URL } from '../../api';

import Api from '../../api';
import Swal from 'sweetalert2';
import { useState } from 'react';

export default function Video(){
    const navigate = useNavigate();
    const location = useLocation();
    const {campaign_type,campaign_code , other_parameter} = location.state.value;
    const {system_settings, user_parameters, campaign } = JSON.parse(other_parameter);
    const[examlist,setExamlist]=useState([])

    const apiCtrl = new Api;
    
    const startExamination = () => {

        apiCtrl.callAxios('question-answer-list', {campaign_code: campaign_code}).then((res)=>{
            console.log("questionlist=>",res)
            console.log("length=>",res.data.length)
           setExamlist(res.data)

           if(res.data.length > 0){
            apiCtrl.callAxios('create-user-exam-result', {campaign_code: campaign_code}).then((res)=>{
                        console.log("resExam =>",res)
                       
                        if(res.success == true){
                            Swal.fire({
                                title:"Examination",
                                text:"Examination is Starting!",
                                timer: 3000,
                                icon: "success",
                                showConfirmButton: false,
                            });
                        navigate(`/qna/${campaign_code}`,{state:{data:res.data}})
                        }else {
                            Swal.fire({
                                title:"Examination",
                                text:"Unable to start Examination",
                                timer: 3000,
                                icon: "error",
                                showConfirmButton: false,
                            });
                        }
            })
            }else{
                Swal.fire({
                    title:"Qustion",
                    text:"Qustion not found for this Exam",
                    timer: 3000,
                    icon: "error",
                    showConfirmButton: false,
                });
            }

        })

       
    }

    console.log("examliststate=>",examlist)
    // const {description, title, images} = (location.state);
  return (
    <div className="filters_listing sticky_horizontal" style={{marginTop:'8%'}}>
        <div className="row m-2">

            <video src={URL+'uploads/videos/'+user_parameters.video} controls style={{ height:"40%", width:"60%"}} />
            <div className="row mt-2">
                <div className="col-md-12">
                    {/* <h3><strong>{campaign_type}</strong> | {campaign.reference_type} </h3> */}
                    <h3><strong>{campaign_type}</strong> | {campaign.title} </h3>
                </div>
            </div>
            {campaign_type!=="courses"?
            <div className=" d-flex" style={{justifyContent:"right"}}>
                   <Button variant="contained" onClick={()=>{startExamination()}} style={{ backgroundColor: '#1F5B54'}}  >Take Test</Button>
                <div className="float-right">
                </div>
            </div>:""
             }
        </div>
    </div>
  )
}

