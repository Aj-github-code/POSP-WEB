import React from "react";
import { useEffect } from "react";
import { Box } from '@mui/material';
import Api from "../../../../api";
import { useState } from "react";
import '../Result_History/Examanswer.css'
import { Loader } from "../../../Loader/Loader";

export const ExamAnswerList=(props)=>{
    const [examanswer,setExamanswer]=useState([])
    const [isLoading,setIsloading]=useState(true)

    const apiCtrl = new Api;
    const success={
        background:"#ADE792",
       color:"#fff"
    }
    const fail={
        background:"red",
       color:"#fff"
    }
    const undefined={
        background:"#d2c9c9",
        color:"#fff"
    }

    const data={
        exam_code:"exam-camp_1V5w0m-3-7"
    }

    React.useEffect(()=>{

        
       
        apiCtrl.callAxios('userexamlist',data).then((res)=>{
            setIsloading(false)
            // console.log("res=>",res)
            setExamanswer(res.data)

        })
    },[])
    // useEffect(()=>{
    //     alert()

    //     apiCtrl.callAxios("userexamlist",{exam_code:"exam-camp_1V5w0m-3-7"}).then((res)=>{
            // console.log("res=>",res)
            
    //     })

    // },[])

   return(<>  

        <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }} style={props.head != '' ? {marginTop:'8%'} : {marginTop:'4%'} }>
            
          {!isLoading?<>
                {examanswer.length >0?
                    Object.entries(examanswer).map(([key, val])=>{
                        // console.log("key",key,"val",val)
                    //   console.log("userans=>",val.user_ans)
                        
                        return(<>
                            
                            


                            <div className="container mt-sm-3 my-1">
                                <div className="question ml-sm-3 pl-sm-5 pt-2">
                                    <div className="py-2 h5"><b>Q{(++key)}.{val.question_ans.question}</b></div>
                                    <div className="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
                                    {Object.entries(val.question_ans.campaign_answer).map(([key1,val1])=>{
                                            //    console.log("key2",key1,"val2",val1)
                                            // console.log("Isans=>",val1.is_ans)
                                            let ansval = val.user_ans.find(i => i == val1.id);
                                            // console.log("ansval=>",ansval)
                                            return(<>
                                                <strong></strong>
                                                {/* <label className="options rounded d-flex justify-content-between  "  style={val.user_ans[0]==val1.id?{background:"#ADE792", color:"#fff"}:{color:""}}><span >{val1.answers}</span> <span >{val.user_ans[0]==val1.id?<><i className="fa fa-fw fa-angle-left  "></i></>:""}</span> </label>  */}
                                                <label className="options rounded d-flex justify-content-between  "  style={(typeof ansval !== 'undefined')?((val1.is_ans === "1")?success:fail):(typeof ansval == 'undefined')&&(val1.is_ans === "1")?undefined:{}}><span >{val1.answers}</span> <span >{(typeof ansval !== 'undefined')?((val1.is_ans === "1")?<i className="fa fa-fw fa-check  "></i>:<i className="fa fa-fw fa-times  "></i>):{}?<></>:""}</span> </label> 


                                            </>)
                                        })}
                                        
                                    </div>
                                </div>
                            </div>


                                
                                
                        </>)
                    })
                :"" 
                }
            </>:<Loader/>
          }
        </Box>

   {/* <div className={`container ${props.head}`} style={props.head != '' ? {marginTop:'8%'} : {marginTop:'4%'} } >
      <h1>Exam Answer List</h1>
    </div> */}

   




   </>)


}