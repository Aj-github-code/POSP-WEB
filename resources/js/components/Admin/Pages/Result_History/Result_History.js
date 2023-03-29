
import React,{useEffect,useRef,useState} from 'react';
import { Box,Divider} from '@mui/material';
import {TextField} from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import { DataGrid, renderActionsCell } from '@mui/x-data-grid';
import { Button } from "react-bootstrap";

import Api from "../../../../api";

import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import { Loader } from "../../../Loader/Loader";
import { useReactToPrint } from "react-to-print";
import { Table } from 'react-bootstrap'


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
          examData :[],

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
        this.setState({examData:data})
      }
        const columns = [
            { field: 'id', headerName: 'Sr.No', width: 100},
            { field: 'name', headerName: 'Name',  width: 120},
            { field: 'email', headerName: 'Email',  width: 120},
            { field: 'status', headerName: 'PASS/FAIL',  width: 100},
            {field:"created_at",headerName:'Exam Date',width:120},
            { field: 'exam_code', headerName: 'Exam Code',  width: 190},
            {field:'action',headerName:'Action',width:210 ,renderCell:(param)=><Action func={handleModel} key={param.row.id} param={param.row}/>}
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

    <ViewResult  param={this.state.examData}/>
    </Box>
    
    </>
  );
    }
}

function Action(props){

  const examdata=()=>{
     props.func(props.param)
    //console.log("evenr=>",event)
  }


    return(<>
            <Button  type="button"  style={{ backgroundColor: '#1F5B54',color:"#fff"}} data-bs-toggle="modal" size='small' href="#exampleModalToggle3" onClick={examdata} >View Result</Button>
    </>)
   
}







