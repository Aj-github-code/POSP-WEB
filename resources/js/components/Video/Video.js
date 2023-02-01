import { Button } from '@mui/material';
import React from 'react'
import { useLocation, Link, useNavigate  } from 'react-router-dom';

import { URL } from '../../api';

import Api from '../../api';
import Swal from 'sweetalert2';

export default function Video(){
    const navigate = useNavigate();
    const location = useLocation();
    const {campaign_type,campaign_code , other_parameter} = location.state.value;
    const {system_settings, user_parameters, campaign } = JSON.parse(other_parameter);

    const apiCtrl = new Api;
    
    const startExamination = () => {
        apiCtrl.callAxios('create-user-exam-result', {campaign_code: campaign_code}).then((res)=>{
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
    }

  //  console.log("campaign=>",campaign)
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

