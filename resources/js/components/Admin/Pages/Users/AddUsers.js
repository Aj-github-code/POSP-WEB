import React  from 'react'
import Button  from '@mui/material/Button';
import MaterialTextField from '../../../../Tags/MaterialTextField'
import { Box, Divider } from '@mui/material';
import Api from '../../../../api';
import { useParams } from 'react-router-dom';
import MaterialSelect from '../../../../Tags/MaterialSelect';
import Swal from 'sweetalert2';
import Geocode from "react-geocode";
import { set } from 'lodash';
import { SearchableInputTextfield } from '../../../../Tags/SearchableInputField';
import { object } from 'prop-types';


export class AddUsers extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        btnVariant : "contained",     
        statedata:[""],
         errors:{}, 
         citydata:[""]   ,
         admindata:[""],
         categoryData:[""],

         name: null,
         email: null,
         mobile: null,
         password: null,
         c_password: null,
         address: null,
        //  district: null,
        //  role:null,
         city: null,
         state: null,
         pincode: null,
        
  
         validation:{
            name:{required:true,min:4, type:'alpha'}, 
            mobile:{required:true, min:10, max:10, type:'numeric'}, 
            email:{required:true,min:6, type:'email'}, 
            // insured_nominee_name:{required:true,min:4, type:'alpha'}, 
            password:{required:true,min:6, type:'AlphaNumeric'}, 
            c_password:{required:true, type:'AlphaNumeric'}, 
            // district:{required:true, type:'AlphaNumeric'}, 
            address:{required:true, type:'AlphaNumeric'}, 
            // role:{required:true},
            state:{required:true}, 
            city:{required:true},
            pincode:{required:true, min:6, max:6, type:'Numeric'} 
        },
        isValid:false,
        
      }
      this.apiCtrl = new Api;
    
     
    }


   
    
    
   
    
    render(){

        // const categoryData={
        //     "life":"Life",
        //     "general":"General",
        //     "composite":"Composite"
        // }

        let user =  this.props.params.any.replace(/-/g, " "); 
        var userType = user
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');


        const getLatLng = (data) => {
            Geocode.setApiKey("AIzaSyDlOIZMAxvmuidV7IHT8daDSpm2visn_OI");

           // console.log("data==>",data)

            //  var latLng = Googlemap(data);
                
            //  console.log('Latlng==>',latLng)
              
            Geocode.fromAddress(data).then(
                (response) => {
        
                //  console.log("res==>",response)
                 const { lat, lng } = response.results[0].geometry.location;
                        console.log("lat lan==>",lat, lng);
                        this.setState(old => ({...old,lat:lat,lng:lng})) 
                        
                },
                (error) => {
                  console.error(error);
                }
              );


            // if(data.res==="ok"){
            //      this.setState(old => ({...old, latitude:{...old.latitude,latitude:data.lat,longitude:data.lan}})) 
        
            // }
            // this.setState(old => ({...old, latitude:{...old.latitude,latitude:data.lat,longitude:data.lan}})) 
        
//console.log("===>",this.state)
           

            
          }



        const getstatedata = () => {
            this.apiCtrl.callAxios('states/list',{search:{country_id:1}}).then(res => {

                res.data.map((value)=>{                  
                    //console.log("STATE==>",value)
                     this.setState(old => ({...old, statedata:{ ...old.statedata, [value.id]:value.state_name}}))                
                })      
            })
        }

        // const haldelchange =(e)=>{
        //     this.setState({state : e.target.value})            
                

        //     this.apiCtrl.callAxios('cities/list',{search:{state_id:e.target.value}}).then(res => {
        //     res.data.map((value)=>{                  
        //     //    console.log("city==>",value)
        //             this.setState(old => ({...old, citydata:{ ...old.citydata, [value.id]:value.city_name}}))                
        //     })      
        //     })     
        // }

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
                            if(name=="Mobile"){
                                error[fieldName] = `${name} must be more than ${value} Number`
                                isValid = false;
                            }else{
                                error[fieldName] = `${name} must be more than ${value} characters`
                                isValid = false;
                            }
                         
                        }
                    } else if(key === 'max'){
                        if(fieldValue.length > value){
                            if(name=="Mobile"){
                                error[fieldName] = `${name} must be more than ${value} Number`
                                isValid = false;
                            }else{
                                error[fieldName] = `${name} must be more than ${value} characters`
                                isValid = false;
                            }
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
            console.log(e.target.value)
            let error={}
            let isValid = true;
            if(e.target.name ==="c_password"){
                if(e.target.value!==this.state.password){
                    error[e.target.name] = `Password and confirm password does not match`
                    isValid = false;
                }
                if(isValid == true) {
                        
                    error.c_password = '';
                }

                
            }
            this.setState(old=>({...old,errors:{ ...old.errors, ...error}})) 

            if(e.target.name=="state"){
                this.apiCtrl.callAxios('cities/list',{search:{state_id:e.target.value}}).then(res => {
                    res.data.map((value)=>{                  
                    //    console.log("city==>",value)
                            this.setState(old => ({...old, citydata:{ ...old.citydata, [value.id]:value.city_name}}))                
                    })      
                    })
            }
          
        }


      const submituser= async (e) => {
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
     
        

     
      
          
        
        var data = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            password: this.state.password,
            c_password: this.state.c_password,
            role: this.props.params.any,
            address: this.state.address,
            // district: this.state.district,
            city: this.state.city,
            state: this.state.state,
            pincode: this.state.pincode,
            lat:this.state.lat,
            lng:this.state.lng
        
        }

         if(userType=="Posp"){
            data.reportingManager = this.state.reportingManager;
            data.category=this.state.category;
         }else{
            data.tag = this.state.tag;
         }



        
      
            this.apiCtrl.callAxios('users/create', data).then(response => {
              
                if(response.success == true){
                    Swal.fire({
                        title: "User",
                        text: response.message,
                        icon: "success",
                        showConfirmButton: false,
                    })
                } else {
                    Swal.fire({
                        title: "user",
                        text: response.message,
                        icon: "error",
                        showConfirmButton: false,
                    })
                }


              // location.reload('/user-list')
              //  console.log("Adduser===>",response);
                // sessionStorage.setItem('_token', response.data.)
                
              }).catch(function (error) {
                console.log("Adduser===>",error);
              });
        
     
          
     
      } 

      const adminlist=()=>{

        if(this.state.admindata.length>0){
            this.apiCtrl.callAxios('users/list',{role_name:"admin"}).then(res => {

                console.log("admin res=>",res)

                res.data.aaData.map((value)=>{                  
                    //console.log("STATE==>",value)
                    this.setState(old => ({...old, admindata:{ ...old.admindata, [value.id]:value.name}}))                
                })      
            })
        }



      }

        const handletag=(e)=>{
            
            this.setState(old=>({...old, tag:e.target.value}))
            
        }
        const category =()=>{


            
            if(this.state.categoryData.length>0){
                this.apiCtrl.callAxios("product/product-category-list").then(res=>{
                    console.log("category",res)

                    Object.entries(res.data).map(([key,value])=>{
                        // console.log("value=>",value)

                    this.setState(old=>({...old,categoryData:{...old.categoryData,[value.id]:value.category_name}}))
                    })
                })

            }
            
        }

    


   

  
        //console.log("===>",userType)
  return (
    <>
      {/* <BreadCrumb breadcrumb="Users" breadcrumbItem1={'Create ' +   userType} /> */}

        <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

        <div className="row ml-1">
            <label><b>Add  Details</b></label>
        </div>

        {/* <Button style={{ backgroundColor: '#183883'}} onClick={ getdatabyid }>getdatabyid</Button> */}

        <Divider sx={{ borderColor: '#dac4c4'}} />
        
        <div className="row ml-1 mb-3" style={{ paddingTop: '2%'}}>
            <label><b>Personal Information</b></label>
        </div>
        <div className="row ">

            <div className="col-md-4 mb-4">
                <MaterialTextField 
                value={this.state.name?this.state.name:""}
                 label={" Name *"} 
                 size="small"
               
                  fullWidth name='name' onChange={(e)=>{handleChange(e)}} 
                  helperText={
                    this.state.errors.name
                    ? this.state.errors.name
                    : ''
                   }
                   error={this.state.errors.name?true:false}
                  />
            </div>
            <div className="col-md-4 mb-4">
                <MaterialTextField value={this.state.email?this.state.email:""}   label={" Email *"} size="small" fullWidth name='email' onChange={(e)=>{handleChange(e)}}
                 helperText={
                    this.state.errors.email
                    ? this.state.errors.email
                    : ''
                   }
                   error={this.state.errors.email?true:false}
                 />
            </div>
            <div className="col-md-4 mb-4">
                <MaterialTextField type={'number'} value={this.state.mobile?this.state.mobile:""} label={" Mobile *"} size="small" fullWidth name='mobile' onChange={(e)=>{handleChange(e)}} 
                 helperText={
                    this.state.errors.mobile
                    ? this.state.errors.mobile
                    : ''
                   }
                   error={this.state.errors.mobile?true:false}
                />
            </div>
           
            <div className="col-md-4 mb-4">
                <MaterialTextField     value={this.state.password?this.state.password:""} type={"password"} label={" Password *"} size="small" fullWidth name='password' onChange={(e)=>{handleChange(e)}} 
                 helperText={
                    this.state.errors.password
                    ? this.state.errors.password
                    : ''
                   }
                   error={this.state.errors.password?true:false}
                />
            </div>
            {/* <div className="text-danger">{this.state.errors.password}</div> */}
            <div className="col-md-4 mb-4">
                <MaterialTextField value={this.state.c_password?this.state.c_password:""} type={"password"} label="Confirm Password *" size="small" fullWidth name='c_password' onChange={(e)=>{handleChange(e)}}
                 helperText={
                    this.state.errors.c_password
                    ? this.state.errors.c_password
                    : ''
                   }
                   error={this.state.errors.c_password?true:false}
                 />
            </div>
            {/* <div className="text-danger">{this.state.errors.c_password}</div> */}

            {userType!=="Posp"?
                <>


                    <div className="col-md-4  mb-4">
                        <SearchableInputTextfield
                        placeholder="Search" label={"Source"} size={"small"} name={"search"} value={this.state.tag&&this.state.tag} 
                        onChange={handletag}
                        fullWidth

                        />

                    </div>

                </>:
                <>

                    <div className='col-md-4 mb-4'>       
                        <MaterialSelect value={this.state.reportingManager} onMouseEnter={adminlist} 
                          size={"small"}   
                            data={this.state.admindata}  id="state_id" labelId="state" name="reportingManager" onChange={(e)=>{handleChange(e)}}  label="Reporting Manager" fullWidth
                        
                        />
                
                    </div>



                </>
            }
            {userType=="Posp"?<>

                <div className='col-md-4 mb-4'>
            
                    <MaterialSelect value={this.state.category?this.state.category:""} 
                            size={"small"}     
                    data={this.state.categoryData}  id="state_id" labelId="state" name="category" onChange={(e)=>{handleChange(e)}} onMouseEnter={category} label="Category" fullWidth
                    
                    />
                </div>
                </>:""
            }

            
            
        </div>

        <Divider sx={{ borderColor: '#dac4c4'}} />
        
        <div className="row ml-1 mb-3" style={{ paddingTop: '2%'}}>
            <label><b>Address</b></label>
        </div>
        <div className="row ">

            <div className="col-md-4 mb-4">
                <MaterialTextField value={this.state.address?this.state.address:""} label="Address *" size="small" fullWidth name='address' onChange={(e)=>{handleChange(e)}}  onKeyUp={(e)=>getLatLng(e.target.value)}
                 helperText={
                    this.state.errors.address
                    ? this.state.errors.address
                    : ''
                   }
                   error={this.state.errors.address?true:false}
                />
            </div>
            {/* <div className="col-md-4 mb-4">
                <MaterialTextField value={this.state.city?this.state.city:""}label="City *" size="small" fullWidth name='city' onChange={(e)=>this.setState({city : e.target.value})}/>
            </div>
            <div className="col-md-4 mb-4">
                <MaterialTextField value={this.state.state?this.state.state:""} label="State *" size="small" fullWidth name='state' onChange={(e)=>this.setState({state : e.target.value})}/>
            </div> */}
            <div className='col-md-4'>        
              <MaterialSelect value={this.state.state?this.state.state:""} onMouseEnter={getstatedata}      size={"small"}       data={this.state.statedata}  id="state_id" labelId="state" name="state" onChange={(e)=>{handleChange(e)}}  label="State *" fullWidth
               helperText={
                this.state.errors.state
                ? this.state.errors.state
                : ''
               }
               error={this.state.errors.state?true:false}
              />
            </div>

            <div className='col-md-4'>        
              <MaterialSelect   value={this.state.city?this.state.city:""}    size={"small"}        data={this.state.citydata}  id="city_id" labelId="city-id" name="city" onChange={(e)=>{handleChange(e)}}  label="City *" fullWidth
               helperText={
                this.state.errors.city
                ? this.state.errors.city
                : ''
               }
               error={this.state.errors.city?true:false}
              />
            </div>
            <div className="col-md-4 mb-4">
                <MaterialTextField value={this.state.pincode?this.state.pincode:""} label="Pincode *" size="small" fullWidth name='pincode' onChange={(e)=>{handleChange(e)}} 
                 helperText={
                    this.state.errors.pincode
                    ? this.state.errors.pincode
                    : ''
                   }
                   error={this.state.errors.pincode?true:false}
                />
            </div>
            
        </div>

        <div className='row'>
            <div className="col-md-3">
                <Button style={{ backgroundColor: '#1F5B54',color:"#fff"}} onClick={ submituser }>Submit</Button>
            </div>
        </div>


        {/* <Googlemap data={ this.state.address} func={handleLatLng} /> */}
        {/* <Googlemap data={ this.state.address} func={handleLatLng} /> */}
        </Box>
    </>
  )
}
}

export default (props) => {
    return <AddUsers {...props}   params={useParams()}/>
  }
