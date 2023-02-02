import { Box, Divider } from '@mui/material'
import React from 'react'
import MaterialButton from '../../Tags/MaterialButton'
import MaterialTextField from '../../Tags/MaterialTextField'
import Checkbox from '@mui/material/Checkbox'
// import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';
import  {Link } from "react-router-dom"
import ToggleButtons from './ToggleButton'
import FormControlLabel, { getFormControlLabelUtilityClasses } from '@mui/material/FormControlLabel';

import Api from '../../api'

//import './Login.css'
import './Login2.css'

import swal from 'sweetalert'

import Swal from 'sweetalert2'
import banner from '../../../assets/img/banner.jpg';
import footer from '../../../assets/img/26.png'
import logo from '../../../assets/img/logo.png'
  class ghjjfjf extends React.Component {

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
            localStorage.setItem('_token', response.access_token)
            localStorage.setItem('user_roles',  JSON.stringify(response.data.user_roles));
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
        <Divider sx={{ backgroundColor: '#183883', borderWidth: '2px', borderColor: '#1F5B54', justifyContent:"center" }} />
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
                    {/* <FormControlLabel control={<Checkbox />} label="Remember me" /> */}
                <a href="#" style={{marginTop:"10px", color:"#1F5B54"}}>Forgot Password?</a>
               
            </div>
            <div className="row">
                <div className="col-md-1 mb-4"></div>
                <div className="col-md-10 mt-4">
                    <MaterialButton style={{ backgroundColor: '#1F5B54'}} fullWidth name="login" text="Login" onClick={ submituser } />
                </div>
                <div className="col-md-1 mb-4"></div>
            </div>
        </div>
    </>
  )
        }
}


export default class Login extends React.Component {

    constructor(props){
        super(props);
        this.apiCtrl = new Api;

        this.state = {
            email : "",
            password : "",
            errors:{},
            validation:{
                email:{required:true,min:5, type:'email'}, 
                password:{required:true,min:5, type:'AlphaNumeric'}, 
                
            },
        }
    }

