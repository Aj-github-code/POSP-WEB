import React from "react";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import Api from "../../../../api";
import { Box, Divider,TextField } from "@mui/material";
import MaterialTextField from "../../../../Tags/MaterialTextField";
import { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios"
import Swal from "sweetalert2";


export const ExcelUpload=()=>{
    const [file,setFile]=useState()
    const apiCtrl=new Api

    function handleChange(e) {
       
        setFile({selectedFile:e.target.files[0]})

      }
      

     const submit= async (e)=>{
        e.preventDefault();
        console.log("file=>",file)

        const formData = new FormData();
        // formData.append('excel_file', file);
           formData.append("excel_file", file.selectedFile, file.selectedFile.name);
        var config = {
            method: 'post',
            url: "https://online-exam.primarykeytech.in/api/api/upload-excel-campaign",
            headers: { 
             'Content-Type': 'multipart/form-data;boundary=SOME_BOUNDARY',
              'Authorization': 'Bearer '+localStorage.getItem('_token')
             
            },
            data:formData
          };
      
        
       
       let response=  axios(config)
       if(response.success == true){
           console.log("response=>",response)
           Swal.fire({
            title: "Excel",
            text: "Upload Successfully",
            icon: "success",
            showConfirmButton: false,
        })

        } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        
        })
        }
     
       
        
         
     
   

    // apiCtrl.callAxios("upload-excel-campaign", formData).then(response => {
    //     console.log("response=>",response)
    // })





     }


    
    
    
    return(<>

        <BreadCrumb breadcrumb="Excel Upload"  />
            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
                    <div className="row ml-1">
                        <label><b>Excel Upload</b></label>
                    </div>
                    <Divider sx={{ borderColor: '#dac4c4',marginBottom:5}}    />
            <form onSubmit={submit}>
                <div className="row mt-4 mb-2">
                 
                    <div className="col-md-4">
                    <MaterialTextField  size="small"  type="file" fullWidth  name="excel_file" label="Excel File" onChange={handleChange}  />

                    </div>

                    <div className="col-md-3">
                            {/* <Button style={{ backgroundColor: '#183883'}} type="submit">Submit</Button> */}
                            <Button style={{ backgroundColor: '#1F5B54'}} type="submit">Submit</Button>
                        </div>
                       

                </div>
                <div className="row mt-4">
                    <div className="col-md-3">
                            {/* <Button style={{ backgroundColor: '#183883'}} type="submit">Submit</Button> */}
                           <a href={'https://online-exam.primarykeytech.in/api/public/upload/excel/Courses.xlsx'}> <Button style={{ backgroundColor: '#1F5B54'}}  type="button">Download Course Excel Format</Button></a>
                        </div>

                        <div className="col-md-3">
                            {/* <Button style={{ backgroundColor: '#183883'}} type="submit">Submit</Button> */}
                            <a href={'https://online-exam.primarykeytech.in/api/public/upload/excel/ExamsExcel.xlsx'}>  <Button style={{ backgroundColor: '#1F5B54'}} type="button">Download Exam Excel Format</Button></a>
                        </div>
                </div>

            </form>
            
        </Box>
    </>)
}