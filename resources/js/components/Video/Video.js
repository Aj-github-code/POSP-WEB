import { Button } from '@mui/material';
import React, { useRef } from 'react'
import { useLocation, Link, useNavigate  } from 'react-router-dom';
import ReactPlayer from 'react-player'

import { URL } from '../../api';

import Api from '../../api';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { set } from 'lodash';

export default function Video(){
    const navigate = useNavigate();
    const location = useLocation();
    const {campaign_type,campaign_code , other_parameter} = location.state.value;
    const {system_settings, user_parameters, campaign } = JSON.parse(other_parameter);
    const[examlist,setExamlist]=useState([])
    const [duration,setDuration]=useState("")
    const [currentTime,setCurrentTime]=useState(null)
    const [time,setTime]=useState("00:00")
    const [play,setPlay]=useState(false)
    const [timeduration,setTimeduration]=useState("00:00")
    const apiCtrl = new Api;

    const videoRef=useRef()
    
    const startExamination = () => {

        apiCtrl.callAxios('question-answer-list', {campaign_code: campaign_code}).then((res)=>{
            // console.log("questionlist=>",res)
            // console.log("length=>",res.data.length)
           setExamlist(res.data)

           if(res.data.length > 0){
            apiCtrl.callAxios('create-user-exam-result', {campaign_code: campaign_code}).then((res)=>{
                        // console.log("resExam =>",res)
                       
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

   
    let hrs, mins, secs;


    const handlePlay = () => {
            videoRef.current.play()

            var  durations=videoRef.current.duration

            var time = videoRef.current.duration;
            var minutes = Math.floor(time / 60);   
            var seconds = Math.floor(time % 60);  
            if (seconds < 10) {
                secs = '0' + String(seconds);
            }
    
            // Set the video duration\
            // console.log("timesec=>",minutes + ':' + seconds)
          
           setTimeduration( minutes + ':' + seconds)
            setDuration(durations)
        
            setPlay(true)

            //  console.log("duration=>",Math.round(videoRef.current.currentTime))
            //const sec =videoRef.current.duration.toString().split(".")[0]
                
            //  console.log("duration=>",duration)
            

            //     setInterval(() => {
            //         mins = Math.floor(videoRef.current.currentTime / 60);
            //         secs = Math.floor(videoRef.current.currentTime % 60);
            //             if (secs < 10) {
            //               secs = '0' + String(secs);
            //             }
            //         //counter.textContent = mins + ':' + secs;
            //         console.log("minsec=>", mins + ':' + secs)
            
            //         setSecondsElapsed(videoRef.current.currentTime)
            //       },1000);

    
    };

    
    const handlePause = () => {

        setPlay(false)
        videoRef.current.pause()

    };
    
    const ontimeupdate=()=>{
      //  console.log("Currentime=>",videoRef.current.currentTime)
        setCurrentTime(videoRef.current.currentTime)

        mins = Math.floor(videoRef.current.currentTime / 60);
        secs = Math.floor(videoRef.current.currentTime % 60);
            if (secs < 10) {
                secs = '0' + String(secs);
            }

            setTime( mins + ':' + secs)
            // console.log("currenttime=>",time)
        //counter.textContent = mins + ':' + secs;
        //console.log("minsec=>", mins + ':' + secs)
    }

    

 
    
    
    //console.log("examliststate=>",examlist)
    // const {description, title, images} = (location.state);
  return (
    <div className="filters_listing sticky_horizontal" style={{marginTop:'8%'}}>
        <div className="row m-2">
            <div style={{position:'relative',height:"40%", width:"60%"}}>
             <video src={'https://online-exam.primarykeytech.in/public/images/intro.mp4'} ref={videoRef}    onTimeUpdate={ontimeupdate}  style={{objectFit:'cover'}} />

            {/* <video src={URL+'uploads/videos/'+user_parameters.video} controls style={{ height:"40%", width:"60%"}} /> */}
            {/* <ReactPlayer url= 'https://online-exam.primarykeytech.in/public/images/intro.mp4'   style={{ height:"40%", width:"60%"}}
             onDuration={onDuration} onProgress={onProgress} 
                   ref={videoRef}
             /> */}
               
               <button onClick={handlePlay}  style={{position:'absolute',display:`${play ? 'none' : 'block'}`, color:'white', top:0, bottom:0, right:0, left:0, background:'unset'}}> 
               <i className='fa fa-fw fa-play'></i> </button>
               <button onClick={handlePause} style={{position:'absolute', display:`${play ? 'block' : 'none'}`, color:'white', top:0, bottom:0, right:0, left:0, background:'unset'}}><i className='fa fa-fw fa-pause'></i></button>

            </div>
            <strong style={{marginTop:"-21px",display:"flex",marginLeft:"13px",color:"#ffff",zIndex:"1"}}>{time+" "+"/"+" "+timeduration}</strong>
            <div className="row mt-2">
                <div className="col-md-12">
                    {/* <h3><strong>{campaign_type}</strong> | {campaign.reference_type} </h3> */}
                    <h3><strong>{campaign_type}</strong> | {campaign.title} </h3>
                </div>
            </div>
            {currentTime==duration?
                <>

                    {campaign_type!=="training"?
                    <div className=" d-flex" style={{justifyContent:"right"}}>
                        <Button variant="contained" onClick={()=>{startExamination()}} style={{ backgroundColor: '#1F5B54'}}  >Take Test</Button>
                        <div className="float-right">
                        </div>
                    </div>:""
                    }
                </>:""
            }
            
        </div>
    </div>
  )
}

