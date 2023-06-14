import React  from 'react'
import Button  from '@mui/material/Button';
import MaterialTextField from '../../../../Tags/MaterialTextField'
import { Box, Divider } from '@mui/material';
import Api from '../../../../api';
import { useParams } from 'react-router-dom';
import MaterialSelect from '../../../../Tags/MaterialSelect';
import Swal from 'sweetalert2';
import Geocode from "react-geocode";


export class AddUsers extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        btnVariant : "contained",     
        statedata:[""],
         errors:{}, 
         citydata:[""]   ,
        
      }
      this.apiCtrl = new Api;
    
     
    }

  

    
   
    
    render(){


        const getLatLng = (data) => {
            Geocode.setApiKey("AIzaSyDlOIZMAxvmuidV7IHT8daDSpm2visn_OI");

           // console.log("data==>",data)

            //  var latLng = Googlemap(data);
                
            //  console.log('Latlng==>',latLng)
              
            Geocode.fromAddress(data).then(
                (response) => {
        
                //  console.log("res==>",response)
                 const { lat, lng } = response.results[0].geometry.location;
                        // console.log("lat lan==>",lat, lng);
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

            const haldelchange =(e)=>{
                this.setState({state : e.target.value})            
                  

             this.apiCtrl.callAxios('cities/list',{search:{state_id:e.target.value}}).then(res => {
                res.data.map((value)=>{                  
                //    console.log("city==>",value)
                     this.setState(old => ({...old, citydata:{ ...old.citydata, [value.id]:value.city_name}}))                
                })      
                })     
            }


            


      const submituser= async (e) => {
        e.preventDefault();
     
        

     
      
          
        
        var data = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            password: this.state.password,
            c_password: this.state.c_password,
            role: this.props.params.any,
            address: this.state.address,
            district: this.state.district,
            city: this.state.city,
            state: this.state.state,
            pincode: this.state.pincode,
            lat:this.state.lat,
            lng:this.state.lng

        
        }



        
      
            this.apiCtrl.callAxios('users/create', data).then(response => {
              
                if(response.success == true){
                    Swal.fire({
                        title: "User",
                        text: "Created",
                        icon: "success",
                        showConfirmButton: false,
                    })
                } else {
                    Swal.fire({
                        title: "user",
                        text: "Not Created!",
                        icon: "error",
                        showConfirmButton: false,
                    })
                }


               location.reload('/user-list')
              //  console.log("Adduser===>",response);
                // sessionStorage.setItem('_token', response.data.)
                
              }).catch(function (error) {
                // console.log("Adduser===>",error);
              });
        
     
          
     
      } 

    

  // console.log("dataprps--",this.props.data.id)
   // console.log("===>",this.state)

    let user =  this.props.params.any.replace(/-/g, " "); 
      var userType = user
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
        //  console.log("===>",this.state)
  return (
    <>
      {/* <BreadCrumb breadcrumb="Users" breadcrumbItem1={'Create ' +   userType} /> */}

        <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

        <div className="row ml-1">
            <label><b>Add {  userType } Details</b></label>
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
               
                  fullWidth name='name' onChange={(e)=>this.setState({name : e.target.value})}/>
            </div>
            <div className="col-md-4 mb-4">
                <MaterialTextField value={this.state.email?this.state.email:""}   label={" Email *"} size="small" fullWidth name='email' onChange={(e)=>this.setState({email : e.target.value})}/>
            </div>
            <div className="col-md-4 mb-4">
                <MaterialTextField value={this.state.mobile?this.state.mobile:""} label={" Mobile *"} size="small" fullWidth name='mobile' onChange={(e)=>this.setState({mobile : e.target.value})}/>
            </div>
            <div className="col-md-4 mb-4">
                <MaterialTextField     value={this.state.password?this.state.password:""} type={"password"} label={" Password *"} size="small" fullWidth name='password' onChange={(e)=>this.setState({password : e.target.value})}/>
            </div>
            {/* <div className="text-danger">{this.state.errors.password}</div> */}
            <div className="col-md-4 mb-4">
                <MaterialTextField value={this.state.c_password?this.state.c_password:""} type={"password"} label="Confirm Password *" size="small" fullWidth name='c_password' onChange={(e)=>this.setState({c_password : e.target.value})}/>
            </div>
            {/* <div className="text-danger">{this.state.errors.c_password}</div> */}
            
        </div>

        <Divider sx={{ borderColor: '#dac4c4'}} />
        
        <div className="row ml-1 mb-3" style={{ paddingTop: '2%'}}>
            <label><b>Address</b></label>
        </div>
        <div className="row ">

            <div className="col-md-4 mb-4">
                <MaterialTextField value={this.state.address?this.state.address:""} label="Address *" size="small" fullWidth name='address' onChange={(e)=>{this.setState({address : e.target.value})}} onKeyUp={(e)=>getLatLng(e.target.value)}/>
            </div>
            {/* <div className="col-md-4 mb-4">
                <MaterialTextField value={this.state.city?this.state.city:""}label="City *" size="small" fullWidth name='city' onChange={(e)=>this.setState({city : e.target.value})}/>
            </div>
            <div className="col-md-4 mb-4">
                <MaterialTextField value={this.state.state?this.state.state:""} label="State *" size="small" fullWidth name='state' onChange={(e)=>this.setState({state : e.target.value})}/>
            </div> */}
            <div className='col-md-4'>        
              <MaterialSelect value={this.state.state?this.state.state:""} onMouseEnter={getstatedata}       data={this.state.statedata}  id="state_id" labelId="state" name="state" onChange={haldelchange} label="State *" fullWidth/>
            </div>

            <div className='col-md-4'>        
              <MaterialSelect   value={this.state.city?this.state.city:""}      data={this.state.citydata}  id="city_id" labelId="city-id" name="city" onChange={(e)=>this.setState({city : e.target.value})} label="City *" fullWidth/>
            </div>
            <div className="col-md-4 mb-4">
                <MaterialTextField value={this.state.pincode?this.state.pincode:""} label="Pincode *" size="small" fullWidth name='pincode' onChange={(e)=>this.setState({pincode : e.target.value})}/>
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
