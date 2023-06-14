import React, {useState, useEffect} from 'react'
import Button  from '@mui/material/Button';
import MaterialTextField from '../../../../Tags/MaterialTextField'
import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import Api from '../../../../api';
import RolesList from './RolesList'

export default class AddRoles extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        btnVariant : "contained",
        id:this.props.data.id?this.props.data.id:"",
        role_name : null,
        role_code : null,
        slug : null
      }
      this.apiCtrl = new Api;
      
    }
    

    componentDidUpdate(prevProps,prevState){

      // console.log("prevProps-->",prevProps)
      // console.log("prevState-->",prevState)

      if (prevProps.data.id !== this.props.data.id)  {
     
      

        this.setState(this.props.data)
         

      
      }
  }
   
    render(){

     
    const submituser= async (e) => {
        e.preventDefault();
     
        // return;
          
        
        var data = {
            role_name: this.state.role_name,
            role_code: this.state.role_code,
            slug: this.state.slug,
        
        }


        if(this.props.data.id){
          this.apiCtrl.callAxios(`/${this.props.data.id}`, data).then(response => {

              if(response.success == true){
                  Swal.fire({
                      title: "Role",
                      text: "Updated",
                      icon: "success",
                      showConfirmButton: false,
                  })
              } else {
                  Swal.fire({
                      title: "Role",
                      text: "Not Updated!",
                      icon: "error",
                      showConfirmButton: false,
                  })
              }
             // location.reload('/user-list')
              // console.log("Updateuser===>",response);
              // sessionStorage.setItem('_token', response.data.)
              
            }).catch(function (error) {
              // console.log("Updateuser===>",error);
            });
      }else{
        this.apiCtrl.callAxios('users/roles', data).then(response => {
              if(response.success == true){
                  Swal.fire({
                      title: "Role",
                      text: "Created",
                      icon: "success",
                      showConfirmButton: false,
                  })
              } else {
                  Swal.fire({
                      title: "Role",
                      text: "Not Created!",
                      icon: "error",
                      showConfirmButton: false,
                  })
              }


              location.reload('/')
              // console.log("Addrole===>",response);
              // sessionStorage.setItem('_token', response.data.)
              
            }).catch(function (error) {
              // console.log("Addrole===>",error);
            });
      }
  
          // this.apiCtrl.callAxios('users/roles', data).then(response => {
           
          //   console.log(response);
          //   // sessionStorage.setItem('_token', response.data.)
            
          // }).catch(function (error) {
          //   console.log(error);
          // });

          
     
      } 

      // console.log("this State--",this.state)
  return (
    <>
      {/* <BreadCrumb breadcrumb="Roles" breadcrumbItem1='Create' /> */}

        <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

        <div className="row ml-1">
            <label><b>Add Role</b></label>
        </div>

        <Divider sx={{ borderColor: '#dac4c4'}} />
        
        <div className="row ml-1" style={{ paddingTop: '2%'}}>
            <label><b>Role Details</b></label>
        </div>
        <div className="row ">

            <div className="col-md-12 mb-4">
                <MaterialTextField  value={this.state.role_name?this.state.role_name:""}label="Role Name *" size="small" fullWidth name='role_name' onChange={(e)=>this.setState({role_name : e.target.value})}/>
            </div>
            
        </div>

        <div className='row'>
        <div className="col-md-12 mb-4">
                <MaterialTextField   value={this.state.role_code?this.state.role_code:""} label="Role Code *" size="small" fullWidth name='role_code' onChange={(e)=>this.setState({role_code : e.target.value})}/>
            </div>

        </div>


        <div className='row'>
            <div className="col-md-3">
                <Button style={{ backgroundColor: '#183883', color:"#fff"}} onClick={ submituser }>Submit</Button>
            </div>
        </div>
    
        {/* <button type="button" data-bs-toggle="modal"   className="bttn "href="#exampleModalToggle" >click</button> */}

      



      

    </Box>
    </>
  )
}
}



