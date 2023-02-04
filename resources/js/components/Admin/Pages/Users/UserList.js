import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box,Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AddUsers from './AddUsers';
import MaterialTextField from '../../../../Tags/MaterialTextField'
import { TextField } from '@mui/material';
import Api from '../../../../api';
import { Link } from "react-router-dom";


import Swal from 'sweetalert2';
import MaterialSelect from '../../../../Tags/MaterialSelect';

export  class UserList extends React.Component {
  constructor(props){
    super(props)
  

    this.state = {
      data : [],
      isLoading: false,
      page: 0,
      pageSize: 10,  
      paramsdata:[],
      userData:[],
      statedata:[],
      citydata:[""]   ,
      
  }
  this.apiCtrl = new Api;
  //console.log("===>",data)
  }

  componentWillMount = () => {
    this.getUserList();
    
  }

//  componentDidUpdate = (prevProps, prevState) =>{
//   if(prevProps.params.any !== this.props.params.any){
//     this.getUserList();
//   }
//   if (prevState.page !== this.state.page) {
//     this.getUserList();
//   }
//  }

 componentDidUpdate(prevProps, prevState){
  // console.log('update')
  if ((prevState.page !== this.state.page) || (prevState.filter !== this.state.filter)||(prevState.city !== this.state.city)||(prevState.state !== this.state.state)) {
         this.getUserList();
  } 
  if(prevProps.params.any !== this.props.params.any){
    this.getUserList();
  }
}
 

