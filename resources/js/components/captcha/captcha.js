import {
    Alert,
    Button,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    TextField,
  } from "@mui/material";
  import React, { useEffect, useState,forwardRef,useImperativeHandle } from "react";

  import MaterialTextField from "../../Tags/MaterialTextField";
import RefreshIcon from '@mui/icons-material/Refresh';
   import "./captcha.css";
  var captchamsg=""

  
  const Captcha = (props,ref) => {
    const randomString = Math.random().toString(36).slice(8);
    const [captcha, setCaptcha] = useState(randomString);
    const [text, setText] = useState("");
    const [valid, setValid] = useState(false);
    const [success, setSuccess] = useState(false);
  
    const refreshString = () => {
      setText("");
      setCaptcha(Math.random().toString(36).slice(8));
      setValid(false);
    };


    
    const matchCaptcha=(event)=>{
      // event.preventDefault();
      var res = false;
       if (text === captcha) {
         res = true
        } 
        // console.log('Captcha', res)
        setValid(!res);
        return res
     }; 
  useImperativeHandle(ref,()=>({
    matchCaptcha,refreshString
  }))
    

   
    
      
    return (
    <>
              <div className="row">
                <div className="col-md-4 captcha">

                  <div className="wave-line">{captcha}</div>
                </div>
                <div className="col-md-4">

                  <Button
                    startIcon={<RefreshIcon />}
                    onClick={() => refreshString()}
                  ></Button>
                </div>
              </div>
            
              <MaterialTextField
                // style={{border:"none",backgroundColor:"#ffff"}}
                // placeholder="Enter Captcha"
                // focused
                value={text}
                fullWidth
                onChange={(e) => setText(e.target.value)}
                error={valid}
                helperText={valid && "Invalid Captcha"}
              />
  
              {/* <Button
                variant="contained"
                color="success"
                type="submit"
                sx={{ marginTop: "20px" }}
              >
                Submit
              </Button> */}
           
            {/* <form onSubmit={matchCaptcha}>
              <TextField
                label="Enter Captcha"
                focused
                value={text}
                fullWidth
                onChange={(e) => setText(e.target.value)}
                error={valid}
                helperText={valid && "Invalid Captcha"}
              />
  
              <Button
                variant="contained"
                color="success"
                type="submit"
                sx={{ marginTop: "20px" }}
              >
                Submit
              </Button>
            </form> */}
          </>
     
    );
  };
  
  export default forwardRef( Captcha)

  // function Success(props){
  //   // console.log("props==>",props)
  //   if(props!==undefined){
  //     return (props.success)
  //   }
   
  // }
  // const Success={
  //     captcha:
  // }

