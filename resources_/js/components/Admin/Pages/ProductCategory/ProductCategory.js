import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { DataGrid } from '@mui/x-data-grid';
import MaterialButton from '../../../../Tags/MaterialButton'
import { Button } from 'react-bootstrap';
import MaterialTextField from '../../../../Tags/MaterialTextField'
import MaterialSelect from '../../../../Tags/MaterialSelect'
import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';





import Api from '../../../../api';
import Swal from "sweetalert2";


import { ErrorMessage } from "@hookform/error-message";
import { event } from "jquery";


class ProductCategory extends React.Component {

    constructor(props){
        super(props);

        this.state = 
        {

              id:this.props.data.id?this.props.data.id:"",

              // category_name:this.props.data.category_name?this.props.data.category_name:"",
              // description:this.props.data.description?this.props.data.description:"",
              // hsn_code:this.props.data.hsn_code?this.props.data.hsn_code:"",
              // gst:this.props.data.gst?this.props.data.gst:"",
              // is_service:this.props.data.is_service?this.props.data.is_service:"",
              // is_parent:this.props.data.is_parent?this.props.data.is_parent:"",

             
             
        

        }


        this.apiCtrl = new Api;

      

    }

    componentDidUpdate(prevProps,prevState){
      if(prevProps.data.id !== this.props.data.id){
        console.log('Propps', this.props.data)
        this.setState(this.props.data)
      } 
    }

      // componentDidUpdate(prevProps,prevState){
      //   if(prevProps.data.id !== this.props.data.id){
      //     console.log('Propps', this.props.data)
      //     this.setState(this.props.data)
      //   } 
    

      // }
    
  
     
        

        render(){

           
            const prosumbmit = async (e) => {
               
                e.preventDefault();


              
     
                
                var data = {
                    

                    category_name:this.state.category_name,
                    description:this.state.description,
                    hsn_code:this.state.hsn_code,
                    gst:this.state.gst,
                    is_service:this.state.isservice,
                    is_parent:this.state.isparent,
                    slug:this.props.data.slug
                
                }

       

          
                 console.log(data);
                // return;
                if(this.props.data.id){


                  this.apiCtrl.callAxios("product/create-product-category", data).then(response => {
                   
                    if(response.success == true){
                        Swal.fire({
                            title: "Product Category",
                            text: "Updated!",
                            icon: "success",
                            showConfirmButton: false,
                        })
                    } else {
                        Swal.fire({
                            title: "Product Category",
                            text: "Not Updated!",
                            icon: "error",
                            showConfirmButton: false,
                        })
                    }
                  

                    // if(response.success == true){
                      
                    // }


                    console.log(" CategoryUpdate===>",response);
                    // sessionStorage.setItem('_token', response.data.)
                    
                  }).catch(function (error) {
                    console.log(error);
                  });

                }else{
                  this.apiCtrl.callAxios('product/create-product-category', data).then(response => {
                   
                    if(response.success == true){
                        Swal.fire({
                            title: "Product Category",
                            text: "Created!",
                            icon: "success",
                            showConfirmButton: false,
                        })
                    } else {
                        Swal.fire({
                            title: "Product Category",
                            text: "Not Created!",
                            icon: "error",
                            showConfirmButton: false,
                        })
                    }
                  
                    console.log("CategoryCreate===>",response);
                    // sessionStorage.setItem('_token', response.data.)
                    
                  }).catch(function (error) {
                    console.log(error);
                  });
             
                }



                  
              } 

              console.log("productdataprps--",this.props)
               
              console.log("this State--",this.state)
               
            return(
                <>
                 {/* <BreadCrumb breadcrumb="Roles" breadcrumbItem1='Create' /> */}
              
              <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
  
              <div className="row ml-1">
                  <label><b>ProductCategory</b></label>
              </div>

              <Divider sx={{ borderColor: '#dac4c4'}}    />


           
             <div className="row mb-4">

               <div className="col-md-6 ">
               
               <MaterialTextField  value={this.state.category_name?this.state.category_name:""}  name="category_name" onChange={(e)=>this.setState({category_name : e.target.value})} label="category Name"  fullWidth  />
               

               </div>

               <div className="col-md-6">
               
               <MaterialTextField  value={this.state.description?this.state.description:""}   name="description" onChange={(e)=>this.setState({description : e.target.value})} label="Description"  fullWidth  />
               

               </div>
             </div>

             <div className="row ">

               <div className="col-md-6 mb-2">
               
               <MaterialTextField  value={this.state.hsn_code?this.state.hsn_code:""}  name="hsn_code" onChange={(e)=>this.setState({hsn_code : e.target.value})} label="Hsn Code"  fullWidth  />
               

               </div>

               <div className="col-md-6 ">
               
               <MaterialTextField  value={this.state.gst?this.state.gst:""}   name="gst"  onChange={(e)=>this.setState({gst : e.target.value})} label="Gst"  fullWidth  />
               

               </div>
             </div>


             <div className="row">
                <div className="col-md-6">
                <FormControlLabel control={<Checkbox checked={this.state.is_service?this.state.is_service:""}   onChange={(e)=>this.setState({is_service:e.target.checked?1:0})}/>} label="Is Service" />
                    
                 </div>
                <div className="col-md-6">
                <FormControlLabel control={<Checkbox checked={this.state.is_parent?this.state.is_parent:""}   onChange={(e)=>this.setState({is_parent:e.target.checked?1:0})}/>} label="Is Parent" />
                    
                </div>
             </div>
           
             
            <div className="row mt-2">
                <div className="col-md-12 d-flex " style={{justifyContent:"right"}}>

                  
                    <MaterialButton style={{ backgroundColor: '#183883' , border: '1px solid #183883',height:55}} name="Submit" text="Add"  onClick={prosumbmit} />

                    
                </div>
            </div>

           
            
             </Box>
                </>
            )
        }
}







