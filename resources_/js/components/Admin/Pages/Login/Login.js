import { Box, Divider } from '@mui/material'
import React from 'react'
import MaterialButton from '../../../../Tags/MaterialButton'
import MaterialTextField from '../../../../Tags/MaterialTextField'
import Checkbox from '@mui/material/Checkbox'
// import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';
import  {Link } from "react-router-dom"
import ToggleButtons from './ToggleButton'
import FormControlLabel, { getFormControlLabelUtilityClasses } from '@mui/material/FormControlLabel';

import Api from '../../../../api'

import './Login.css'

import swal from 'sweetalert'

import Swal from 'sweetalert2'


export default class Login extends React.Component {

    constructor(props){
        super(props);
        this.apiCtrl = new Api;

        this.state = {
            email : '',
            password : ''
        }
    }

    render(){



    const submituser= async (e) => {
        e.preventDefault();
        var data = new FormData();


    this.apiCtrl.callAxios('login', this.state, false).then(response => {
        
        if(response.success) {
            console.log('Login Response', response)
            localStorage.setItem('_token', response.access_token)
             localStorage.setItem('user_roles',  JSON.stringify(response.data.user_roles));
         //   localStorage.setItem('user_details', JSON.stringify(response.data));
         localStorage.setItem('user_details', JSON.stringify(response.data.user_details));


            Swal.fire({
                title: "Login",
                text: "Logged In Successfully!",
                icon: "success",
                showConfirmButton: false,
            })
            location.reload('/')
            
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Login',
                text: ''+response.message,
               
              })
        }
    }).catch(function (error) {
  
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something wents wrong!',
           
          })
      });

    }
  return (
    <>

       <div style={{ height: 'auto', width:"40%", maxWidth:"90%", backgroundColor: '#FFFFFF', margin:"2px auto",marginTop:"10%", textAlign:'center',  paddingBottom: '5%' }} className="login-box">
        <Divider sx={{ backgroundColor: '#183883', borderWidth: '2px', borderColor: '#183883', justifyContent:"center" }} />
            <div className="row" style={{justifyContent:"center"}}>
                <label style={{ fontSize: '26px', color: '#000000', marginTop: '5%'}}>Welcome!</label>
            </div>
            <div className="row" style={{justifyContent:"center"}}>
                <div className="mb-4">
                    {/* <label style={{ fontSize: '18px', color: '#000000' }}>Please Enter Your Valid Credentials</label> */}
                </div>
            </div>
            {/* <div className='row'>
                <div className="col-md-1 mb-4"></div>
                <div className="col-md-10 mb-4">
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button>Quality Checker</Button>
                    <Button>Dealer</Button>
                    <Button>Assessor</Button>
                </ButtonGroup>
                </div>
                <div className="col-md-1 mb-4"></div>
            </div> */}
            {/* <div className='row'>
                <div className="col-md-12 mb-4">
                    <ToggleButtons/>
                </div>
            </div> */}
            <div className='row'>
                <div className="col-md-1 mb-4"></div>
                <div className="col-md-10 mb-4">
                    <MaterialTextField label="Login ID" size="small" fullWidth onChange={(e)=>this.setState({email: e.target.value})} name="email" />
                </div>
                <div className="col-md-1 mb-4"></div>

            </div>
            <div className='row'>
                <div className="col-md-1 mb-4"></div>
                <div className="col-md-10 mb-4">
                    <MaterialTextField type={"password"}  label="Password"  size="small" fullWidth onChange={(e)=>this.setState({password: e.target.value})} name="password" />
                </div>
                <div className="col-md-1"></div>
            </div>

            <div className='row' style={{ justifyContent:"space-around"}}>
                    <FormControlLabel control={<Checkbox />} label="Remember me" />
                <a href="#" style={{marginTop:"10px"}}>Forgot Password?</a>
               
            </div>
            <div className="row">
                <div className="col-md-1 mb-4"></div>
                <div className="col-md-10 mt-4">
                    <MaterialButton style={{ backgroundColor: '#183883'}} fullWidth name="login" text="Login" onClick={ submituser } />
                </div>
                <div className="col-md-1 mb-4"></div>
            </div>
        </div>
    </>
  )
        }
}
