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
        imageupload:""
       
        
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
        const data={
            id:"3"
        }

        this.apiCtrl.callAxios("users/myprofile",data).then(res=>{

            console.log("response=>",res)
            this.setState({...res.data})

        })
    }


    render(){
        const edit=()=>{
            this.setState(old=>({...old,isdisabled:false}))

        }
        const submit=()=>{
            this.setState(old=>({...old,isdisabled:true}))


            const statedata ={
                id:this.state.id,
                name:this.state.name,
                email:this.state.email,
                mobile:this.state.mobile,
                profile_image:this.state.profile_image,
               // reportingManager:this.state.reportingManager,
                role:this.state.role_name,
                // slug:this.state.slug,
              

                    

            }

           var data = new FormData()

           Object.entries(statedata).map(([key,value])=>{
            //   console.log("key",key,"value",value)

              data.append(`${key}`, value)
           })


            this.apiCtrl.callAxiosFile("users/edit",data).then(res=>{

                if(res.success == true){
                    Swal.fire({
                        title: "User",
                        text: res.message,
                        icon: "success",
                        showConfirmButton: false,
                    })
                } else {
                    Swal.fire({
                        title: "User",
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
        const handleChange = (e) => {
            console.log()
        //   const  image=URL.createObjectURL(e.target.files[0])
        //     Navbar(image)
           this.setState(old=>({...old,profile_image:e.target.files[0]}))

            this.setState(old=>({...old,imageupload:URL.createObjectURL(e.target.files[0])}))
        };


     
        return(<>
        
            

            <Box  sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%', marginTop:"8%" }} >

               

                <div className="row">

                    <div className="col-lg-6 img_fold" >


                        <div className="profile-image d-flex justify-content-center">
                            <div className="profile-img pt-4 ">
                                {/* <img width="100" height="100" src={"https://www.w3schools.com/howto/img_avatar.png"} /> */}
                                {/* <img src={this.state.imageupload?this.state.imageupload:"https://www.w3schools.com/howto/img_avatar.png"}/> */}
                                <ProfileImage image={this.state.imageupload} />
                                <button id="maticon" className="img_edit" onClick={handleClick}>           
                                <i className="fa fa-fw fa-edit"> <input type="file"  accept="image/png, image/gif, image/jpeg" hidden ref={ this.props.hiddenFileInput} onChange={handleChange}/></i>
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

                        <div className="row">

                        <div className="col-md-6 mb-3">
                            <label for="exampleInputEmail1" className="form-label">Name</label>
                            <input value={this.state.name?this.state.name:""} name="name" disabled={this.state.isdisabled} onChange={(e)=>this.setState({name : e.target.value})} type="textx" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                          
                        </div>
                        <div className="col-md-6 mb-3">
                            <label for="exampleInputPassword1" className="form-label">Email</label>
                            <input value={this.state.email?this.state.email:""} name="email"disabled={this.state.isdisabled} onChange={(e)=>this.setState({email : e.target.value})}  type="email" className="form-control" id="exampleInputPassword1"/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label for="exampleInputPassword1" className="form-label">Phone Number</label>
                            <input value={this.state.mobile?this.state.mobile:""} name="number" disabled={this.state.isdisabled} onChange={(e)=>this.setState({mobile : e.target.value})} type="number" className="form-control" id="exampleInputPassword1"/>
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
                                    

                        </div>

                        {this.state.isdisabled?<>
                        <button type="submit" class="btn btn-success" onClick={edit}>Edit</button>
                       </>:<button type="submit" class="btn btn-primary" onClick={submit}>Submit</button>
                       }
                    
                       
                        
                       

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