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
import { SearchableInputTextfield } from '../../../../Tags/SearchableInputField';
import Geocode from "react-geocode";
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


    
    this.setState(old => ({...old, isLoading:true}))
    var data = {role_name:this.props.params.any,state:this.state.state,city:this.state.city,length:this.state.pageSize, start:this.state.page*this.state.pageSize};
    
    if(this.state.filter !== null){
      data = {...data, filter: this.state.filter};
    }
    // console.log("urldata===>",data)
    // this.apiCtrl.callAxios('users/list',{city:this.state.city},{role_name:this.props.params.any,length:this.state.pageSize, start:this.state.page*this.state.pageSize}).then(response => {
      this.apiCtrl.callAxios('users/list',data).then(response => {
        
        if(response.success == true){
            this.setState(old => ({...old, data:response.data.aaData, total:response.data.iTotalRecords}))

        } else {
        // alert("No Data Available")
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

    let user =  this.props.params.any.replace(/-/g, " "); 
     var userType = user
     .toLowerCase()
     .split(' ')
     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
     .join(' ');
    //  var userType= user.toUpperCase()

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


    var columns = [
      { field: 'sr_no', headerName: 'SR.No', width: 100 },
      { field: 'name', headerName: 'Name', width: 190 },
      { field: 'email', headerName: 'Email', width: 300 },
       { field: 'mobile', headerName: 'Mobile', width: 190 },
       {field:"state_name",headerName:'Area',width:190,renderCell:(params) => params.row.state_name !== null ? <span>{params.row.state_name}</span> : 'Not Assigned'},
       {field:"category",headerName:'Category',width:190,renderCell:(params) => params.row.category !== null ? <span>{params.row.category}</span> : 'Not Assigned'},
       {field:"manager",headerName:'Reporting Manager',width:300,renderCell:(params) => params.row.manager !== null ? <span>{params.row.manager}</span> : 'Not Assigned'},
      { field: 'action', headerName: 'Action',  width: 400,  renderCell: (params) => <Action func={handleClick} isLoading={handleReload} userType={userType}  key={params.row.id} param={params.row} />, },
    ];

    if(user === 'admin'){
      
      var columns = [
        { field: 'sr_no', headerName: 'Sr.No', width: 100 },
        { field: 'name', headerName: 'Name', width: 190 },
        { field: 'email', headerName: 'Email', width: 300 },
        { field: 'mobile', headerName: 'Mobile', width: 190 },
        {field:"tag",headerName:'Source',width:190,renderCell:(params) => params.row.tag !== null ? <span>{params.row.tag}</span> : 'Not Assigned'},
  
        {field:"state_name",headerName:'Area',width:190,renderCell:(params) => params.row.state_name !== null ? <span>{params.row.state_name}</span> : 'Not Assigned'},
        { field: 'action', headerName: 'Action',  width: 300,  renderCell: (params) => <Action func={handleClick} isLoading={handleReload} userType={userType}  key={params.row.id} param={params.row} />, },
      ];
    } 


    const exportLmsSummary = () => {
      // console.log('HII')
      this.apiCtrl.callAxios('export-lms-summary').then((res)=>{
        if(res.success == true){
          window.open(res.data.link, '_blank')
        }else {
          Swal.fire({
            title:'Export Lms Summary',
            text:'Unable TO Export Lms Summary!',
            icon:'error',
            timer:3000,
            showConfirmButton: false,
          })
        }
      })
     }
   
  //  console.log(this.state.role_name)

   // console.log(this.state.data.aaData.id)
  
  return (
    <>
    <BreadCrumb breadcrumb={`${userType} List`} />

    <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
     
     <div className='row mb-3'>
      <div className='col-md-4 mb-3 d-flex justify-content-between'>
        <Button  type="button" style={{ backgroundColor: '#1F5B54',width:"auto", color:"#fff", marginBottom:10}} href="#exampleModalToggle1" data-bs-toggle="modal" size='large' >Add {userType}</Button>
        {userType === 'Posp' &&
               <Button  type="button"  style={{ backgroundColor: '#1F5B54',width:"auto",color:"#fff",marginBottom:10}} size='small' onClick={exportLmsSummary} >Export LMS Summary</Button>
        }
      </div>
      <div className='col-md-3 mb-3'>
      <MaterialSelect value={this.state.state?this.state.state:""}
        onMouseEnter={()=>{getstatedata()}}    
        size={"small"}      
        data={this.state.statedata}  id="state_id" labelId="state" name="state"
    
        onChange={(e)=>{handlechang(e )}}   label="State *" fullWidth
      
      />

      </div>
      <div className='col-md-3 mb-3'>
      <MaterialSelect   value={this.state.city?this.state.city:""} 
         size={"small"}   
        data={this.state.citydata}  id="city_id" labelId="city-id" 
        name="city"    onChange={(e)=>this.setState({city : e.target.value})}
        
        label="City *" fullWidth
      />
           

      </div>
      <div className='col-md-2 mb-3'>
         <MaterialTextField 

           label={"Search"}    size={"small"}   
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
               {props.userType=="POSP"?<>
                <Link key={props.key} to='/result-history' state={{param:props.param}}>  <Button  type="button"  style={{ backgroundColor: '#1F5B54',color:"#fff"}} size='small' >View Details</Button></Link>  
              
               </>:""}&nbsp;&nbsp;
              
               
             
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
        <div className="modal-dialog modal-lg modal-dialog-centered">
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
      admindata:[""],
      categoryData:[""],

      name: null,
      email: null,
      mobile: null,
      // password: null,
      // c_password: null,
      address: null,
      // district: null,
      // role:null,
      city: null,
      state: null,
      pincode: null,
      validation:{
         name:{required:true,min:4, type:'alpha'}, 
         mobile:{required:true, min:10, max:10, type:'numeric'}, 
         email:{required:true,min:6, type:'email'}, 
        //  insured_nominee_name:{required:true,min:4, type:'alpha'}, 
        //  password:{required:true,min:6, type:'AlphaNumeric'}, 
        //  c_password:{required:true, type:'AlphaNumeric'}, 
        //  district:{required:true, type:'AlphaNumeric'}, 
         address:{required:true, type:'AlphaNumeric'}, 
        //  role:{required:true},
         state:{required:true}, 
         city:{required:true},
         pincode:{required:true, min:6, max:6, type:'Numeric'} 
     },
     isValid:false,
      
     
       errors:{},
  
      
    }
    this.apiCtrl = new Api;
 
   
  }

 
  componentDidUpdate(prevProps,prevState){
    if(prevProps.params.id !== this.props.params.id ){
      console.log('Propps', this.props)
     
      this.setState(this.props.params)
     
      
      this.getstatedata()
      this.listadmin()
      this.citylist()
    
       
      

     
     
        

    } 
  }


  // componentDidMount(){
  //   this.getstatedata()
  //   this.listadmin()
  //   this.citylist()
  // }


 getstatedata = () => {
    this.apiCtrl.callAxios('states/list',{search:{country_id:1}}).then(res => {

        res.data.map((value)=>{                  
            //console.log("STATE==>",value)
             this.setState(old => ({...old, statedata:{ ...old.statedata, [value.id]:value.state_name}}))                
        })      
    })
  }

  listadmin=()=>{

    
    this.apiCtrl.callAxios('users/list',{role_name:"admin"}).then(res => {

      //  console.log("admin res=>",res)

        res.data.aaData.map((value)=>{                  
            //console.log("STATE==>",value)
            this.setState(old => ({...old, admindata:{ ...old.admindata, [value.id]:value.name}}))                
        })      
  })




}

citylist=()=>{
   const city=this.props.params.state
 
  this.apiCtrl.callAxios('cities/list',{search:{state_id:city}}).then(res => {
    res.data.map((value)=>{                  
    //    console.log("city==>",value)
            this.setState(old => ({...old, citydata:{ ...old.citydata, [value.id]:value.city_name}}))                
    })      
    })

}

  
 
  
  render(){
  //  console.log("propsedit=>",this.props)
   let user = '';
  if(this.props.params.role){

    user =  this.props.params.role.replace(/-/g, " ");
  }

  var userType = user
  .toLowerCase()
  .split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

  const submituser= async (e) => {
      e.preventDefault();
      let errors = {};
      let isValid = this.state.isValid;
      Object.entries(this.state.validation).map(([key,value])=>{

          
          if((typeof this.state[key] === 'undefined') || (this.state[key] === null) ||(this.state[key] === "")  ) {
             console.log("key=>",this.state[key])
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
          // password: this.state.password,
          // c_password: this.state.c_password,
          role: this.state.role,
          address: this.state.address,
          // district: this.state.district,
          city: this.state.city,
          state: this.state.state,
          pincode: this.state.pincode,

      
      }
      if(userType=="Posp"){
        data.manager = this.state.reportingManager;
        data.category=this.state.category;
     }else{
        data.tag = this.state.tag;
     }
      
    
          this.apiCtrl.callAxios(`users/edit/${this.props.params.id}`, data).then(response => {

              if(response.success == true){
                  Swal.fire({
                      title: "User",
                      text: response.message,
                      icon: "success",
                      timer: 3000,
                      showConfirmButton: false,
                  })
                  this.props.isLoading(true)
                  $('.close').trigger('click')
              } else {
                  Swal.fire({
                      title: "user",
                      text: response.message,
                      icon: "error",
                      timer: 3000,
                      showConfirmButton: false,
                  })
              }

              
            }).catch(function (error) {
              console.log(error);
            });
     
   
        
   
    } 


    // const getcitydata = (state) => {
    //   this.setState(
    //    { citydata: {}}
    //   );
    //   this.apiCtrl.callAxios('cities/list',{search:{state_id:state}}).then(res => {
    //     var dataOfCity=[]
    //     res.data.map((value)=>{
    //       dataOfCity = {
    //         ...dataOfCity, 
    //         [value.id]:value.city_name
    //       };                  
    //       //    console.log("city==>",value)
    //     })      
    //     this.setState(old => ({
    //       ...old, 
    //       citydata: dataOfCity
    //     }));
        
    //   })     
    // }

    // const handleChange = (e) => {
    //   this.setState({state : e.target.value})           
    //   getcitydata(e.target.value);
    // }
 
    // const getstatedata = () => {
    //   if(Object.keys(this.state.statedata).length <= 1){
    //     this.apiCtrl.callAxios('states/list',{search:{country_id:1}}).then(res => {

    //         var dataOfstate=[]
    //         res.data.map((value)=>{                                          
    //             dataOfstate = {
    //                 ...dataOfstate, 
    //                 [value.id]:value.state_name
    //             };
    //         })     
    //         this.setState(old => ({
    //             ...old, 
    //             statedata: dataOfstate
    //         }));
    //     })
    //     getcitydata(this.state.state);
    //   }
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

  
  





  const handleChange = (e) => {

    console.log('id', e.target.value)
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
       

  //  let user = '';
  
  const adminlist=()=>{

    if(this.state.admindata.length>0){
        this.apiCtrl.callAxios('users/list',{role_name:"admin"}).then(res => {

          //  console.log("admin res=>",res)

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
            //  console.log("category",res)

              Object.entries(res.data).map(([key,value])=>{
                  // console.log("value=>",value)

              this.setState(old=>({...old,categoryData:{...old.categoryData,[value.id]:value.category_name}}))
              })
          })

      }
      
  }

 // console.log("state=>",this.state)
  return (
    <>   


  <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
  <div className="modal-dialog modal-lg modal-dialog-centered">
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
              <MaterialTextField value={this.state.mobile?this.state.mobile:""} label={" Mobile *"} size="small" fullWidth name='mobile' onChange={(e)=>{handleChange(e)}}
              helperText={
                this.state.errors.mobile
                ? this.state.errors.mobile
                : ''
                }
                error={this.state.errors.mobile?true:false}
              />
          </div>
          {/* <div className="col-md-4 mb-4">
              <MaterialTextField    onKeyUp={submituser} value={this.state.password?this.state.password:""} type={"password"} label={  userType + " Password *"} size="small" fullWidth name='password' onChange={(e)=>this.setState({password : e.target.value})}/>
          </div>
          
          <div className="col-md-4 mb-4">
              <MaterialTextField value={this.state.c_password?this.state.c_password:""} type={"password"} label="Confirm Password *" size="small" fullWidth name='c_password' onChange={(e)=>this.setState({c_password : e.target.value})}/>
          </div> */}

        {userType!=="Posp"?
          <>


              <div className="col-md-4  mb-4">
                  <SearchableInputTextfield
                  placeholder="Search" label={"Source"} size={"small"} name={"search"} value={this.state.tag&&this.state.tag} 
                  onChange={handletag}

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
              <MaterialTextField value={this.state.address?this.state.address:""} label="Address *" size="small" fullWidth name='address' onChange={(e)=>{handleChange(e)}} onKeyUp={(e)=>getLatLng(e.target.value)}
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
        <MaterialSelect value={this.state.state?this.state.state:""}        data={this.state.statedata}  id="state_id" labelId="state" name="state" onChange={(e)=>{handleChange(e)}} label="State *" fullWidth
        helperText={
          this.state.errors.state
          ? this.state.errors.state
          : ''
          }
          error={this.state.errors.state?true:false}
        />
      </div>

      <div className='col-md-4'>        
        <MaterialSelect   value={this.state.city?this.state.city:""}      data={this.state.citydata}  id="city_id" labelId="city-id" name="city" onChange={(e)=>{handleChange(e)}} label="City *" fullWidth
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