class ProductCategoryList extends React.Component{

    constructor(props){
        super(props);

        this.state = 
        {
          
            data : [],
            isLoading: false,
            page: 0,
            pageSize: 10,
            productCategoryData:[],
        }


        this.apiCtrl = new Api;

     
    }

    componentWillMount = () => {
        this.getProductcategoryList();
    }

    getProductcategoryList = () =>{

        this.setState(old => ({...old, isLoading:true}))
        this.apiCtrl.callAxios('product/product-category-list').then(response => {
            console.log(response);
            
            if(response.success == true){
                this.setState(old => ({...old, data:response.data, total:response.data.iTotalRecords}))
    
            } else {
            alert("No Data Available")
            }
            this.setState(old => ({...old, isLoading:false}))
            // sessionStorage.setItem('_token', response.data.)
            
        }).catch(function (error) {
            this.setState(old => ({...old, isLoading:false}))
            console.log(error);
        });
      }

    render(){
        
      const  handleClick = (data) => {
       // console.log("dataproduct===",data)
        this.setState({productCategoryData: data})
      }

      const handleAddCategory = () => {
        this.setState({productCategoryData: {}})
      }

        const columns = [
            { field: 'id', headerName: 'ID', width: 100 },
            { field: 'category_name', headerName: 'Category Name', width: 190 },
            { field: 'hsn_code', headerName: 'HSN Code', width: 190 },
            { field: 'description', headerName: 'Description', width: 150 },
            { field: 'is_service', headerName: 'Is Service', width: 150 },
            { field: 'action', headerName: 'Action',  width: 190,  renderCell: (params) => <Editbutton fun={handleClick}  key={params.row.id} param={params.row} />, },
            
          ];

        return (
            <>
           <BreadCrumb breadcrumb="Roles" breadcrumbItem1='Create' />
              
              <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
              <Button  type="button" onClick={handleAddCategory} style={{ backgroundColor: '#183883',width:" 159px",marginBottom:"20px",fontSize: "small", marginLeft:"47rem",color:"#fff"}} href="#exampleModalToggle" data-bs-toggle="modal" size='large' >Add ProductCategory</Button>
            <div style={{ height: '100%', width: '100%' }}>
           
            <DataGrid
                autoHeight
                rows={this.state.data}
                rowCount={this.state.total}
                page={this.state.page}
                
                loading={this.state.isLoading}
                columns={columns}
                pagination
        
                pageSize={this.state.pageSize}
                rowsPerPageOptions={[10, 30, 50, 70, 100]}
                checkboxSelection
        
                />
               
            </div>
            </Box>
            < Model  params={this.state.productCategoryData}/>
          
            
            </>
          );
        
    }

}


export default  ProductCategoryList
// function Editbutton(props){ 
//     return(
//         <Button id={props.param.id} >Edit</Button>
  
//     );
// }


function Editbutton(props){ 
//  apiCtrl = new Api;
const  apiCtrl = new Api;

  const editProductcatdata = (event)=>{
  props.fun(props.param)
  
   
   
 }

 const deleteproductcategory=(event)=>{
    const  data={
      id:event.id,
      is_active:event.is_active
    }
    // data.push({})
    console.log("data",data)


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
        apiCtrl.callAxios("product/delete-product-category", data).then(response => {
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
              } else {
                Swal.fire({
                  title: 'Deleted unsuccessfully!',
                  icon: "error",
                  showConfirmButton: false,
                  timer: 1200,
                });
              }
            
          console.log('deleted res', response);

         // this.getAllproduct();
        });
      }
    });


 }
 
 return (  
   <>

            <Button  type="button"  data-bs-toggle="modal" size='small' href="#exampleModalToggle" onClick={editProductcatdata}>Edit</Button>&nbsp;&nbsp;
            <Button  type="button"  size='small' onClick={()=>deleteproductcategory(props.param)}>Delete</Button>
          
          
</>
                    

);



}




function Model(props){

    console.log( "model-->",props)
    
    return(
      <>
     
        <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
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
            <ProductCategory data={props.params}   />
  
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



