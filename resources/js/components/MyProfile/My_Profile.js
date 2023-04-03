import React, { useRef } from "react";
import { Box, Divider } from '@mui/material';
import Api from "../../api";
import BreadCrumb from "../Admin/BreadCrumb/BreadCrumb";
import Button  from '@mui/material/Button';
import MaterialTextField from "../../Tags/MaterialTextField";
import MaterialButton from "../../Tags/MaterialButton";
import MaterialSelect from '../../Tags/MaterialSelect';
import Navbar from "../Navbar/Navbar";
import './myprofile.css'
import { ProfileImage } from "../Admin/Pages/ProfileImage/ProfileImage";
import Swal from "sweetalert2";
import { ConstructionOutlined } from "@mui/icons-material";
 class MyProfile extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        id:"",
        isdisabled:true,
        imageupload:"",
        errors:{}, 
        new_password:null,
        c_password:null,
        old_password:null,
        
        validation:{
         
            new_password:{required:true,min:8, type:'password'}, 
            c_password:{required:true,min:8, type:'password'},
            // old_password:{required:true,min:8, type:'password'},
            
          
        },
        isValid:false,
       
        
      }
      this.apiCtrl = new Api;
    
     
    }

    componentDidUpdate(prevProps, prevState){
        // console.log('update')
        if ((prevState.id !== this.state.id)) {
           
            this.pospprofiledata()
        } 
      }
    

    componentDidMount(){
        this.pospprofiledata()

    }

    pospprofiledata(){

        var x = localStorage.getItem("user_details");
             console.log("getlocatdata=>",x)

         let localdata=JSON.parse(x) 
        const data={
           email:localdata.email
           
        }

      //  console.log("localdata",data)



        this.apiCtrl.callAxios("users/myprofile",data).then(res=>{

            console.log("response=>",res)
            this.setState({...res.data})

        })
    }


    render(){
        const edit=()=>{
            this.setState(old=>({...old,isdisabled:false}))

        }
        const submit=(e)=>{
            e.preventDefault();

          
          
            let errors = {};
            let isValid = this.state.isValid;
            Object.entries(this.state.validation).map(([key,value])=>{
    
                
                if((typeof this.state[key] === 'undefined') || (this.state[key] === null) ||(this.state[key] === "")  ) {
                    //console.log("key=>",this.state[key])
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
    
            var count = 0;
            Object.entries(errors).map(([key, value])=>{
                if(value !== ''){
                    count += 1;
                }
            })
            
            if(count>0){
                return false;
            }


            const statedata ={
                old_password:this.state.old_password,
                new_password:this.state.new_password,
                c_password:this.state.c_password

              

                    

            }

           var data = new FormData()

           Object.entries(statedata).map(([key,value])=>{
            //   console.log("key",key,"value",value)

              data.append(`${key}`, value)
           })


            this.apiCtrl.callAxiosFile("reset-password",data).then(res=>{

                if(res.success == true){
                    this.setState(old=>({...old,isdisabled:true}))
          
                    Swal.fire({
                        title: "Passsword",
                        text: res.message,
                        icon: "success",
                        showConfirmButton: false,
                    })
                } else {
                    Swal.fire({
                        title: "Passsword",
                        text: res.message,
                        icon: "error",
                        showConfirmButton: false,
                    })
                }

            })
        }

        const handleClick =( event) => {
        //    hiddenFileInput.current.click();
        this.props.hiddenFileInput.current.click()
        //       event.target.onClick()
        //    console.log("event=>",event)
        };

        const handleChang = (e) => {
            console.log()
        //   const  image=URL.createObjectURL(e.target.files[0])
        //     Navbar(image)
           this.setState(old=>({...old,profile_image:e.target.files[0]}))

            this.setState(old=>({...old,imageupload:URL.createObjectURL(e.target.files[0])}))

            const statedata={
                address: this.state.address,
                city: this.state.city_name,
                email: this.state.email,
                id:this.state.id,
                mobile:this.state.mobile,
                name: this.state.name,
               pincode:this.state.pincode,
               profile_image: e.target.files[0],
               manager: this.state.reportingManager,
                role:this.state.role_name,
               state: this.state.state_name,
              
            }

            const data=new FormData()

            Object.entries(statedata).map(([key,val])=>{
                data.append(`${key}`,val)
            })

            this.apiCtrl.callAxiosFile(`users/edit/${statedata.id}`,data).then(res=>{

                console.log("Responseimage=>",res)
            })
            
        };

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


        const handleChange=(e)=>{
            
            validation(e.target.name, e.target.value)
            // this.setState(old=>({...old,[e.target.name]:e.target.value})) 

            let error={}
            let isValid = true;
            if(e.target.name ==="c_password"){
                if(e.target.value!==this.state.new_password){
                    error[e.target.name] = `Password and confirm password does not match`
                    isValid = false;
                }
                //  else{
                //     this.setState(old=>({...old,[e.target.name]:e.target.value})) 

                // }
                if(isValid == true) {
                        
                    error.c_password = '';
                }

                
            }
            this.setState(old=>({...old,errors:{ ...old.errors, ...error}})) 

        }


     
        return(<>
        
            

            <Box  sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%', marginTop:"8%" }} >

               

                <div className="row">

                    <div className="col-lg-6 img_fold" >


                        <div className="profile-image d-flex justify-content-center">
                            <div className="profile-img pt-4 ">
                                {/* <img width="100" height="100" src={"https://www.w3schools.com/howto/img_avatar.png"} /> */}
                                {/* <img src={this.state.imageupload?this.state.imageupload:"https://www.w3schools.com/howto/img_avatar.png"}/> */}
                                <ProfileImage image={(this.state.imageupload !== "")? this.state.imageupload : this.state.profile_image} />
                                <button id="maticon" className="img_edit" onClick={handleClick}>           
                                <i className="fa fa-fw fa-edit"> <input type="file"  accept="image/png, image/gif, image/jpeg" hidden ref={ this.props.hiddenFileInput} onChange={handleChang}/></i>
                                </button>
                                
                            </div>
                        </div>

                        <div className="">
                        <div className="d-flex mr-auto justify-content-center pt-4 text-uppercase">
                            <h6>{this.state.name?this.state.name:""}</h6>
                        </div>
                        <div className="d-flex mr-auto justify-content-center profile_profe">
                            <p>{this.state.role_name}</p>
                        </div>
                       
                        </div>
                    </div>


                    <div className="col-md-6">
                        <div className="row ml-1 mb-3" style={{ paddingTop: '2%'}}>
                            <label><b> User Details</b></label>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label for="exampleInputEmail1" className="form-label">Name</label>
                                <input value={this.state.name?this.state.name:""} name="name" disabled={true} onChange={(e)=>this.setState({name : e.target.value})} type="textx" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            
                            </div>
                            <div className="col-md-6 mb-3">
                                <label for="exampleInputPassword1" className="form-label">Email</label>
                                <input value={this.state.email?this.state.email:""} name="email"disabled={true} onChange={(e)=>this.setState({email : e.target.value})}  type="email" className="form-control" id="exampleInputPassword1"/>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label for="exampleInputPassword1" className="form-label">Phone Number</label>
                                <input value={this.state.mobile?this.state.mobile:""} name="number" disabled={true} onChange={(e)=>this.setState({mobile : e.target.value})} type="number" className="form-control" id="exampleInputPassword1"/>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label for="exampleInputPassword1" class="form-label">Role Name</label>
                                <input value={this.state.role_name?this.state.role_name:""}  disabled={true}   class="form-control" id="exampleInputPassword1"/>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label for="exampleInputPassword1" class="form-label">Reporting Manager</label>
                                <input value={this.state.reportingManager?this.state.reportingManager:""}  disabled={true}   class="form-control" id="exampleInputPassword1"/>
                            </div>
                            {/* <div class="col-md-6 mb-3">
                                <label for="exampleInputPassword1" class="form-label">Address</label>
                                <input value={this.state.address?this.state.address:""} name="address" disabled={this.state.isdisabled} onChange={(e)=>this.setState({address : e.target.value})} type="text" class="form-control" id="exampleInputPassword1"/>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="exampleInputPassword1" class="form-label">State</label>
                                <input value={this.state.state_name?this.state.state_name:""} name="state_name" disabled={this.state.isdisabled} onChange={(e)=>this.setState({state_name : e.target.value})} type="text" class="form-control" id="exampleInputPassword1"/>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="exampleInputPassword1" class="form-label">City</label>
                                <input value={this.state.city_name?this.state.city_name:""} name="city_name" disabled={this.state.isdisabled} onChange={(e)=>this.setState({city_name : e.target.value})} type="text" class="form-control" id="exampleInputPassword1"/>
                            </div>                     
                            <div class="col-md-6 mb-3">
                                <label for="exampleInputPassword1" class="form-label">Pincode</label>
                                <input value={this.state.pincode?this.state.pincode:""} name="pincode" disabled={this.state.isdisabled} onChange={(e)=>this.setState({pincode : e.target.value})} type="number" class="form-control" id="exampleInputPassword1"/>
                            </div> */}

                            <div className="col-md-6 mb-3 mt-4">
                                <button type="submit" class="btn btn-success mb-2 mt-2" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">Reset Passsword</button>
                            </div>     

                        </div>

                        
                      
                        
                       
                       
                        

                        <div className="row  collapse" id="collapseExample">

                            <div className="col-md-12 mb-3">
                                <label for="exampleInputEmail1" className="form-label">Old Password</label>
                                <input  name="old_password"  onChange={handleChange} type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                {/* <label> <span style={{color: 'red',}} >{this.state.errors.old_password?this.state.errors.old_password:""}</span></label>
                          */}
                              
                            
                            </div>
                            <div className="col-md-12 mb-1">
                                <label for="exampleInputEmail1" className="form-label">New password</label>
                                <input  name="new_password"  onChange={handleChange}type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                <label> <span style={{color: 'red',}} >{this.state.errors.new_password?this.state.errors.new_password:""}</span></label>
                         
                            </div>
                            <div className="col-md-12">
                                <label for="exampleInputEmail1" className="form-label">Confirm password</label>
                                <input  name="c_password"  onChange={handleChange} type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                <label> <span style={{color: 'red',}} >{this.state.errors.c_password?this.state.errors.c_password:""}</span></label>
                         </div>
                         <div className="col-md-12 mb-3">
                            <button type="submit" class="btn btn-primary mt-2" onClick={submit}>Submit</button>
                            </div>


                       

                          
                        </div>
                    
                       
                    
                       
                        
                       

                    </div>


                    {/* <div className="col-md-6">

                    <div className="row ">

                        <div className="col-md-4 mb-4">
                            <MaterialTextField label={" Name *"} value={this.state.name?this.state.name:""} size="small"fullWidth name='name' />
                        </div>
                        <div className="col-md-4 mb-4">
                            <MaterialTextField    label={" Email *"} value={this.state.email?this.state.email:""} size="small" fullWidth name='email' />
                        </div>
                        <div className="col-md-4 mb-4">
                            <MaterialTextField  label={" Mobile *"} value={this.state.mobile?this.state.mobile:""} size="small" fullWidth name='mobile' />
                        </div>


                        <div className="col-md-4 mb-4">
                            <MaterialTextField  label="Address *" size="small" fullWidth name='address' />
                        </div>

                        <div className='col-md-4'>        
                        <MaterialSelect       data={""}  id="state_id" labelId="state" name="state"  label="State *" fullWidth/>
                        </div>

                        <div className='col-md-4'>        
                        <MaterialSelect         data={""}  id="city_id" labelId="city-id" name="city"  label="City *" fullWidth/>
                        </div>
                        <div className="col-md-4 mb-4">
                            <MaterialTextField  label="Pincode *" size="small" fullWidth name='pincode'/>
                        </div>

                        <div className="col-md-3">
                            <Button style={{ backgroundColor: '#1F5B54',color:"#fff"}} >Submit</Button>
                        </div>
                    </div>

                    </div> */}

                </div>

              
                
            </Box>
        </>)
    }
}



export default (props) => {
    return <MyProfile {...props}   hiddenFileInput={useRef(null)}/>
    
  }