import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import { Button } from 'react-bootstrap';
import MaterialTextField from '../../../../Tags/MaterialTextField'
import Swal from 'sweetalert2';
import Api from '../../../../api';
//import ProductAdd  from './Product';
import ProductAdd  from './Product'




export default class ProductList extends React.Component {
  constructor(props){
    super(props)
    this.apiCtrl = new Api;

    this.state = {
      data : [],
      isLoading: false,
      page: 0,
      pageSize: 10,
      productData:[]

  }

  }

  componentWillMount = () => {
    this.getProductList();
  }

  getProductList = () =>{

    this.setState(old => ({...old, isLoading:true}))
    this.apiCtrl.callAxios('product/list').then(response => {
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

  componentDidUpdate(prevProps, prevState){
    // console.log('update')
    if (prevState.page !== this.state.page) {
        this.getProductList();
    }
  }

  render() {


    const  handleClick = (data) => {
      // console.log("dataproduct===",data)
       this.setState({productData: data})
     }

    const columns = [
      { field: 'id', headerName: 'ID', width: 100 },
      { field: 'product', headerName: 'Product', width: 190 },
      { field: 'product_code', headerName: 'Product Code', width: 190 },
      { field: 'slug', headerName: 'Slug', width: 150 },
      { field: 'base_price', headerName: 'Base Price', width: 100 },
      { field: 'gst', headerName: 'GST', width: 150 },
      { field: 'action', headerName: 'Action',  width: 190,  renderCell: (params) => <Action fun={handleClick} param={params.row} />, },
    ];


  return (
    <>
    <BreadCrumb breadcrumb="Product List" />
    <Button  type="button" style={{ backgroundColor: '#183883',width:"139px", marginBottom: "20px", marginLeft:"47rem",color:"#fff"}} href="#exampleModalToggle" data-bs-toggle="modal" size='large' >Add product</Button>
    <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

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

     <Model params={this.state.productData}/>
    </Box>
    </>
  );
}
}
function Action(props){ 
  
  const editProductdata = (event)=>{
    props.fun(props.param)
  }

  const deleteProductdata=(event)=>{
    const data={
      id:event.id,
      is_active:event.is_active
    }
    console.log("productdeletedata",data)

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
        apiCtrl.callAxios("product/delete-product", data).then(response => {
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

       
        });
      }
    });
  }
     
  return(

    <>
    <Button type='button' data-bs-toggle="modal" size='small' href="#exampleModalToggle" onClick={editProductdata} >Edit</Button>&nbsp;
      <Button type='button'  size='small'  onClick={deleteProductdata} >Delete</Button>

    </>
      
  );
}

function Model(props){

  // console.log( "modelprops==>",props)
 
  return(
    <>
   
      <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered  modal-lg">
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
            
            <ProductAdd data={props.params}    />

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


