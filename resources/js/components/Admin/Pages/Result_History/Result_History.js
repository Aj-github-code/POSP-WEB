import React from "react";
import { Box } from '@mui/material';
import {TextField} from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import { DataGrid, renderActionsCell } from '@mui/x-data-grid';
import { Button } from "react-bootstrap";
import Api from "../../../../api";

export default class ResultHistory extends React.Component {
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

        }
        // this.getClaimList();
    }

    componentWillMount = () => {
        this.getClaimList();  
      }

 
    getClaimList = () => {
       
   
        this.setState(old => ({...old, isLoading:true}))
        var data = {length:this.state.pageSize, start:this.state.page*this.state.pageSize};

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
        if ((prevState.page !== this.state.page) || (prevState.filter !== this.state.filter)) {
            this.getClaimList();
        } 
      }



    render(){

      
      const handleModel = (data) => {
        this.setState({claimData:data})
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
            {field:'action',headerName:'Action',width:210 ,renderCell:(param)=><Action key={param.row.id} param={param.row}/>}
          ];

    

  return (
    <>
    <BreadCrumb breadcrumb="Result History" breadcrumbItem1='List' />

    <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

<div className="row mb-4" style={{marginTop:"66px"}}>
  <div className='col-md-6'></div>
  <div className='col-md-6' style={{display:'flex', justifyContent:"flex-end"}}>
    <span style={{marginTop: '5px'}}>Search:   </span>&nbsp;&nbsp;&nbsp;
  <TextField size="small" name='search' InputProps={{ style: {height:"37px", width:"130px"}}} onChange={(e)=>this.setState(old => ({...old, filter: e.target.value}))}/>
  </div>
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

    <ViewResult/>
    </Box>
    </>
  );
    }
}

function Action(){

    return(<>
            <Button  type="button"  style={{ backgroundColor: '#1F5B54',color:"#fff"}} data-bs-toggle="modal" size='small' href="#exampleModalToggle2" >View Result</Button>
    </>)
   
}


function ViewResult(props){
  
    return(
      <>
     
        <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
          <div className="modal-dialog modal-lg  modal-dialog-centered">
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
            <fieldset className="form-group border border-primary mb-2 p-3">
              <div className="row " >
                <legend className="col-form-label col-sm-2  pt-0" >  <h4 style={{ color: '#1F5B54'}}>{"Result:"}</h4></legend>
                  <div className="col-sm-9">
                    <div className="row">
  
                    <div class="wrapper" >
                    
                      <h4 style={{ color: '#1F5B54'}}>{"Heavy Vehicle Insurance"}</h4>
                      <p><span className="price">Name:<b>Test Agent</b></span></p>

                      <p>Date Of Exam: <strong>01/02/2023</strong></p>
                      <p>Time: <strong>O.5 Hours</strong></p>
                      <span className="price">Total Marks: <strong style={{ color: 'green'}}>60</strong>, Passing: <strong style={{color:'red'}}>25</strong></span><br/>
                      <span> Percentage: <strong style={{color:'red'}}>15%</strong></span><br/>
                      <span className="price"> Exam Result: <strong style={{ color: 'red'}}>  FAIL</strong></span>
                        
                    
   
  
  
                    </div>
  
                    </div> 
                  </div>  
              </div>                    
                                
            </fieldset>
                             
              
  
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
  
  