  getUserList = () =>{


    //  console.log("urldata===>",data)

    this.setState(old => ({...old, isLoading:true}))
    var data = {role_name:this.props.params.any,state:this.state.state,city:this.state.city,length:this.state.pageSize, start:this.state.page*this.state.pageSize};

    if(this.state.filter !== null){
      data = {...data, filter: this.state.filter};
    }
    // this.apiCtrl.callAxios('users/list',{city:this.state.city},{role_name:this.props.params.any,length:this.state.pageSize, start:this.state.page*this.state.pageSize}).then(response => {
      this.apiCtrl.callAxios('users/list',data).then(response => {
        
        if(response.success == true){
            this.setState(old => ({...old, data:response.data.aaData, total:response.data.iTotalRecords}))

        } else {
        alert("No Data Available")
        }
        this.setState(old => ({...old, isLoading:false}))
        // sessionStorage.setItem('_token', response.data.)
        
    }).catch(function (error) {
        this.setState(old => ({...old, isLoading:false}))
        console.log(error);
    });
    // this.apiCtrl.callAxios('users/admin', []).then(response => {
      
    //   console.log(response);
    //   this.setState({ data: response.data});
    //   if(response.success){

    //   } else {
    //     alert("No Data Available")
    //   }
    //   // sessionStorage.setItem('_token', response.data.)
      
    // }).catch(function (error) {
    //   console.log(error);
    // });
  }


 
  render() {

    const getstatedata = () => {

      if(Object.keys(this.state.statedata).length < 1){
          
          Swal.fire({
              title: 'Loading...',
              didOpen: () => {
                  Swal.showLoading()
              }
          })
          console.log('loader stART', Object.keys(this.state.statedata).length)
          this.apiCtrl.callAxios('states/list',{search:{country_id:1}}).then(res => {

              var dataOfstate=[];
              dataOfstate = {...dataOfstate, ['']:'Select State'};
              res.data.map((value)=>{                  
                // console.log("STATE==>",value)
                
                dataOfstate = {...dataOfstate, [value.id]:value.state_name};
              })     
              
              this.setState(old => ({...old, statedata: dataOfstate}));
              Swal.close();     
            })
          console.log('loader close')
      }
  }

  const handlechang =(e)=>{
   
   
    this.setState(old => ({...old , state:e.target.value}))
       
    Swal.fire({
        title: 'Loading...',
        didOpen: () => {
    Swal.showLoading()
        }
    })
    this.setState(old => ({...old, citydata: ""}));
    this.apiCtrl.callAxios('cities/list',{search:{state_id:e.target.value}}).then(res => {
         
    var dataOfcity=[]
    
    dataOfcity = {...dataOfcity, ['']:'Select City'};
    res.data.map((value)=>{                  
        // console.log("Scity==>",value)
            
        dataOfcity = {...dataOfcity, [value.id]:value.city_name};
    })     
    this.setState(old => ({...old, citydata: dataOfcity}));
    })  
    Swal.close();      
}


    const handleReload = (status) =>{
      if(status == true){

        this.getUserList();
      }
     }
   const  handleClick = (data) => {
     //console.log("userdata",data)
      this.setState({userData: data})
    }
    const columns = [
      { field: 'sr_no', headerName: 'ID', width: 100 },
      { field: 'name', headerName: 'Name', width: 190 },
      { field: 'email', headerName: 'Email', width: 300 },
      { field: 'mobile', headerName: 'Mobile', width: 190 },
      { field: 'action', headerName: 'Action',  width: 300,  renderCell: (params) => <Action func={handleClick} isLoading={handleReload}  key={params.row.id} param={params.row} />, },
    ];

  //  console.log(this.state.role_name)

   // console.log(this.state.data.aaData.id)
   let user =  this.props.params.any.replace(/-/g, " "); 
  //  var userType = user
  //  .toLowerCase()
  //  .split(' ')
  //  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  //  .join(' ');
   var userType= user.toUpperCase()
  return (
    <>
    <BreadCrumb breadcrumb={`${userType} List`} />

    <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
     
     <div className='row mb-3'>
      <div className='col-md-3'>
        <Button  type="button" style={{ backgroundColor: '#1F5B54',width:"auto", color:"#fff"}} href="#exampleModalToggle1" data-bs-toggle="modal" size='large' >Add {userType}</Button>
      </div>
      <div className='col-md-3'>
      <MaterialSelect value={this.state.state?this.state.state:""}
        onMouseEnter={()=>{getstatedata()}}       
        data={this.state.statedata}  id="state_id" labelId="state" name="state"
    
        onChange={(e)=>{handlechang(e )}}   label="State *" fullWidth
      
      />

      </div>
      <div className='col-md-3'>
      <MaterialSelect   value={this.state.city?this.state.city:""} 
        data={this.state.citydata}  id="city_id" labelId="city-id" 
        name="city"    onChange={(e)=>this.setState({city : e.target.value})}
        
        label="City *" fullWidth
      />
           

      </div>
      <div className='col-md-3'>
         <MaterialTextField 
           label={"Search"} size="large" 
           fullWidth name='search'onChange={(e)=>this.setState(old => ({...old, filter: e.target.value}))}/>

      </div>
     </div>
   
    <div style={{ height: 400, width: '100%' }}>
  
    <DataGrid
        autoHeight
        rows={this.state.data}
        rowCount={this.state.total}
        page={this.state.page}
        
        loading={this.state.isLoading}
        columns={columns}
        pagination
        paginationMode='server'

        pageSize={this.state.pageSize}
        rowsPerPageOptions={[10, 30, 50, 70, 100]}
        // checkboxSelection

        onPageChange={(newPage) => this.setState(old=>({...old, page: newPage}))}
        onPageSizeChange={(newPageSize) => this.setState(old=>({...old, pageSize: newPageSize}))}
        />
        {/* {rows.map((item) => {
            return <Action id={item.id} item={item.action} />
            // return <Button name='Edit'>Edit</Button>
          })} */}
    </div>





    <Model />
    <ViewResult/>

   <EditUser isLoading={handleReload}   params={this.state.userData}/>
   




    
    
      




    </Box>
    </>
  );
}
}

export default (props) => {
  return <UserList {...props} params={useParams()} />
}

