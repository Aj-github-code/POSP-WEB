import React from "react";
import { Box,Divider } from "@mui/material";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import MaterialTextField from "../../../../Tags/MaterialTextField";
import MaterialSelect from "../../../../Tags/MaterialSelect";
import MaterialButton from "../../../../Tags/MaterialButton";
import Button  from '@mui/material/Button';
import { useState } from "react";
import Api from "../../../../api";
import Swal from "sweetalert2";
const UserExcelUpload=()=>{

    const [state,setState]=useState({})
    const [downloadUrl,setDownloadUrl]=useState("")
    const apiCtrl=new Api

    const role ={
        "admin":"Admin",
        "posp":"Posp"

    }

    const uploaddata=(e)=>{

        e.preventDefault();

        const data=new FormData()

        Object.entries(state).map(([key,value])=>{
            data.append(`${key}`,value)
        })

        apiCtrl.callAxiosFile("upload-user-excel",data).then(response=>{

            if(response.success == true){
                setDownloadUrl(response.data)
                // console.log("ruldwnld=>",downloadUrl)
                Swal.fire({
                    title: "Excel",
                    text: response.message,
                    icon: "success",
                    showConfirmButton: false,
                })
                setTimeout(() => {
                    Swal.close(
                        
                    )
                
                }, 4000);
            } else {
                Swal.fire({
                    title: "Excel",
                    text: response.message,
                    icon: "error",
                    showConfirmButton: false,
                })
                setTimeout(() => {
                    Swal.close(
                        
                    )
                
                }, 4000);
            }

            
          }).catch(function (error) {
            console.log("Adduser===>",error);
        });

     


    }

    const URL = process.env.MIX_URL

    


    return(<>


        <BreadCrumb breadcrumb="Users" breadcrumbItem1={"User Excel Upload"} />

        <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

            <div className="row ml-1 mb-2">
                <label><b>User Excel Upload</b></label>
            </div>
            
            <div className="row">
                <div className="col-md-12">
                    <div className="row">

                        <div className="col-md-4 mb-2">

                         <MaterialTextField accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" type={"file"} label={"Excel Upload"} name="excel_file" fullWidth  onChange={(e)=>setState(old=>({...old,excel_file: e.target.files[0]}))}/>

                        </div>

                        <div className="col-md-4 mb-2">
                            <MaterialSelect data={role} value={state.role} label="Role"  name="role" onChange={(e)=>setState(old=>({...old,role: e.target.value}))} fullWidth />

                        </div>
                        <div className="col-md-4  mb-2">
                            <Button style={{ backgroundColor: '#1F5B54',color:"#fff" ,top:"9px"}} onClick={uploaddata}>Upload</Button>
                        </div>

                    </div>


                    <Divider className="mt-3" sx={{ borderColor: '#dac4c4'}} />
                            
                    
                    <div className="row ml-1 mb-3" style={{ paddingTop: '2%'}}>
                        <label><b> Upload User Data</b></label>
                    </div>
                    
                    <div className="row">
                        <div className="col-md-3 md-2">
                            <a href={`${URL}public/upload/excel/upload_posp_excel_format.xlsx`}>
                                <Button style={{ backgroundColor: '#1F5B54',color:"#ffff"}}
                                type="button">Upload Sample User Excel Format</Button>
                            </a>

                        </div>

                    </div>





                 
                    {downloadUrl!==""?
                        <>
                            <Divider className="mt-3" sx={{ borderColor: '#dac4c4'}} />
                            
                    
                            <div className="row ml-1 mb-3" style={{ paddingTop: '2%'}}>
                                <label><b> User Excel Download</b></label>
                            </div>
                            
                            <div className="row">
                                <div className="col-md-3 md-2">
                                    <a href={downloadUrl}>
                                        <Button style={{ backgroundColor: '#1F5B54',color:"#ffff"}}
                                        type="button">Download User Excel</Button>
                                    </a>

                                </div>

                            </div>
                        </>:""
                    }
                        

                </div>
               
              
            </div>

           


        </Box>




    </>)
    
}

export default UserExcelUpload