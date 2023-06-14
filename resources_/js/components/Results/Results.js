import React from 'react'
import { useEffect } from 'react'
import Api from '../../api'
import { useParams,  useLocation } from 'react-router-dom';

import { Box } from '@material-ui/core';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
export default function Results() {
    const apiCtrl = new Api;
    const location = useLocation();
    const params = useParams();
    const exam_code = location.state.data;

    const [result, setResult] = React.useState({});
    
    const [isLoading, setIsLoading] = React.useState(true);
    const [count, setCount] = React.useState(0);
    const [campaign, setCampaign] = React.useState({});
    const [otherParamter, setOtherParameter] = React.useState({
        campaign:{},
        system_settings:{},
        user_parameters:{},
    });

    useEffect(()=>{
        let isMounted = true;  
        // console.log('Exam Code', exam_code)
        var data = {exam_code: exam_code}
        apiCtrl.callAxios('get-campaign-by-campaign-code', {campaign_code: params.any}).then((res)=>{
            if(res.success == true){
                
                
                setCampaign(res.data);
                setOtherParameter(res.data.other_parameter)
                setTimer(Date.now() +(res.data.other_parameter.system_settings.exam_time.split(':').reduce((acc,time) => (60 * acc) + +time)*1000)  )
               
                
            }
        }).then(
       
        apiCtrl.callAxios('user-exam-result-list', data).then((res)=>{
            if(res.success == true){
                setResult(res.data[0]);
            }
        }).then(()=>{
            setIsLoading(false)
            // setTimer()
            return () => { isMounted = false };
        }
        
    )
       
    )},[]);
  return (
    <>
          {
            isLoading == false &&
           
            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
                <div className="row" style={{marginTop:'6%'}}>

                    <div className='col-md-12 d-flex' style={{justifyContent:'space-between', marginBottom:'2%'}}>
                        <span style={{fontSize:"20px", fontWeight:'600'}} >Result: {otherParamter.campaign.title}</span>
                    
                    
                        <div className="row">
                            {campaign.campaign_type === 'exam' &&
                                <div className="col-md-12 d-flex" >
                                    <span>Total Marks: <strong>{otherParamter.system_settings.total_marks}</strong>&nbsp;&nbsp;&nbsp;</span>
                                    |
                                    <span> &nbsp;&nbsp;&nbsp;Passing Marks: <strong>{otherParamter.system_settings.passing_marks}</strong></span>
                                </div>
                            }
                        </div>
                 
                    </div>
                    <div className='col-md-12 '>
                            <p>Name: {result.name}</p>
                            <p>Marks Obtain: {result.marks}</p>
                            <p>Exam Result: {result.status}</p>
                       
                    </div>
                </div>
            </Box>
        }
    </>
  )
}
