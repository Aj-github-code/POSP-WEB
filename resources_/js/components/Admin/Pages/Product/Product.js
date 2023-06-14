import React, {useState, useEffect} from 'react'
import Button  from '@mui/material/Button';
import MaterialTextField from '../../../../Tags/MaterialTextField'
import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import Api from '../../../../api';
import { useParams } from 'react-router-dom';
import { idID } from '@mui/material/locale';

import Swal from "sweetalert2";

import MaterialSelect from '../../../../Tags/MaterialSelect';


 export default class ProductAdd extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      btnVariant : "contained",
      product : null,
      base_price : null,
      description : null,
      gst : null,
      data: [],
      product_type:"",
      product_category_id: '',
    }
    this.apiCtrl = new Api;
    
  }
  // componentDidMount(){
  //   this.apiCtrl.callAxios('product/get-product-category').then(res => {
  //   // const array={}
  //    this.setState({data: res.data});
    
  //       console.log(this.state.data)
  //     })

  //   }


  // componentDidUpdate(prevProps,prevState){
  //   if(prevProps.data.id !== this.props.data.id){
  //     console.log('Propps', this.props.data)
  //     this.setState(this.props.data)
  //   } 
  // }

  componentDidUpdate(prevProps,prevState){
    if(prevProps.data.id !== this.props.data.id){
    this.apiCtrl.callAxios('product/get-product-category').then(res => {
    // const array={}
     this.setState({data: res.data});
    
        // console.log(this.state.data)
      })
    }
  }

    componentDidUpdate(prevProps,prevState){

      // console.log("prevProps-->",prevProps)
      // console.log("prevState-->",prevState)

      if (prevProps.data.id !== this.props.data.id)  {
     
      

        this.setState(this.props.data)
         

      
      }
    }
  render(){
    const product={
     '1' :'Product',
      '2':'service'
      
    };

    // console.log("URL : "+process.env.MIX_API_URL);
    // alert(process.env.MIX_API_URL);
    const submituser= async (e) => {
      e.preventDefault();
        var data = {product: this.state.product,
                    base_price: this.state.base_price,
                    description: this.state.description,
                    gst: this.state.gst,
                  
                  
                    product_type: this.state.product_type,
                    product_category_id:  this.state.product_category_id,

                }


                if(this.props.data.id){
                  this.apiCtrl.callAxios(`/product/create-product/update`, this.props.data.slug).then(response => {
        
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
                      // console.log("Updateproduct===>",response);
                      // sessionStorage.setItem('_token', response.data.)
                      
                    }).catch(function (error) {
                      // console.log("Updateuser===>",error);
                    });
              }else{
                this.apiCtrl.callAxios('product/create-product', data).then(response => {
                  location.reload('/product/product-list')
                      if(response.success == true){
                          Swal.fire({
                              title: "Product",
                              text: "Created",
                              icon: "success",
                              showConfirmButton: false,
                          })
                      } else {
                          Swal.fire({
                              title: "Product",
                              text: "Not Created!",
                              icon: "error",
                              showConfirmButton: false,
                          })
                      }
        
        
                      location.reload('/')
                      // console.log("Product===>",response);
                      // sessionStorage.setItem('_token', response.data.)
                      
                    }).catch(function (error) {
                      // console.log("product===>",error);
                    });
              }


        // this.apiCtrl.callAxios('product/create-product', data).then(response => {
        //   //  location.reload('/user-list')

        //   if(response.success == true){
        //     Swal.fire({
        //         title: "Create Product",
        //         text: "Created!",
        //         icon: "success",
        //         showConfirmButton: false,
        //     })
        // } else {
        //     Swal.fire({
        //         title: "Create Product",
        //         text: "Not Created!",
        //         icon: "error",
        //         showConfirmButton: false,
        //     })
        // }
        //     console.log("===>",response);
          
        // }).catch(function (error) {
        //   console.log(error);
        // });
    } 

 
    return (
      <>

        {/* <BreadCrumb breadcrumb="Product" breadcrumbItem1='Create' /> */}

        <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

        <div className="row ml-1">
            <label><b>Add Product</b></label>
        </div>

        <Divider sx={{ borderColor: '#dac4c4'}} />

        <div className="row ">

             <div className='col-md-4'>
              
              <MaterialSelect value={this.state.product_category_id?this.state.product_category_id: ''} onChange={(e)=>this.setState({product_category_id : e.target.value})}     data={this.state.data}  id="product_category_id" labelId="product-category-id" name="product_category_id"  label="Product Category " fullWidth/>
              </div>

              <div className='col-md-4'>
              
              <MaterialSelect value={this.state.product_type?this.state.product_type: ''} onChange={(e)=>this.setState({product_type : e.target.value})}    data={product}  id="product_type" labelId="product-type" name="product_type"  label="Product Type" fullWidth/>
              </div>


            <div className="col-md-4 mb-4">
                <MaterialTextField label="Product *"  value={this.state.product?this.state.product:""} fullWidth name='product' onChange={(e)=>this.setState({product : e.target.value})}/>
            </div>
            <div className="col-md-4 mb-4">
                <MaterialTextField label="Base Price *" value={this.state.base_price?this.state.base_price:""} fullWidth name='base_price' onChange={(e)=>this.setState({base_price : e.target.value})}/>
            </div>
            <div className="col-md-4 mb-4">
                <MaterialTextField label="Description *" value={this.state.description?this.state.description:""}  fullWidth name='description' onChange={(e)=>this.setState({description : e.target.value})}/>
            </div>
            <div className="col-md-4 mb-4">
                <MaterialTextField label="GST *" value={this.state.gst?this.state.gst:""}  fullWidth name='gst' onChange={(e)=>this.setState({gst : e.target.value})}/>
            </div>
            
         
        </div>

        <div className='row'>
            <div className="col-md-3">
                <Button style={{ backgroundColor: '#183883' }} onClick={ submituser }>Submit</Button>
            </div>
        </div>
        </Box>

      </>
    )
  }
} 
