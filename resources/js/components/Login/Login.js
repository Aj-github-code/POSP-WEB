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



export default class Login extends React.Component {

    constructor(props){
        super(props);
        this.apiCtrl = new Api;

        this.state = {
            errors:{}, 
            email :null,
            password :null,
           
            validation:{
                email:{required:true,min:5, type:'email'}, 
                password:{required:true,min:5, type:'AlphaNumeric'}, 
                
            },
            isValid:false,
         
        }
    }

    render(){

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
            // console.log("erorr=>",error)
            // var count = 0;
            // Object.entries(error).map(([key, value])=>{
            //     console.log("value=>",value)
            //     if(value !== ''){
            //         count++;
            //     }
            // })
            //  console.log("countinner=>",count)
            
            // if(count>0){
    
            //     return false;
            // }
    
            if(isMax >= fieldValue.length){
                this.setState(old => ({...old,[fieldName]: fieldValue }) )                
            }
        }


        const handleChange = (e) => {

            validation(e.target.name, e.target.value)
          
            
          
        }

        



    const submituser= async (e) => {
        e.preventDefault();
        // var data = new FormData();

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
                errors[key] = '';
                isValid = true;
            }
            this.setState(old=>({
                ...old,
                errors:errors
            })) 
        })


        // Object.entries(this.state).map(([key1,value1])=>{

        //     if(typeof this.state.validation[key1] !== "undefined"){
        //         Object.entries(this.state.validation[key1]).map(([key,value])=>{
            
        //             let temp =  key.replace(/_/g, " "); 
        //             var name = temp
        //             .toLowerCase()
        //             .split(' ')
        //             .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        //             .join(' ');
            
        //             if(key === 'required'){
        //                 if((value1.length < 0) || (value1 === '') || (value1 === null)){
        //                     error[key1] = `${name} Field is required`
        //                     isValid = false;
        //                 } 
        //             } else if(key === 'min'){
        //                 if(value1.length < value){
        //                     error[key1] = `${name} must be more than ${value} characters`
        //                     isValid = false;
        //                 }
        //             } else if(key === 'max'){
        //                 if(value1.length > value){
        //                     error[key1] = `${name} must be less than ${value} characters`
        //                     isMax = value;
        //                     isValid = false;
        //                 }
        //             } else if(key === 'type'){
        //                 if(value === 'alpha'){
        //                     if(value1.match(/^[A-Za-z\s]*$/)){
        //                         error[key1] = `${name} must be String characters`
        //                         isValid = false;
        //                     }
        //                 } else if(value === 'AlphaNumeric'){
        //                     if(value1.match(/^[A-Za-z0-9,-.\s]*$/)){
        //                         error[key1] = `${name} must be String Alpha Numeric`
        //                         isValid = false;
        //                     }
        //                 } else if(value === 'Numeric'){
        //                     if(value1.match(/^[0-9]*$/)){
        //                         error[key1] = `${name} must be String Numeric`
        //                         isValid = false;
        //                     }
        //                 } else if(value === 'email'){
        //                     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        //                     if(value1.match(reg) ){
        //                         error[key1] = `${name} must be in Email format`
        //                         isValid = false;
        //                     }
        //                 } 
                        
        //             }
        //             if(isValid == true) {
                        
        //                 error[key1] = '';
        //             }
        //         })
        //         this.setState(old=>({...old,errors:{ ...old.errors, ...error}})) 
        //     }

        // })
           
    

        var count = 0;
        
        Object.entries(this.state.errors).map(([key, value])=>{
            if(value !== ''){
                count =  count + 1;
                isValid = false;
            }
        })
        // Object.entries(this.state.error).map(([key, value])=>{
        //     if(value !== ''){
        //         count += 1;
        //     }
        // })
        // console.log("errorout=>",error)
        console.log("state=>",this.state)
        
        console.log("count=>",count)
        if(!isValid){
            console.log('false')
            return false;
        
        } else {
            const data={
                email:this.state.email,
                password:this.state.password
            }
    
        this.apiCtrl.callAxios('login', data, false).then(response => {
    
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

     

        }

        

    
   




    // const handleChange = (e) => {

    //     console.log('name'+e.target.name, 'value '+this.state.validation[e.target.name])
    //     let error={}
    //     let isValid = this.state.isValid;
       
    //     if(typeof this.state.validation[e.target.name] !== "undefined"){

    //         Object.entries(this.state.validation[e.target.name]).map(([key,value])=>{
         
    //             let temp =  e.target.name.replace(/-/g, " "); 
    //             var fieldName = temp
    //             .toLowerCase()
    //             .split(' ')
    //             .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    //             .join(' ');
    //             if(key === 'required'){
    //                 if(e.target.value.length < 0){
    //                     error[e.target.name] = `${fieldName} Field is required`
    //                     // this.setState(old=>({...old,errors:error})) 
    //                     isValid = false;
    //                 } 
    //             } else if(key === 'min'){
    //                 if(e.target.value.length < value){
    //                       error[e.target.name] = `${fieldName} must be more than ${value} characters`
    //                     // error[e.target.name] = `${fieldName} must be less than ${value} characters`
    //                     // this.setState(old=>({...old,errors:error})) 
    //                     isValid = false;
    //                 }
    //             } else if(key === 'max'){
    //                 if(e.target.value.length > value){
    //                     // error[e.target.name] = `${fieldName} must be more than ${value} characters`
    //                     error[e.target.name] = `${fieldName} must be less than ${value} characters`
    //                     isValid = false;
    //                     // this.setState(old=>({...old,errors:error})) 
    //                 }
    //             } else if(key === 'type'){
    //                 if(value === 'alpha'){
    //                     if(!e.target.value.match(/^[A-Za-z\s]*$/)){
    //                         // this.setState(old=>({...old,errors:error})) 
    //                         error[e.target.name] = `${fieldName} must be String characters`
    //                         isValid = false;
    //                     }
    //                 } else if(value === 'AlphaNumeric'){
    //                     if(!e.target.value.match(/^[A-Za-z0-9]*$/)){
    //                         error[e.target.name] = `${fieldName} must be String Alpha Numeric`
    //                         // this.setState(old=>({...old,errors:error})) 
    //                         isValid = false;
    //                     }
    //                 } else if(value === 'Numeric'){
    //                     if(!e.target.value.match(/^[0-9]*$/)){
    //                         error[e.target.name] = `${fieldName} `
    //                         // this.setState(old=>({...old,errors:error})) 
    //                         isValid = false;
    //                     }
    //                 } else if(value === 'email'){
    //                     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    //                     if(reg.test(e.target.value) === false){
    //                         error[e.target.name] = `${fieldName} Is Invalid `
    //                         // this.setState(old=>({...old,errors:error})) 
    //                         isValid = false;
    //                     }
    //                 }
                       
    //             } else {
    //                 isValid = true;
    //                 error[e.target.name] = '';
    //             }

    //           //console.log("val",value, key+"  key")
    //         })
    //     }

           
                
    //             // this.setState({isValid : isValid});
    //             this.setState(old => ({...old,[e.target.name]: e.target.value  }))
    //             this.setState(old=>({...old,errors:error})) 
            


      


    // }

    // var msg = Object.entries(this.state.errors);
  
    // var str={};
   
     
    //      msg.map(([key, msg])=>{
        
    //       if(msg !== ""){

    //           str[key] = msg;
           
    //       } else {
    //         str[key] = "";
    //       }
    //      })

  return (
    <>

<header>
        <div className="container">
            {/* <img src={logo} className="logo"/> */}
            <h3 className='title'>POSP TRAINING PORTAL</h3>
        </div>
    </header>
    <section className="container-fluid bg-dark" style={{marginTop: "80px"}}>
        <div className="row">
            <div className="col-lg-6 p-0">
                <img src={banner} className="img-fluid banner-img"/>
                
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
                               autocomplete={false}
                               helperText={
                                this.state.errors.password
                                ? this.state.errors.password
                                : ''
                               }
                               error={this.state.errors.password?true:false}
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


                {/* <div className="col-lg-3 order-md-2 order-1 p-md-0 px-3 overflow-hidden ">
                    <img className="ms-md-0 ms-3 img-fluid" src={footer}/>
                    <h6 className="text-white">Anand Rathi Insurance Brokers Limited</h6>
                    <p>10th Floor Regent Chambers, Jamnalal Bajaj Marg,<br/> Nariman Point, Mumbai, Maharashtra 400021
                    </p>
                </div> */}
                  <div className="col-lg-3 order-md-2 order-1 p-md-0 px-3 overflow-hidden ">
                    <img className="mb-2 footer-img " src={footer} />
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
