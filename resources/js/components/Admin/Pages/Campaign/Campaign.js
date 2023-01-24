import React from "react";
import Api from "../../../../api";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

import MaterialSelect from '../../../../Tags/MaterialSelect'
import { Button } from 'react-bootstrap';
import MaterialTextField from "../../../../Tags/MaterialTextField";
import { width } from "@mui/system";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
export default class Qna extends React.Component {

    constructor(props){
        super(props);
        this.apiCtrl = new Api;

        this.state = {
            data : [],
            isLoading: false,
            page: 0,
            pageSize: 10,
            questiontData:[],
           // selectdata:{}
           is_active:""
        }
    }

    componentWillMount = () => {
        this. getCampaignList();
    }

    getCampaignList = () =>{
        var data = {length:this.state.pageSize, start:this.state.page*this.state.pageSize};
     

        this.setState(old => ({...old, isLoading:true}))
        this.apiCtrl.callAxios("campaign-list",).then(response => {
            console.log("campaigndata==>",response);
            
            if(response.success == true){
                this.setState(old => ({...old, data:response.data.aaData, total:response.data.iTotalRecord}))
    
            } else {
            alert("No Data Available")
            }
            this.setState(old => ({...old, isLoading:false}))
         
            
        }).catch(function (error) {
            this.setState(old => ({...old, isLoading:false}))
            // console.log(error);
        });
      }


    render(){

        
       
      
        const columns = [
            { field: 'sr_no', headerName: 'Sr no', width: 100 },
            { field: 'campaign_code', headerName: 'Campaign Code', width: 190 },
            { field: 'type', headerName: 'Type', width: 150 }, 
            { field: 'other_parameter', headerName: 'Other Parameter', width: 150 },      
            { field: 'action', headerName: 'Action',  width: 190  }
        ];

 
        


        return(
            <>
               <BreadCrumb breadcrumb="Roles" breadcrumbItem1='Create' />
             <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
              
              <div className="row">
               
                {/* <div className="col-md-4 mb-3">
                <Button  type="button"  style={{ backgroundColor: '#183883',width:" 159px",marginBottom:"20px",fontSize: "small", marginLeft:"27rem",color:"#fff"}}  data-bs-toggle="modal" size='small' href="#exampleModalToggle" >Create Qna</Button>
             
                </div> */}
               

              </div>
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

                />
               
             </div>
            
             </Box>

            </>
          )
    }


}