export const ViewResult=(props)=>{
  const [state,setState]=useState({
    status:"",
    isLoading:true,
    datetime:"",
    campaign:{title:''},
    system_settings:{},
    roles:{}
  })

  // const [reload, setReload] = React

  const apiCtrl=new Api
  // if((props.param!==null) && (typeof props.param !== 'undefined')){
  //   setReload(true);
  // }
  useEffect(()=>{
    
      if((props.param!==null) && (typeof props.param !== 'undefined')){
                 setState(({isLoading:true}))
                //console.log("props=>",props)
      
                const data={
                    exam_code:props.param.exam_code,
                    user_id:props.param.id
                  }
        
            
            apiCtrl.callAxios("userexamdetail",data).then(response => {
              //  location.reload('/user-list')
  
              if(response.data.length > 0){
                  console.log("res=>",response)
                  // setState(old=>({isLoading:false}))
                  Object.entries(response.data).map(([index,value])=>{
      
                      //  console.log("value=>",value)
                      var date1 = new Date(value.campaign.created_at);
                      var dateTime = moment.utc(date1).format("DD-MMM-YYYY HH:mm:ss");
                        setState(old=>({...old, ...value.campaign.other_parameter,status:value.status,datetime:dateTime,isLoading:false}))
                    })

                    // console.log("state=>",state)
                  }else{
        
        
                      setState({
                          status:"", 
                          datetime:"",
                          isLoading:false,
                          campaign:{},
                          system_settings:{},
                          roles:{}
                        })
                      }
                    })
                  } 
          
          },[props])
          // console.log('props',props, 'State', state)
          // return(<></>);
          const componentRef = useRef();

          const handlePrint = useReactToPrint({
            content: () => componentRef.current,
          });
          const loderactive =()=>{
            setState({isLoading:true})
          }

          console.log("state=>",state)
  return(<>

    <div className="modal fade" id="exampleModalToggle3" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
          <div className="modal-dialog  modal-lg modal-dialog-centered">
          
              <div className="modal-content">
                {!state.isLoading?
                <>
                  
                  {state.status!==""?<>

                    <div className="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle"> <h4 style={{ color: '#1F5B54'}}>{"Result:"} {state.campaign.title}</h4></h5>
                        <div className="row ml-1" style={{ paddingTop: '2%'}}>
                            {/* <label><b>{props.params.any} Details</b></label> */}
                        </div>
                        {/* <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close"> */}
                        <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close" onClick={loderactive}>

                          <span aria-hidden="true">&times;</span>
                        </button>
                    </div>


                    <div className="modal-body m-body">

                    <Table ref={componentRef} className="table table-hover ">
                      <tbody>
                        <tr>
                          <th>Sr.No</th>
                          <td>1</td>
                        </tr>
                        <tr>
                          <th className="thead-light" scope="col">Name</th>
                          <td>{props.param.name}</td>
                        </tr>
                        <tr>
                          <th scope="col">Time</th>
                          <td>{state.system_settings.exam_time.split(':').reduce((acc,time) => (60 * acc) + +time)/(60 * 60)} Hours</td>
                        </tr>
                        <tr>
                          <th scope="col">Total Marks</th>
                            <td><strong style={{ color: 'green'}}>{state.system_settings.total_marks}</strong></td>
                        
                        </tr>
                        <tr>
                          <th scope="col">Passing</th>
                          <td> <strong style={{color:'red'}}>{state.system_settings.passing_marks}</strong></td>
                        
                        </tr>
                        <tr>
                        <th scope="col">Date Of Test & Time</th>
                          <td>{state.datetime}</td>
                        </tr>
                        <tr>
                          <th scope="col">Percentage</th>
                          <td><strong style={{color:'red'}}>15%</strong></td>
                        </tr>
                        <tr>
                          <th scope="col">Exam Result</th>
                          <td><strong style={{ color: 'red'}}>{state.status}</strong></td>
                        </tr>
                      </tbody>
                    </Table>


                  {/* <table className="table table-hover ">
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Sr.No</th>
                          <th scope="col">Name</th>
                          <th scope="col">Time</th>
                          <th scope="col">Total Marks</th>
                          <th scope="col">Passing</th>
                          <th scope="col">Date Of Test & Time</th>
                          <th scope="col">Percentage</th>
                          <th scope="col">Exam Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>{props.param.name}</td>
                          <td>{this.state.system_settings.exam_time.split(':').reduce((acc,time) => (60 * acc) + +time)/(60 * 60)} Hours</td>
                          <td>{this.state.system_settings.total_marks}</td>
                          <td> <strong style={{color:'red'}}>{this.state.system_settings.passing_marks}</strong></td>
                          <td>{this.state.datetime}</td>
                          <td><strong style={{color:'red'}}>15%</strong></td>
                          <td><strong style={{ color: 'red'}}>{this.state.status}</strong></td>
                        </tr>
                  
                      </tbody>
                    </table> */}



                    {/* <div className="row">
                        <fieldset className="form-group mb-2 p-3">
                          <div className="row " >  
                            <legend className="col-form-label" >  <h6 style={{ color: '#1F5B54'}}>{"Exam Details:"}</h6></legend>      
                                                      
                                <p style={{marginBottom:"0%"}}><span className="price">Name:<b>{this.props.param.name}</b></span></p>
                                <p style={{marginBottom:"0%"}}>Time: <strong>{this.state.system_settings.exam_time.split(':').reduce((acc,time) => (60 * acc) + +time)/(60 * 60)} Hours</strong></p>
                              
                                <span className="price">Total Marks: <strong style={{ color: 'green'}}>{this.state.system_settings.total_marks}</strong>, Passing: <strong style={{color:'red'}}>{this.state.system_settings.passing_marks}</strong></span><br/>   
                                <p style={{marginBottom:"0%",fontSize: "80%"}}>Date Of Test & Time: <b>{this.state.datetime}</b></p>

                                    
                              
                                
            
                              
                          </div>  
                          <Divider sx={{ borderColor: '#dac4c4'}} className="mb-3"/> 
                          <div className="row " >
                        
                          <legend className="col-form-label   pt-0" >  <h6 style={{ color: '#1F5B54'}}>{"Result Details:"}</h6></legend>      
                                      <span> Percentage: <strong style={{color:'red'}}>15%</strong></span><br/> 
                                    <span className="price"> Exam Result: <strong style={{ color: 'red'}}>{this.state.status}</strong></span>
                                                        
                                
                                
            
                              
                          </div>                 
                                          
                        </fieldset>
                    </div> */}
                  
                    </div>

                    <div className="modal-footer">

                      <Link to={"/examans-list"}>
                        <button type="button" className="btn btn-outline-secondary close"   data-bs-dismiss="modal" data-dismiss="modal" aria-label="Close">View Answer</button>
                      </Link>
                      <button onClick={handlePrint} className="btn btn-primary" >Print</button>

                      {/* <button type="button" class="btn btn-outline-secondary">Dawnload</button> */}
                                
                  

                    </div>

                    </>:<p className="d-flex justify-content-center" style={{marginTop: "10%"}}>Result Not Available</p>
                  } 
                </>:<Loader/>
                }


            
        


            
              </div>
          
          </div>
    </div>


   
  </>)
}


// export function (props){

//   // console.log('Ref current', componentRef.current)
//   return (
//     <div>
//       <Report ref={componentRef} {...props} />
//     </div>
//   )
// }



  
  