    render(){



    const submituser= async (e) => {
        e.preventDefault();
        var data = new FormData();

        var errors = {};
            var isValid = this.state.isValid;
            Object.entries(this.state.validation).map(([key,value])=>{

      
                    if( (this.state[key] === "") ) {
                        let temp =  key.replace(/_/g, " "); 
                        var fieldName = temp
                        .toLowerCase()
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');
                        if( value.required === true){
                           
                            errors[key] = `${fieldName} Field is Required`;
                            isValid = false;
                        }
                } else {
                    errors[key] = '';
                }
                this.setState(old=>({...old,errors:errors})) 
            })
    
            var count = 0;
            Object.entries(errors).map(([key, value])=>{
                if(value !== ''){
                    count += 1;
                }
            })
            
            if(count>0){
                return false;
            }
        
       


    this.apiCtrl.callAxios('login', this.state, false).then(response => {
        
        if(response.success) {
            localStorage.setItem('_token', response.access_token)
            localStorage.setItem('user_roles',  JSON.stringify(response.data.user_roles));
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


    const handleChange = (e) => {

        console.log('name'+e.target.name, 'value '+this.state.validation[e.target.name])
        let error={}
        let isValid = this.state.isValid;
       
        if(typeof this.state.validation[e.target.name] !== "undefined"){

            Object.entries(this.state.validation[e.target.name]).map(([key,value])=>{
         
                let temp =  e.target.name.replace(/-/g, " "); 
                var fieldName = temp
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
                if(key === 'required'){
                    if(e.target.value.length < 0){
                        error[e.target.name] = `${fieldName} Field is required`
                        // this.setState(old=>({...old,errors:error})) 
                        isValid = false;
                    } 
                } else if(key === 'min'){
                    if(e.target.value.length < value){
                          error[e.target.name] = `${fieldName} must be more than ${value} characters`
                        // error[e.target.name] = `${fieldName} must be less than ${value} characters`
                        // this.setState(old=>({...old,errors:error})) 
                        isValid = false;
                    }
                } else if(key === 'max'){
                    if(e.target.value.length > value){
                        // error[e.target.name] = `${fieldName} must be more than ${value} characters`
                        error[e.target.name] = `${fieldName} must be less than ${value} characters`
                        isValid = false;
                        // this.setState(old=>({...old,errors:error})) 
                    }
                } else if(key === 'type'){
                    if(value === 'alpha'){
                        if(!e.target.value.match(/^[A-Za-z\s]*$/)){
                            // this.setState(old=>({...old,errors:error})) 
                            error[e.target.name] = `${fieldName} must be String characters`
                            isValid = false;
                        }
                    } else if(value === 'AlphaNumeric'){
                        if(!e.target.value.match(/^[A-Za-z0-9]*$/)){
                            error[e.target.name] = `${fieldName} must be String Alpha Numeric`
                            // this.setState(old=>({...old,errors:error})) 
                            isValid = false;
                        }
                    } else if(value === 'Numeric'){
                        if(!e.target.value.match(/^[0-9]*$/)){
                            error[e.target.name] = `${fieldName} `
                            // this.setState(old=>({...old,errors:error})) 
                            isValid = false;
                        }
                    } else if(value === 'email'){
                        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                        if(reg.test(e.target.value) === false){
                            error[e.target.name] = `${fieldName} Is Invalid `
                            // this.setState(old=>({...old,errors:error})) 
                            isValid = false;
                        }
                    }
                       
                } else {
                    isValid = true;
                    error[e.target.name] = '';
                }

              //console.log("val",value, key+"  key")
            })
        }

           
                
                // this.setState({isValid : isValid});
                this.setState(old => ({...old,[e.target.name]: e.target.value  }))
                this.setState(old=>({...old,errors:error})) 
            


      


    }

    var msg = Object.entries(this.state.errors);
  
    var str={};
    //  var msgclr =false
     
         msg.map(([key, msg])=>{
        //   console.log("api controller ",this.state.errors);
        //  // console.log("key ", key, "value"+msg)
          if(msg !== ""){

              str[key] = msg;
           
          } else {
            str[key] = "";
          }
         })

  return (
    <>

<header>
        <div className="container">
            <img src={logo} className="logo"/>
        </div>
    </header>
    <section className="container-fluid bg-dark" style={{marginTop: "121px"}}>
        <div className="row">
            <div className="col-lg-6 p-0">
                <img src={banner} className="img-fluid banner-img"/>
                {/* <img src=""/> */}
            </div>
            <div className="col-lg-1">

            </div>
            <div className="col-lg-4 py-1 d-flex justify-content-center align-items-center ">
                <div className="login">
                    <h1 >Login</h1>
                    <form className="login-form" onSubmit={submituser}>
                        <div className="input-wrapper">
                            {/* <input type="text" placeholder="Partner User Name"/> */}
                             <MaterialTextField 
                              size="small" fullWidth 
                               onChange={handleChange} 
                                name="email" 
                                helperText={str.email?str.email: ''}
                                error={str.email?true:false}
                                />
                              {/* <small className="text-danger">Error Messgae</small>   */}
                        </div>
                        <div className="input-wrapper">
                            {/* <input type="password" placeholder="Password"/> */}
                              <MaterialTextField 
                              type={"password"}    size="small" fullWidth 
                               onChange={handleChange} 
                               helperText={str.password?str.password: ''}
                               error={str.password?true:false}
                                name="password" />
                        </div>
                        <a href="#">Forgot ID / Password ?</a>
                        <input type="submit" value="Submit" className="submitBtn" submituser/>
                    </form>
                </div>
            </div>
        </div>


    </section>
    <footer className="footer-area footer">
        <div className="container-fluid p-0">
            <div className="row mx-0">
                <div className="col-lg-9 ps-md-5 order-md-1 order-2">
                    <p className=" pt-4 mb-1">Corporate &amp; Registered Office Address: 10th Floor, Regent Chambers,
                        Jamnalal Bajaj Road, Nariman Point, Mumbai - 400 021 India. CIN: U67120MH1992PLC066006 | ISO:
                        9001:2005: GSTIN: 27AAACP3441M2ZA | IRDA Composite License No: 175 (Valid till 08/06/2024).
                        Insurance is a subject matter of Solicitation. Sarathi is a partnership program for POS (Point
                        of Sale Person) associated with Anand Rathi Insurance Brokers Ltd. * Claim settlement process is
                        undertaken by the Insurer. Income is subject to performance and as per defined terms, conditions
                        and in adherence to the regulatory purview.</p>
                    <a className="text-light">Privacy Policy</a>
                </div>


                <div className="col-lg-3 order-md-2 order-1 p-md-0 px-3 overflow-hidden ">
                    <img className="ms-md-0 ms-3 img-fluid" src={footer}/>
                    <h6 className="text-white">Anand Rathi Insurance Brokers Limited</h6>
                    <p>10th Floor Regent Chambers, Jamnalal Bajaj Marg,<br/> Nariman Point, Mumbai, Maharashtra 400021
                    </p>
                </div>
            </div>
        </div>
    </footer>
    </>
  )
        }
}
