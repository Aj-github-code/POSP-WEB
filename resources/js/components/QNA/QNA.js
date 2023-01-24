import React, { useState, useEffect} from 'react'
import { Box } from '@material-ui/core';
import { Button } from '@mui/material';
import { useParams, useLocation, Navigate,useNavigate } from 'react-router-dom';

import Api from '../../api';
import Swal from 'sweetalert2';

export default function QNA() {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const {exam_code} = location.state.data;
    

    const [isLoading, setIsLoading] = React.useState(true);
    const [count, setCount] = React.useState(0);
    const [campaign, setCampaign] = React.useState({});
    const [otherParamter, setOtherParameter] = React.useState({
        campaign:{},
        system_settings:{},
        user_parameters:{},
    });

    const [timer, setTimer] = useState();
    const [days, hours, minutes, seconds] = useCountdown(timer);
    
    const apiCtrl = new Api;
    const [qna, setQna] = React.useState({});
    const [answers, setAnswers] = useState([]);

    

    React.useEffect(()=>{
        let isMounted = true;  
        // document.getElementsByClassName("header").style = "none";
        apiCtrl.callAxios('get-campaign-by-campaign-code', {campaign_code: params.any}).then((res)=>{
            if(res.success == true){
                
                
                setCampaign(res.data);
                setOtherParameter(res.data.other_parameter)
                setTimer(Date.now() +(res.data.other_parameter.system_settings.exam_time.split(':').reduce((acc,time) => (60 * acc) + +time)*1000)  )
               
                
            }
        }).then(

            apiCtrl.callAxios('question-answer-list', {campaign_code: params.any}).then((res)=>{
                if(res.success == true){
                    setQna({...res.data});
                    
                }
            }).then(()=>{
                setIsLoading(false)
                // setTimer()
                return () => { isMounted = false };
            }
             
        )
    )},[])

    useEffect(()=>{
        if((days+hours+minutes+seconds)<= 0){
            alert('times up')
        }

    },[days,hours,minutes,seconds])
 
    const handleNext = () => {
        // console.log('QNA' , qna[count])
        // console.log('Answers', answers)
        // console.log('Question_id', qna[count].id)
        // console.log('exam_code', exam_code)
        // console.log('campaign_code', params.any)
        

        if(Object.keys(qna).length > (count)){
            var data = {
                campaign_code: params.any,
                exam_code: exam_code,
                question_id: qna[count].id,
                question_ans: qna[count],
                user_ans: answers,
            }

            apiCtrl.callAxios('submit-answers', data).then((res)=>{
                if(res.success == true){
                    setAnswers([]);
                    if(Object.keys(qna).length == (count+1)){
                        Swal.fire({
                            title: 'Thank You!',
                            text: 'Please wait your result is being generated.',
                            timer: 3000,
                            icon: "success",
                            showConfirmButton: false,
                            didOpen: () => {
                                Swal.showLoading()
                            }
                        })
                      
                        setTimeout(()=>{navigate(`/result/${params.any}`,{state:{data:exam_code}})},3000)
                    }
                } 
            })
            setCount((count+1));
        } else {
            Swal.fire({
                title: 'Thank You!',
                text: 'Please wait your result is being generated.',
                timer: 3000,
                icon: "success",
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading()
                }
            })
        }
       

        
    }
    const handleAnswers = (answer) => {
        if(answers.includes(answer) === false){

            setAnswers(old=>([...old, answer]))
        } else {
            const index = answers.indexOf(answer);

            const x = answers.splice(index, 1);
            setAnswers(answers)
        }
        
    }
  
    // const countDownDate = new Date().getTime();

    // const [countDown, setCountDown] = useState(
    //   countDownDate - new Date().getTime()
    // );

    return(
        <>
        {
            isLoading == false &&
           
            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
                <div className="row" style={{marginTop:'6%'}}>

                    <div className='col-md-12 d-flex' style={{justifyContent:'space-between', marginBottom:'2%'}}>
                        <span style={{fontSize:"20px", fontWeight:'600'}} >Examination: {otherParamter.campaign.reference_type}</span>
                    
                    <span> Time Left:- {hours} : {minutes} : {seconds}</span>
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
                            
                        {Object.entries(qna).slice(count,count+1).map(([index, value])=>{
                            return(
                              <Questions  key={index} answers={handleAnswers} exam_code={exam_code} func={handleNext} value={value} campaign={campaign} index={index} />
                            )
                        })}
                        <div className="row">
                            <div className="d-flex" style={{justifyContent:"right"}}>
                                {
                                    Object.keys(qna).length > (count+1)
                                    ?
                                    <Button variant="contained" onClick={()=>{handleNext()}} style={{ backgroundColor: '#1F5B54'}}  >Next</Button>
                                    :
                                    <Button variant="contained" onClick={()=>{handleNext()}}  style={{ backgroundColor: '#1F5B54'}}  >Submit</Button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        }
        </>
    )
}



export const Questions = ({campaign, answers, exam_code, value, index, func}) => {
    
    const [timer, setTimer] = useState(Date.now() + (value.timer.split(':').reduce((acc,time) => (60 * acc) + +time)*1000));
    const [days, hours, minutes, seconds] = useCountdown(timer);

    useEffect(()=>{
     
            setTimeout(()=>{

                if((days+hours+minutes+seconds)<= 0){
                    func();
                }
            },1000)
     
    },[days, hours, minutes, seconds])

    const handleChange = (e) => {
        // console.log(e.target.value)
        answers(e.target.value)
    }
    
    return(
        <div className="row" style={{marginLeft:'2%'}} key={index}>
            <div className="col-md-12 d-flex" style={{justifyContent:'space-between'}}>
                <span style={{fontSize:'20px'}}>Q{(++index)}. {value.question}</span>
                
                {campaign.campaign_type === 'exam' &&
                    
                        <span>({value.weightage} marks)<br /> <i className="fa fa-fw fa-clock"></i> {hours >0? hours+' : ' :''} {minutes} : {seconds}</span>
                        
                    
                }
            </div>
            <div className="col-md-12">
                <Box sx={{ width: '100%', marginLeft:'2%', height: 'auto', border:'1px', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
                {
                    Object.entries(value.campaign_answer).map(([key, val])=>{
                        return(
                            <div className="row ">
                                <div className="col-md-12">
                                    {value.question_type === 'checkbox' &&
                                        <input type="checkbox"  onChange={handleChange} name={val.answers}  value={val.id}/>}
                                    {
                                    value.question_type === 'radio' &&
                                    <input type="radio" id={val.question_id}  onChange={handleChange}  name={value.question} value={val.id}/>
                                    }
                                    <stong style={{marginLeft:'10px'}} >{val.answers}</stong>
                                </div>
                            </div>
                        )
                    })
                }
                </Box>
            </div>
        </div>
    )
}


export const useCountdown = (targetDate) => {
    const countDownDate = new Date( targetDate ).getTime();
    //  new Date(targetDate).getTime();
    const [countDown, setCountDown] = useState(
      countDownDate - new Date().getTime()
      );
      
      useEffect(() => {
          const interval = setInterval(() => {
              setCountDown(countDownDate - new Date().getTime());
      }, 1000);
  
      return () => clearInterval(interval);
    }, [countDownDate]);
  
    
    return getReturnValues(countDown);
  };
  
  const getReturnValues = (countDown) => {
    // calculate time left
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));


    const hours = Math.floor(
      (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));

    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return [days, hours, minutes, seconds];
  };