function Action(props){ 
  const apiCtrl = new Api;

    const editUserdata = (event)=>{
     props.func(props.param)
         
    }

    const deleteUser=(event)=>{
      const  data={
        email:props.param.email
      }
      
      // console.log("data",event)
  
  
      Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to delete `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#00B96F',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete!',
      }).then((result) => {
        if (result.value) {
          apiCtrl.callAxios(`users/delete`, data).then(response => {
            // Swal.fire({
            //   title: 'Deleted successfully',
            //   showConfirmButton: false,
            //   timer: 1200,
            // });
  
  
            if(response.success == true){
              Swal.fire({
                title: 'Deleted successfully',
                icon: "success",
                showConfirmButton: false,
                timer: 1200,
              });
              props.isLoading(true);
                } else {
                  Swal.fire({
                    title: 'Unable to Delete',
                    icon: "error",
                    showConfirmButton: false,
                    timer: 1200,
                  });
                }
              
            // console.log('deleted res', response);
  
           // this.getAllproduct();
          });
        }
      });
  
  

      
   }
    
    return (  
      <>

               <Button  type="button"  style={{ backgroundColor: '#1F5B54',color:"#fff"}} data-bs-toggle="modal" size='small' href="#exampleModalToggle" onClick={editUserdata}>Edit</Button>&nbsp;&nbsp;
               <Button  type="button"  style={{ backgroundColor: '#1F5B54',color:"#fff"}} size='small' onClick={()=>deleteUser(props.param)}>Delete</Button>&nbsp;&nbsp;
               <Link key={props.key} to='/result-history' state={{param:props.param}}>  <Button  type="button"  style={{ backgroundColor: '#1F5B54',color:"#fff"}} size='small' >View Result</Button></Link>  
              
               
             
  </>
                       

  );

}

function Model(props){
  // var id=props.userid.id
  // console.log("id=====>",id)
  // console.log("propsinmodel----->",props)
 //console.log(props.eventid)
  return(
    <>
   
      <div className="modal fade" id="exampleModalToggle1" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
        <div className="modal-header">
            {/* <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5> */}
            <div className="row ml-1" style={{ paddingTop: '2%'}}>
                {/* <label><b>{props.params.any} Details</b></label> */}
            </div>
            <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          
          <div className="modal-body m-body">
            
          <div className="row">
            {/* <AddUsers  params={this.props.params}  /> */}
            <AddUsers    />

          </div>
            
          {/* <div className="modal-footer">
                  

                  <Button data-bs-dismiss="modal" style={{ backgroundColor: 'rgb(108 110 116)',color:"#fff"}}>Close</Button>&nbsp;&nbsp;
                
          
                  {/* <Button data-bs-dismiss="modal" style={{ backgroundColor: '#183883',color:"#fff"}} onClick={ submituser }>Submit</Button> 
                
                </div>*/}
          </div>  

          
        </div>
      </div>
      </div>


    </>
  )
}


function ViewResult(props){
  
  return(
    <>
   
      <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
        <div className="modal-dialog modal-lg  modal-dialog-centered">
        <div className="modal-content">
        <div className="modal-header">
            {/* <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5> */}
            <div className="row ml-1" style={{ paddingTop: '2%'}}>
                {/* <label><b>{props.params.any} Details</b></label> */}
            </div>
            <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          
          <div className="modal-body m-body">
            
          <div className="row">
          <fieldset className="form-group border border-primary mb-2 p-3">
            <div className="row " >
              <legend className="col-form-label col-sm-2  pt-0" >  <h4 style={{ color: '#1F5B54'}}>{"Result:"}</h4></legend>
                <div className="col-sm-9">
                  <div className="row">

                  <div class="wrapper" >
                  
                    <h4 style={{ color: '#1F5B54'}}>{"Heavy Vehicle Insurance"}</h4>
                    <p><span className="price">Name:<b>Test Agent</b></span></p>
                    
                    <p>Time: <strong>O.5 Hours</strong></p>
                    <span className="price">Total Marks: <strong style={{ color: 'green'}}>60</strong>, Passing: <strong style={{color:'red'}}>25</strong></span><br/>
                    <span> Marks Obtain: <strong style={{color:'red'}}>11</strong></span><br/>
                    <span className="price"> Exam Result: <strong style={{ color: 'red'}}>  FAIL</strong></span>
                      
                  
 


                  </div>

                  </div> 
                </div>  
            </div>                    
                              
          </fieldset>
          <fieldset className="form-group border border-primary mb-2 p-3">
            <div className="row " >
              <legend className="col-form-label col-sm-2  pt-0" >  <h4 style={{ color: '#1F5B54'}}>{"Result:"}</h4></legend>
                <div className="col-sm-9">
                  <div className="row">

                  <div class="wrapper" >
                  
                    <h4 style={{ color: '#1F5B54'}}>{"Heavy Vehicle Insurance"}</h4>
                    <p><span className="price">Name:<b>Test Agent</b></span></p>
                    
                    <p>Time: <strong>O.5 Hours</strong></p>
                    <span className="price">Total Marks: <strong style={{ color: 'green'}}>60</strong>, Passing: <strong style={{color:'red'}}>25</strong></span><br/>
                    <span> Marks Obtain: <strong style={{color:'red'}}>11</strong></span><br/>
                    <span className="price"> Exam Result: <strong style={{ color: 'red'}}>  FAIL</strong></span>
                      
                  
 


                  </div>

                  </div> 
                </div>  
            </div>                    
                              
          </fieldset>
          <fieldset className="form-group border border-primary mb-2 p-3">
            <div className="row " >
              <legend className="col-form-label col-sm-2  pt-0" >  <h4 style={{ color: '#1F5B54'}}>{"Result:"}</h4></legend>
                <div className="col-sm-9">
                  <div className="row">

                  <div class="wrapper" >
                  
                    <h4 style={{ color: '#1F5B54'}}>{"Heavy Vehicle Insurance"}</h4>
                    <p><span className="price">Name:<b>Test Agent</b></span></p>
                    
                    <p>Time: <strong>O.5 Hours</strong></p>
                    <span className="price">Total Marks: <strong style={{ color: 'green'}}>60</strong>, Passing: <strong style={{color:'red'}}>25</strong></span><br/>
                    <span> Marks Obtain: <strong style={{color:'red'}}>11</strong></span><br/>
                    <span className="price"> Exam Result: <strong style={{ color: 'red'}}>  FAIL</strong></span>
                      
                  
 


                  </div>

                  </div> 
                </div>  
            </div>                    
                              
          </fieldset>                   
            

          </div>
            
          {/* <div className="modal-footer">
                  

                  <Button data-bs-dismiss="modal" style={{ backgroundColor: 'rgb(108 110 116)',color:"#fff"}}>Close</Button>&nbsp;&nbsp;
                
          
                  {/* <Button data-bs-dismiss="modal" style={{ backgroundColor: '#183883',color:"#fff"}} onClick={ submituser }>Submit</Button> 
                
                </div>*/}
          </div>  

          
        </div>
      </div>
      </div>


    </>
  )
}




 class EditUser extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      btnVariant : "contained",
    
      statedata: [''],
      citydata : [""],
       errors:{},
  
      
    }
    this.apiCtrl = new Api;
 
   
  }

 
  componentDidUpdate(prevProps,prevState){
    if(prevProps.params.id !== this.props.params.id){
      console.log('Propps', this.props.data)
      this.setState(this.props.params)
    } 
  }

  
 
  
  render(){
    console.log("propsedit=>",this.props)
  const submituser= async (e) => {
      e.preventDefault();
   
     

   
    
        
      
      var data = {
        
          name: this.state.name,
          email: this.state.email,
          mobile: this.state.mobile,
          // password: this.state.password,
          // c_password: this.state.c_password,
          role: this.state.role,
          address: this.state.address,
          district: this.state.district,
          city: this.state.city,
          state: this.state.state,
          pincode: this.state.pincode,

      
      }
      
    
          this.apiCtrl.callAxios(`users/edit/${this.props.params.id}`, data).then(response => {

              if(response.success == true){
                  Swal.fire({
                      title: "User",
                      text: "Updated",
                      icon: "success",
                      timer: 3000,
                      showConfirmButton: false,
                  })
                  this.props.isLoading(true)
                  $('.close').trigger('click')
              } else {
                  Swal.fire({
                      title: "user",
                      text: "Not Updated!",
                      icon: "error",
                      timer: 3000,
                      showConfirmButton: false,
                  })
              }

              
            }).catch(function (error) {
              console.log(error);
            });
     
   
        
   
    } 


    const getcitydata = (state) => {
      this.setState(
       { citydata: {}}
      );
      this.apiCtrl.callAxios('cities/list',{search:{state_id:state}}).then(res => {
        var dataOfCity=[]
        res.data.map((value)=>{
          dataOfCity = {
            ...dataOfCity, 
            [value.id]:value.city_name
          };                  
          //    console.log("city==>",value)
        })      
        this.setState(old => ({
          ...old, 
          citydata: dataOfCity
        }));
        
      })     
    }

    const handleChange = (e) => {
      this.setState({state : e.target.value})           
      getcitydata(e.target.value);
    }

    const getstatedata = () => {
      if(Object.keys(this.state.statedata).length <= 1){
        this.apiCtrl.callAxios('states/list',{search:{country_id:1}}).then(res => {

            var dataOfstate=[]
            res.data.map((value)=>{                                          
                dataOfstate = {
                    ...dataOfstate, 
                    [value.id]:value.state_name
                };
            })     
            this.setState(old => ({
                ...old, 
                statedata: dataOfstate
            }));
        })
        getcitydata(this.state.state);
      }
    }
    
    // getstatedata ();
       

  //  let user = '';
            let user = '';
            if(this.props.params.role){

              user =  this.props.params.role.replace(/-/g, " ");
            }

            var userType = user
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');


        return (
          <>   


      <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
        <div className="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle"> Update {  userType } Details</h5>
            <div className="row ml-1" style={{ paddingTop: '2%'}}>
                {/* <label><b>{props.params.any} Details</b></label> */}
            </div>
            <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          
          <div className="modal-body m-body">
            
          <div className="row">

          {/* <BreadCrumb breadcrumb="Users" breadcrumbItem1={'Create ' +   userType} /> */}

            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

            <div className="row ml-1 mb-3">
               
                <label><b>Personal Information</b></label>
            </div>

            {/* <Button style={{ backgroundColor: '#183883'}} onClick={ getdatabyid }>getdatabyid</Button> */}

           
            <div className="row ml-1" style={{ paddingTop: '2%'}}>
                {/* <label><b>Personal Information</b></label> */}
            </div>
            <div className="row ">

                <div className="col-md-4 mb-4">
                    <MaterialTextField 
                    value={this.state.name?this.state.name:""}
                    label={  userType + " Name *"} 
                    size="small"
                  
                      fullWidth name='name' onChange={(e)=>this.setState({name : e.target.value})}/>
                </div>
                <div className="col-md-4 mb-4">
                    <MaterialTextField value={this.state.email?this.state.email:""}   label={  userType + " Email *"} size="small" fullWidth name='email' onChange={(e)=>this.setState({email : e.target.value})}/>
                </div>
                <div className="col-md-4 mb-4">
                    <MaterialTextField value={this.state.mobile?this.state.mobile:""} label={  userType + " Mobile *"} size="small" fullWidth name='mobile' onChange={(e)=>this.setState({mobile : e.target.value})}/>
                </div>
                {/* <div className="col-md-4 mb-4">
                    <MaterialTextField    onKeyUp={submituser} value={this.state.password?this.state.password:""} type={"password"} label={  userType + " Password *"} size="small" fullWidth name='password' onChange={(e)=>this.setState({password : e.target.value})}/>
                </div>
               
                <div className="col-md-4 mb-4">
                    <MaterialTextField value={this.state.c_password?this.state.c_password:""} type={"password"} label="Confirm Password *" size="small" fullWidth name='c_password' onChange={(e)=>this.setState({c_password : e.target.value})}/>
                </div> */}
                
                
            </div>

            <Divider sx={{ borderColor: '#dac4c4'}} />

            <div className="row ml-1 mb-3" style={{ paddingTop: '2%'}}>
                <label><b>Address</b></label>
            </div>
            <div className="row ">

                <div className="col-md-4 mb-4">
                    <MaterialTextField value={this.state.address?this.state.address:""} label="Address *" size="small" fullWidth name='address' onChange={(e)=>this.setState({address : e.target.value})}/>
                </div>
                {/* <div className="col-md-4 mb-4">
                    <MaterialTextField value={this.state.city?this.state.city:""}label="City *" size="small" fullWidth name='city' onChange={(e)=>this.setState({city : e.target.value})}/>
                </div>
                <div className="col-md-4 mb-4">
                    <MaterialTextField value={this.state.state?this.state.state:""} label="State *" size="small" fullWidth name='state' onChange={(e)=>this.setState({state : e.target.value})}/>
                </div> */}
                <div className='col-md-4'>        
              <MaterialSelect value={this.state.state?this.state.state:""} onMouseEnter={getstatedata}       data={this.state.statedata}  id="state_id" labelId="state" name="state" onChange={handleChange} label="State *" fullWidth/>
            </div>

            <div className='col-md-4'>        
              <MaterialSelect   value={this.state.city?this.state.city:""}      data={this.state.citydata}  id="city_id" labelId="city-id" name="city" onChange={(e)=>this.setState({city : e.target.value})} label="City *" fullWidth/>
            </div>
                <div className="col-md-4 mb-4">
                    <MaterialTextField value={this.state.pincode?this.state.pincode:""} label="Pincode *" size="small" fullWidth name='pincode' onChange={(e)=>this.setState({pincode : e.target.value})}/>
                </div>
                
            </div>
            <Divider sx={{ borderColor: '#dac4c4'}} />

            <div className='row mt-2'>
                <div className="col-md-3">
                    <Button style={{ backgroundColor: '#1F5B54' ,color:"#fff"}} onClick={ submituser }>Update</Button>
                </div>
            </div>
            </Box>
         

          </div>
            
          {/* <div className="modal-footer">
                  

                  <Button data-bs-dismiss="modal" style={{ backgroundColor: 'rgb(108 110 116)',color:"#fff"}}>Close</Button>&nbsp;&nbsp;
                
          
                  {/* <Button data-bs-dismiss="modal" style={{ backgroundColor: '#183883',color:"#fff"}} onClick={ submituser }>Submit</Button> 
                
                </div>*/}
          </div>  

          
        </div>
      </div>
      </div>
            
          </>
        )
}
};

  (props) => {
  return (<EditUser {...props}   params={useParams()}/>)
}
