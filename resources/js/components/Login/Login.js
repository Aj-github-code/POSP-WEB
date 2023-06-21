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
import banner from '../../../assets/img/banners.jpg';
import footer from '../../../assets/img/26.png'
import logo from '../../../assets/img/logo.png'
import { fontWeight } from '@mui/system'

import Crypt from '../../Services/Crypt'

import Captcha from '../captcha/captcha'
import withRouter from '../../withRouter'

export default class Login extends React.Component {

    constructor(props){
        super(props);
        this.apiCtrl = new Api;

        this.ref = React.createRef();
        this.cryptCtrl = new Crypt;
        this.state = {
            errors:{}, 
            email :null,
            password :null,
            data:{},
            validation:{
                email:{required:true,min:5, type:'email'}, 
                password:{required:true,min:5, type:'password'}, 
                
            },
            isValid:false,
         
        }
    }

    componentDidMount(){
        this.setState(old=>({...old,data:this.props.data}))
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps !== this.props){
            this.setState(old=>({...old,data:{...this.props.data}}))
           //console.log("Location ",this.props.location)
        } 
      }
    render(){


        // console.log('Login Props=>>',this.ref)
        const validation = (fieldName, fieldValue) => {
            
            let error={}
            let isValid = true;
            let isMax = 1000;
            if(typeof this.state.validation[fieldName] !== "undefined"){
                Object.entries(this.state.validation[fieldName]).map(([key,value])=>{
             
                    let temp =  fieldName.replace(/_/g, " "); 
                    var name = temp
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
              
                    if(key === 'required'){
                        if((fieldValue.length < 0) || (fieldValue === '') || (fieldValue === null)){
                            error[fieldName] = `${name} Field is required`
                            isValid = false;
                        } 
                    } else if(key === 'min'){
                        if(fieldValue.length < value){
                            error[fieldName] = `${name} must be more than ${value} characters`
                            isValid = false;
                        }
                    } else if(key === 'max'){
                        if(fieldValue.length > value){
                            error[fieldName] = `${name} must be less than ${value} characters`
                            isMax = value;
                            isValid = false;
                        }
                    } else if(key === 'type'){
                        if(value === 'alpha'){
                            if(!fieldValue.match(/^[A-Za-z\s]*$/)){
                                error[fieldName] = `${name} must be String characters`
                                isValid = false;
                            }
                        } else if(value === 'AlphaNumeric'){
                            if(!fieldValue.match(/^[A-Za-z0-9,-.\s]*$/)){
                                error[fieldName] = `${name} must be String Alpha Numeric`
                                isValid = false;
                            }
                        } else if(value === 'Numeric'){
                            if(!fieldValue.match(/^[0-9]*$/)){
                                error[fieldName] = `${name} must be String Numeric`
                                isValid = false;
                            }
                        } else if(value === 'email'){
                            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                            if(!fieldValue.match(reg) ){
                                error[fieldName] = `${name} must be in Email format`
                                isValid = false;
                            }
                        }else if(value=="password"){
                            let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
                            if(!fieldValue.match(reg) ){
                                error[fieldName] = `${name} must have Atleast 1 UpperCase, LowerCase, Number, Special Character format`
                                isValid = false;
                            }
                        }

                           
                    }
                    if(isValid == true) {
                        
                        error[fieldName] = '';
                    }
                })
                this.setState(old=>({...old,errors:{ ...old.errors, ...error}})) 
            }
         
            if(isMax >= fieldValue.length){
                this.setState(old => ({...old,[fieldName]: fieldValue }) )                
            }
        }


        const handleChange = (e) => {

            validation(e.target.name, e.target.value)
        }
    const submituser= async (e) => {
        e.preventDefault();

        if(this.ref.current.matchCaptcha()){
            this.ref.current.refreshString();
            let errors = {};
            let isValid = this.state.isValid;
            Object.entries(this.state.validation).map(([key,value])=>{
    
                
                if((typeof this.state[key] === 'undefined') || (this.state[key] === null) ||(this.state[key] === "")  ) {
                    let temp =  key.replace(/_/g, " "); 
                    var name = temp
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
    
                    if(value.required === true){
                        errors[key] = `${name} Field is Required`;
                        isValid = false;
                    }
                    
                } else {
                    validation(key, this.state[key]);
                }
            })
    
            isValid = false;
            Object.entries(this.state.errors).map(([key, value])=>{
                if(value !== ''){
                    isValid = true;
                }
            })
            
            if(isValid){
                return isValid;
            }
            // console.log("count=>",count)
         
            const data={
                email:this.state.email,
                password:this.state.password
            }
    
            var encryptedData = this.cryptCtrl.encrypt(JSON.stringify(data));
            this.apiCtrl.callAxios('login', {request: encryptedData}, false).then(response => {
                
                if(response.success) {
    
                    var decryptedData = JSON.parse(this.cryptCtrl.decrypt(response.data));
               
                    localStorage.setItem('_token_posp',  this.cryptCtrl.encrypt(response.access_token))
                    localStorage.setItem('posp_user_roles',  this.cryptCtrl.encrypt(JSON.stringify(decryptedData.user_roles)));
                    localStorage.setItem('posp_user_details', this.cryptCtrl.encrypt(JSON.stringify(decryptedData.user_details)));
    
                    Swal.fire({
                        title: "Login",
                        text: "Logged In Successfully!",
                        icon: "success",
                        showConfirmButton: false,
                    })
                    setTimeout(()=>{
                        location.reload('/')
                    }, 3000)
                    
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

    
        }

  return (
    <>

        <header>
            <div className="container">
                {/* <img src={logo} className="logo"/> */}
                {/* <h3 className='title'>POSP TRAINING PORTAL</h3> */}
                <h3 className='title'>{this.state.data.company_name?this.state.data.company_name.toUpperCase():""}</h3>
            </div>
        </header>
        <section className="container-fluid bg-dark" style={{marginTop: "100px"}}>
            <div className="row">
                <div className="col-lg-6 p-0">
                    <img src={this.state.data.about_company_image?this.state.data.about_company_image : banner} className="login-banner"/>
                    
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
                                    helperText={
                                        this.state.errors.email
                                        ? this.state.errors.email
                                        : ''
                                    }
                                    error={this.state.errors.email?true:false}
                                    />
                                {/* <small className="text-danger">Error Messgae</small>   */}
                            </div>
                            <div className="input-wrapper">
                                {/* <input type="password" placeholder="Password"/> */}
                                <MaterialTextField 
                                type={"password"}    size="small" fullWidth 
                                onChange={handleChange} 
                                autoComplete='none'
                                helperText={
                                    this.state.errors.password
                                    ? this.state.errors.password
                                    : ''
                                }
                                error={this.state.errors.password?true:false}
                                    name="password" />
                            </div>
                            <div className="input-wrapper">
                                <Captcha ref={this.ref}/>
                                </div>
                            <a href="#">Forgot ID / Password ?</a>
                            <input type="submit" value="Submit" className="submitBtn" />
                        </form>
                    </div>
                </div>
            </div>


        </section>
        <footer className="footer-area footer">
            <div className="container-fluid p-0">
                <div className="row mx-0">
                    <div className="col-lg-9 ps-md-5 order-md-1 order-2">
                        {/* <p className=" pt-4 mb-1">Corporate &amp; Registered Office Address: 10th Floor, Regent Chambers,
                            Jamnalal Bajaj Road, Nariman Point, Mumbai - 400 021 India. CIN: U67120MH1992PLC066006 | ISO:
                            9001:2005: GSTIN: 27AAACP3441M2ZA | IRDA Composite License No: 175 (Valid till 08/06/2024).
                            Insurance is a subject matter of Solicitation. Sarathi is a partnership program for POS (Point
                            of Sale Person) associated with Anand Rathi Insurance Brokers Ltd. * Claim settlement process is
                            undertaken by the Insurer. Income is subject to performance and as per defined terms, conditions
                            and in adherence to the regulatory purview.</p> */}
                            <p className=" pt-4 mb-1">{this.state.data.about_company?this.state.data.about_company:""}</p>
                        <a className="text-light">Privacy Policy</a>
                    </div>


                    {/* <div className="col-lg-3 order-md-2 order-1 p-md-0 px-3 overflow-hidden ">
                        <img className="ms-md-0 ms-3 img-fluid" src={footer}/>
                        <h6 className="text-white">Anand Rathi Insurance Brokers Limited</h6>
                        <p>10th Floor Regent Chambers, Jamnalal Bajaj Marg,<br/> Nariman Point, Mumbai, Maharashtra 400021
                        </p>
                    </div> */}
                    {/* <div className="col-lg-3 order-md-2 order-1 p-md-0 px-3 overflow-hidden ">
                        <img className="mb-2 footer-img " src={footer} />
                        <h6 className="text-white">Anand Rathi Insurance Brokers Limited</h6>
                        <p>10th Floor Regent Chambers, Jamnalal Bajaj Marg,<br/> Nariman Point, Mumbai, Maharashtra 400021
                        </p>
                    </div> */}

                    <div className="col-lg-3 order-md-2 order-1 p-md-0 px-3 overflow-hidden ">
                        {Object.keys(this.state.data).length>0&&
                            Object.entries(this.state.data).map(([key,val])=>{
                            // console.log("key",key,"val1",val)
                            if(key=="website_config"){
                                
                                return Object.entries(val).map(([key1,val1])=>{
                                    // console.log("key1",key1,"val1",val1)
                                        if(key1=="site_settings"){
                                            if(val1.logo!==undefined&&val1.logo!==null){
                                                return   <img className="mb-2 footer-img " src={ val1.logo} alt={""}/>
                                            
                                                }
                                        }
                                    
                                        
                                    })
                                }
                            })
                        }
                        
                        {/* <h6 className="text-white">Anand Rathi Insurance Brokers Limited</h6>
                        <p>10th Floor Regent Chambers, Jamnalal Bajaj Marg,<br/> Nariman Point, Mumbai, Maharashtra 400021
                        </p> */}
                    </div>
                </div>
            </div>
        </footer>
    </>
  )
        }
}
