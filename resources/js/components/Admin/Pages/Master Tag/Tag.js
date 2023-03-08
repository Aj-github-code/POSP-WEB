import React from "react";

import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import MaterialTextField from "../../../../Tags/MaterialTextField";
import Button  from '@mui/material/Button';
import Switch from '@mui/material/Switch';

import { useState } from "react";
import Api from "../../../../api";
import Swal from "sweetalert2";
import { Box, Divider } from "@mui/material";
import { SearchableInputTextfield } from "../../../../Tags/SearchableInputField";



export const Tag=()=>{
    const [state,setState]=useState({
        is_active:1
    })
    const [val,setval]=useState()
    const apiCtrl=new Api

    const datas={
        "nikhil":"Nikhil",
        "ajay":"Ajay",
        "deepak":"Deepak",
    }

    const handlechange=(e)=>{
        console.log('Handle Change',e.target.value)
      setval(e.target.value)
    }

    const submitdata=(e)=>{
        e.preventDefault();

        const data={
            name:state.name,
            slug:state.slug,
            is_active:state.is_active
        }

      apiCtrl.callAxios("tags/create",data).then((response)=>{
            if(response.success == true){
                Swal.fire({
                    title: "Tag",
                    text: response.message,
                    icon: "success",
                    showConfirmButton: false,
                })
                setTimeout(() => {
                    Swal.close()
                    this.state({
                       
                    })
              }, 3000);
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

console.log("state=>",state)

    return(<>
          
          
     {/* <BreadCrumb breadcrumb="Tag" breadcrumbItem1='Create' /> */}
              
     <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

        <div className="row">

            <div className="col-md-4 mb-2">
                <MaterialTextField label="Name" name="name" fullWidth onChange={(e)=>setState(old=>({...old,name:e.target.value}))}/>

            </div>

            <div className="col-md-4 mb-2">
                <MaterialTextField label="Slug" name="slug" fullWidth onChange={(e)=>setState(old=>({...old,slug:e.target.value}))}/>

            </div>


          

            {/* <div className="col-md-2 ">
                <SearchableInputTextfield  name={"search"} value={val&&val}  data={datas}  onChange={handlechange} />

            </div> */}

            
            <div className="col-md-4 mb-3">
            <Switch checked={state.is_active=="1"?true:false} onChange={(e)=>setState(old=>({...old,is_active:e.target.checked?1:0}))}   fullWidth />                 
            { <strong> {"Active"} </strong>         }

            </div>

        </div>

        <Divider sx={{ borderColor: '#dac4c4', marginBottom:"3%"}} />
            <div className='row'>
                <div className="col-md-12 d-flex justify-content-end">
                    <Button style={{ backgroundColor: '#183883', color:"#ffff" }} onClick={ submitdata }>Submit</Button>
                </div>
            </div>
     </Box>

       
    </>)
}
