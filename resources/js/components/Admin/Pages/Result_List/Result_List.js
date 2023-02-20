import React from "react";
import { Box } from '@mui/material';
import {TextField} from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import { DataGrid, renderActionsCell } from '@mui/x-data-grid';
import MaterialSelect from "../../../../Tags/MaterialSelect";
import MaterialTextField from "../../../../Tags/MaterialTextField";
import { Button } from "react-bootstrap";
import Api from "../../../../api";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { param } from "jquery";


export default class ResultList extends React.Component {
    constructor(props){
        super(props);
        
        this.apiCtrl = new Api;
        this.state = {
            data : [],
            isLoading: false,
            page: 0,
            pageSize: 10,
            filter : null,
            claimData : null,
            statedata:[],
            citydata:[""]   ,

        }
        // this.getClaimList();
    }

    componentWillMount = () => {
        this.getClaimList();  
      }

 
    getClaimList = () => {
       
   
        this.setState(old => ({...old, isLoading:true}))
        var data = {state:this.state.state,city:this.state.city,length:this.state.pageSize, start:this.state.page*this.state.pageSize};

        if(this.state.filter !== null){
          data = {...data, filter: this.state.filter};
        }
        this.apiCtrl.callAxios('user-exam-result-list', data).then(response => {
           // console.log("response=>",response);
            
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
            // sessionStorage.setItem('_token', response.data.)
            
        }).catch(function (error) {
            this.setState(old => ({...old, isLoading:false}))
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
             
            })
        });
    }
    componentDidUpdate(prevProps, prevState){
        // console.log('update')
        if ((prevState.page !== this.state.page) || (prevState.filter !== this.state.filter)||(prevState.city !== this.state.city)||(prevState.state !== this.state.state)) {
            this.getClaimList();
        } 
      }



    render(){

      
      const handleModel = (data) => {
        this.setState({claimData:data})
      }

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
  
        const columns = [
            { field: 'id', headerName: 'ID', width: 100},
            { field: 'mobile', headerName: 'Mobile',  width: 120},
            { field: 'email', headerName: 'Email',  width: 120},
            { field: 'exam_code', headerName: 'Exam Code',  width: 190},
            { field: 'campaign_code', headerName: 'Campaign Code',  width: 100},
            { field: 'status', headerName: 'PASS/FAIL',  width: 190},
            { field: 'marks', headerName: 'Obtained Marks',  width: 190},
            // { field: 'action', headerName: 'Action',  width: 210,  renderCell: (params) => <Action key={params.row.id}  param={params.row} />, },
           // {field:'action',headerName:'Action',width:210 ,renderCell:(param)=><Action key={param.row.id} param={param.row}/>}
          ];

    

  return (
    <>
    <BreadCrumb breadcrumb="Result" breadcrumbItem1='Result List' />

    <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

<div className="row mb-4">
      <div className="col-md-1"></div>
      <div className='col-md-3'>
      <MaterialSelect value={this.state.state?this.state.state:""}
        onMouseEnter={()=>{getstatedata()}}       
        data={this.state.statedata}  id="state_id" labelId="state" name="state"
    
        onChange={(e)=>{handlechang(e )}}   label="State *" fullWidth
      
      />

      </div>
      <div className='col-md-3'>
      <MaterialSelect   value={this.state.city?this.state.city:""} 
        data={this.state.citydata}  id="city_id" labelId="city-id" 
        name="city"    onChange={(e)=>this.setState({city : e.target.value})}
        
        label="City *" fullWidth
      />
           

      </div>
      <div className='col-md-3'>
         <MaterialTextField 
           label={"Search"} size="large" 
           fullWidth name='search'onChange={(e)=>this.setState(old => ({...old, filter: e.target.value}))}/>

      </div>
      <div className="col-md-1"></div>
  {/* <div className='col-md-6' style={{display:'flex', justifyContent:"flex-end"}}>
    <span style={{marginTop: '5px'}}>Search:   </span>&nbsp;&nbsp;&nbsp;
  <TextField size="small" name='search' InputProps={{ style: {height:"37px", width:"130px"}}} onChange={(e)=>this.setState(old => ({...old, filter: e.target.value}))}/>
  </div> */}
</div>
    <div style={{ height: 650, width: '100%' }}>
   
      <DataGrid
        sx={{width:"100%", overflowX:"auto"}}
        autoHeight
        rows={this.state.data}
        rowCount={this.state.total}
        page={this.state.page}
        
        loading={this.state.isLoading}
        columns={columns}
        pagination
        // paginationMode='server'

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
    </Box>
    </>
  );
    }
}

function Action(props){ 
  
 console.log("viewrslt=>",props.param)
    return(
  
      <>
      <Button type='button'  style={{backgroundColor:"#1F5B54"}}  key={props.key} size='small' >View Exam Result</Button>
      
  
      </>
        
    );
  }


  