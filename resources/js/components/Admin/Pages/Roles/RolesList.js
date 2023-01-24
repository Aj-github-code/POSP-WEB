import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import { Button } from 'react-bootstrap';
import Api from '../../../../api';
import { Link } from "react-router-dom";
import AddRoles from './AddRoles';


export default class RolesList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data : [],
      isLoading: false,
      page: 0,
      pageSize: 10,
      filter : null,
      roleData:[]

  }
    this.apiCtrl = new Api;
    
  }
  getRolelist = ()=>{
    this.setState(old => ({...old, isLoading:true}))
        var data = {length:this.state.pageSize, start:this.state.page*this.state.pageSize};

        if(this.state.filter !== null){
          data = {...data, filter: this.state.filter};
        }
    this.apiCtrl.callAxios('users/roles-list').then(response => {
      var res = response.data.aaData;
      if(response.success == true){
        this.setState(old => ({...old, data:response.data.aaData, total:response.data.iTotalRecords}))


    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
       
      })
    }
    this.setState(old => ({...old, isLoading:false}))
     // this.setState(res)
      console.log(res)

    })
  }
  componentDidMount(){
    this.getRolelist()

  }
  componentDidUpdate(prevProps, prevState){
    // console.log('update')
    if ((prevState.page !== this.state.page) || (prevState.filter !== this.state.filter)) {
       
        this.getRolelist()
    } 
  }


  render(){
      
    const  handleClick = (data) => {
      //console.log("userdata",data)
       this.setState({roleData: data})
     }
  
        const columns = [
          { field: 'sr_no', headerName: 'ID', width: 70 },
          { field: 'role_name', headerName: 'Role Name', width: 200 },
          { field: 'role_code', headerName: 'Role Code', width: 250 },
          { field: 'slug', headerName: 'Slug', width: 190 },
          { field: 'action', headerName: 'Action', width: 100, renderCell: (params) => <Action functi={handleClick}  key={params.row.id} param={params.row} /> },
        ];

  return(
    <>

     <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}> 
     <Button  type="button" style={{ backgroundColor: '#183883',width:"96px", marginLeft:"47rem",color:"#fff"}} href="#exampleModalToggle1" data-bs-toggle="modal" size='large' >Add Role</Button>
       <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        sx={{width:"100%", overflowX:"auto"}}
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
      </div>
    </Box>
    <Model  params={this.state.roleData}/>

      
    </>
  )

  
 }
  
}

function Action(props) {

  const editRoledata = (event)=>{
    props.functi(props.param)
  } 

  const deleteRoledata =(event)=>{
    console.log(event)
  }
      return(
       <>


      <Button id={props.param.id} data-bs-toggle="modal" size='small' href="#exampleModalToggle1" onClick={editRoledata}>Edit</Button>&nbsp;&nbsp;
        
        <Button  type="button"  size='small' onClick={()=>deleteRoledata(props.param)}>Delete</Button>
       </>
        

        
      )
    }



    
function Model(props){
  // var id=props.userid.id
  // console.log("id=====>",id)
  console.log("propsinmodel----->",props)
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
            <AddRoles  data={props.params}  />

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
















// export default class RolesList extends React.Component {
//   constructor(props) {
//     super(props);
//   }
  

//   render(){

//     const API_URL = process.env.MIX_API_URL;
//     var token= sessionStorage.getItem('_token');
//     var config = {
//         method: 'get',
//         url: API_URL+'users/roles-list',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer '+token,
//         },
    
//         };
        
    
//         axios(config)
//             .then(function (response) {
          
//               var res = response.data.aaData;
//               console.log(response);
//               setDatarows(res);
              
//               })
//         .catch(function (error) {
//           console.log(error);
//         });
    


//     const columns = [
//       { field: 'id', headerName: 'ID', width: 70 },
//       { field: 'role_name', headerName: 'Role Name', width: 200 },
//       { field: 'role_code', headerName: 'Role Code', width: 250 },
//       { field: 'slug', headerName: 'Slug', width: 190 },
//       { field: 'action', headerName: 'Action', width: 100, renderCell: (params) => <Action param={params.row} /> },
//     ];

//     return (
//       <>
//       <BreadCrumb breadcrumb="Roles" breadcrumbItem1='Roles List' />

//       <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

//       <div style={{ height: 400, width: '100%' }}>
    
//         <DataGrid
//           rows={datarows}
//           columns={columns}
//           pageSize={5}
//           rowsPerPageOptions={[5]}
//           checkboxSelection
//           />
//           {/* {rows.map((item) => {
//               return <Action id={item.id} item={item.action} />
//               // return <Button name='Edit'>Edit</Button>
//             })} */}
//       </div>
//       </Box>
//       </>
//     );
//   }
// }
// function Action(props) {
//     return(
//         <Button id={props.param.id} onClick={()=>EditButton(props.param.id)}>Edit</Button>

//     )
//   }
// function EditButton(id){

// }