import React from "react";
import { Box,Divider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MaterialButton from "../../../../Tags/MaterialButton";
import MaterialTextField from "../../../../Tags/MaterialTextField";
import Switch from "@mui/material/Switch";
import { Button } from 'react-bootstrap';
import Swal from "sweetalert2";
import Api from "../../../../api";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import { useState } from "react";
import { Tag } from "./Tag";
import { useEffect } from "react";

export default class Taglist extends React.Component{
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
      this.apiCtrl.callAxios('tags/list').then(response => {
        console.log("tagelistres+>",response)
        var res = response.data
        if(response.success == true){
          this.setState(old => ({...old, data:response.data}))
  
  
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
      const handleReload = (status) =>{
        if(status == true){
  
          this.getRolelist();
        }
       }
        
      const  handleClick = (data) => {
        //console.log("userdata",data)
         this.setState({roleData: data})
       }
    
          const columns = [
            { field: 'id', headerName: 'Sr.No', width: 200 },
            { field: 'name', headerName: ' Name', width: 200 },
            { field: 'slug', headerName: 'Slug', width:200  },
            { field: 'is_active', headerName: 'Active', width: 90 ,renderCell: (params) => <IsActive key={params.row.id}  param={params.row} />,},
            { field: 'action', headerName: 'Action', width: 200, renderCell: (params) => <Action func={handleClick}  key={params.row.id} param={params.row} /> },
          ];
  
    return(
      <>
         <BreadCrumb breadcrumb="Source" breadcrumbItem1={"List"} />
  
       <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}> 
      
         <div style={{ height: 400, width: '100%' }}>
         <Button  type="button" style={{ backgroundColor: '#183883',width:"auto", marginBottom: "20px", marginLeft:"83%",color:"#fff"}} href="#exampleModalToggle1" data-bs-toggle="modal" size='large' >Create Source</Button>
     
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
      <Model  />
      <TagEdit isLoading={handleReload}  params={this.state.roleData}/>
  
        
      </>
    )
  
    
   }
    
}

function Action(props){ 
    // console.log("editprops=>",props)
    
    const editProductdata = (event)=>{
      props.func(props.param)
    }
  
  
       
    return(
        
      <>
      <Button type='button' data-bs-toggle="modal" size='small' href="#exampleModalToggle" onClick={editProductdata} >Edit</Button>&nbsp;
      
  
      </>
        
    );
  }

function IsActive(props){
const [state,setState]=useState(props.param)
const apiCtrl=new Api;
const deletestestimonialdata=(e)=>{
    console.log("event",e.target.checked?1:0)
    setState(old=>({...old,is_active:e.target.checked?1:0}))
    
    const data={
    
        is_active:e.target.checked?1:0,
        id:state.id
    }
//    console.log("productdeletedata",data)

const msg_1={
text_1:"Do you want to De-active",
//text_1:"",
text_3:" De-active ",
text_2:"Do you want to Active",

text_4:" Active "
}
var msg=""
var msg1=""
if(data.is_active===0){
msg= msg_1.text_1;
msg1=msg_1.text_3
}else{
msg= msg_1.text_2;
msg1=msg_1.text_4
}


    Swal.fire({
    title: 'Are you sure?',
    html: `${msg}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#00B96F',
    cancelButtonColor: '#d33',
    // confirmButtonText: 'Yes, De-Activated!',
    confirmButtonText: 'Yes',
    }).then((result) => {
    if (result.value) {
        apiCtrl.callAxios("tags/delete",data).then(response => {

        console.log("response=======>",response)

        if(response.success == true){
            Swal.fire({
                title:`Tag ${msg1}  Successfully!`,
            icon: "success",
            showConfirmButton: false,
            timer: 1200,
            });
            setTimeout(() => {
            Swal.close()
            //location.reload("/featured-list")
            
        }, 5000);
            
            } else {
                Swal.fire({
                title: `Tag ${msg1}  unsuccessfully!`,
                icon: "error",
                showConfirmButton: false,
                timer: 1200,
                });
                setTimeout(() => {
                Swal.close()
                
            }, 5000);
            }
            
        console.log('deleted res', response);

        
        });
    }
    // location.reload("/featured-list")
    
    });
    
    //  apiCtrl.callAxios(`testimonial/delete/${state.id}`,data).then(response => {

    //   console.log("res=>",response)
    //    if(response.success == true){
    //       location.reload("/testimonial-list")
    //      }//else {
    
    //   //      alert()
    //   //    }
        
    //  })
}


return(<>

    <div className="col-md-4 mb-4">
    {/* <FormControlLabel control={<Checkbox checked={state.is_active== "1"?true:false} onClick={deletesliderdata}  />} label={"Enable"} /> */}
    <Switch checked={state.is_active== "1"?true:false} onClick={deletestestimonialdata}   fullWidth /> 
    </div>
</>)
}

     
function Model(props){
    // var id=props.userid.id
    // console.log("id=====>",id)
   // console.log("propsinmodel----->",props)
   //console.log(props.eventid)
    return(
      <>
     
        <div className="modal fade" id="exampleModalToggle1" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
          <div className="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Create Source</h5>
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
              <Tag/>
  
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



class TagEdit  extends React.Component {
    constructor(props){
      super(props);
      this.apiCtrl = new Api;
      this.state = {
        is_active:"1",
       
      }
    }
  
   
  
    componentDidUpdate(prevProps,prevState){
      if(prevProps.params.id !== this.props.params.id){
       // console.log('Propps', this.props.params)
        this.setState(this.props.params)
      } 
      //console.log("props=>",this.props)
    }
  
    render(){
  
    const submitdata=(e)=>{
        e.preventDefault();

        const data={
            name:this.state.name,
            slug:this.state.slug,
            is_active:this.state.is_active,
            id:this.state.id
        }

      this.apiCtrl.callAxios("tags/create",data).then((response)=>{
            if(response.success == true){
                Swal.fire({
                    title: "Tag",
                    text: response.message,
                    icon: "success",
                    showConfirmButton: false,
                })
                  
                setTimeout(() => {
                  this.props.isLoading(true)
               
                    Swal.close()
                    
                }, 3000);
              // this.props.isLoading(true)
              // $('.close').trigger('click')
            } else {
                Swal.fire({
                    title: "Tag",
                    text: response.message,
                    icon: "error",
                    showConfirmButton: false,
                })
                setTimeout(() => {
                    Swal.close()
              }, 3000);
            }
        })
        
    }

   

    //console.log("props=>",props)


    return(<>
          
          
        <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered  modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="row ml-1" style={{ paddingTop: '2%'}}>
                            <label><b>Update Source</b></label>
                            
                        </div>
                        <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                
                    <div className="modal-body m-body">
                        
                        <div className="row">

                            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

                                <div className="row">

                                    <div className="col-md-4 mb-2">
                                        <MaterialTextField label="Name" value={this.state.name?this.state.name:""} name="name" fullWidth onChange={(e)=>this.setState(old=>({name:e.target.value}))}/>

                                    </div>

                                    <div className="col-md-4 mb-2">
                                        <MaterialTextField label="Slug" value={this.state.slug?this.state.slug:""} name="slug" fullWidth onChange={(e)=>this.setState(old=>({slug:e.target.value}))}/>

                                    </div>


                                

                                    {/* <div className="col-md-2 ">
                                        <SearchableInputTextfield name={"search"} onChange={handleChange} data={data} onKeyUp={filterFunction} />

                                    </div> */}

                                    
                                    <div className="col-md-4 mb-3">
                                    <Switch checked={this.state.is_active=="1"?true:false} onChange={(e)=>this.setState(old=>({is_active:e.target.checked?1:0}))}   fullWidth />                 
                                    { <strong> {"Active"} </strong>         }

                                    </div>

                                </div>

                                <Divider sx={{ borderColor: '#dac4c4', marginBottom:"3%"}} />
                                <div className='row'>
                                    <div className="col-md-12 d-flex justify-content-end">
                                        <Button style={{ backgroundColor: '#183883', color:"#ffff" }} onClick={ submitdata }>Update</Button>
                                    </div>
                                </div>
                            </Box>
                          </div>
                    </div>
                </div>
            </div>
        </div>

       
    </>)
    }
}