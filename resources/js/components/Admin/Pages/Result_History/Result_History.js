import React from "react";
import { Box } from '@mui/material';
import {TextField} from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import { DataGrid, renderActionsCell } from '@mui/x-data-grid';
import { Button } from "react-bootstrap";
import Api from "../../../../api";

import { Link } from "react-router-dom";

import Swal from "sweetalert2";

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
       
   
       // this.setState(old => ({...old, isLoading:true}))
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
            { field: 'id', headerName: 'ID', width: 100},
            { field: 'mobile', headerName: 'Mobile',  width: 120},
            { field: 'email', headerName: 'Email',  width: 120},
            { field: 'exam_code', headerName: 'Exam Code',  width: 190},
            { field: 'campaign_code', headerName: 'Campaign Code',  width: 100},
            { field: 'status', headerName: 'PASS/FAIL',  width: 190},
            { field: 'marks', headerName: 'Obtained Marks',  width: 190},
            // { field: 'action', headerName: 'Action',  width: 210,  renderCell: (params) => <Action key={params.row.id}  param={params.row} />, },
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


// function ViewResult(props){
//   const [data,setData]=useState(
//     props.param
//   )
//   const propsdata={
//       exam_code:"exam-camp_1V6w0m-3-1",
//       user_id:3

//   }

//   const apiCtrl=new Api

  
//  // console.log("viewresult=>",data)

  


//   useEffect(()=>{
   
//     // if(props.param!==null){
//     //   setData(props.param)
//     // }
 
//      console.log("viewresult=>",props.param)

//   // apiCtrl.callAxios("userexamdetail",).then((res)=>{
//   //   console.log("res=>",res)
//   // })
//   },[])
  
//     return(
//       <>
     
//         <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
//           <div className="modal-dialog modal-lg  modal-dialog-centered">
//           <div className="modal-content">
//           <div className="modal-header">
//               {/* <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5> */}
//               <div className="row ml-1" style={{ paddingTop: '2%'}}>
//                   {/* <label><b>{props.params.any} Details</b></label> */}
//               </div>
//               <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">
//                 <span aria-hidden="true">&times;</span>
//               </button>
//             </div>
            
//             <div className="modal-body m-body">
              
//             <div className="row">
//             <fieldset className="form-group border border-primary mb-2 p-3">
//               <div className="row " >
//                 <legend className="col-form-label col-sm-2  pt-0" >  <h4 style={{ color: '#1F5B54'}}>{"Result:"}</h4></legend>
//                   <div className="col-sm-9">
//                     <div className="row">
  
//                     <div className="wrapper" >
                    
//                       <h4 style={{ color: '#1F5B54'}}>{"Heavy Vehicle Insurance"}</h4>
//                       <p><span className="price">Name:<b>Test Agent</b></span></p>

//                       <p>Date Of Exam: <strong>01/02/2023</strong></p>
//                       <p>Time: <strong>O.5 Hours</strong></p>
//                       <span className="price">Total Marks: <strong style={{ color: 'green'}}>60</strong>, Passing: <strong style={{color:'red'}}>25</strong></span><br/>
//                       <span> Percentage: <strong style={{color:'red'}}>15%</strong></span><br/>
//                       <span className="price"> Exam Result: <strong style={{ color: 'red'}}>  FAIL</strong></span>
                        
                    
   
  
  
//                     </div>
  
//                     </div> 
//                   </div>  
//               </div>                    
                                
//             </fieldset>
                             
              
  
//             </div>
              
//             <div className="modal-footer">
                    
//                   <Link  to={"/examans-list"}>
//                     <Button  style={{ backgroundColor: 'rgb(108 110 116)',color:"#fff"}}>View Exam Answer </Button>&nbsp;&nbsp;
//                   </Link>

                  
                   
                  
//                   </div>
//             </div>  
  
            
//           </div>
//         </div>
//         </div>
  
  
//       </>
//     )
//   }


class ViewResult extends React.Component {
  constructor(props){
    super(props);
    this.state = {
       status:"",
       datetime:"",
      campaign:{},
      system_settings:{},
      roles:{}
    }
    
    this.apiCtrl = new Api;
 
   
  }

  componentDidUpdate(prevProps,prevState){
     
    if(prevProps.param.id !== this.props.param.id && this.props.param!==null){
      console.log("props=>",this.props)
     
      const data={
        exam_code:this.props.param.exam_code,
        user_id:this.props.param.id
      }

      this.apiCtrl.callAxios("userexamdetail",data).then(response => {
        //  location.reload('/user-list')
       console.log("response=>",response)

        Object.entries(response.data).map(([index,value])=>{
          
             //  console.log("value=>",value)
             var date1 = new Date(value.campaign.created_at);
             var dateTime = moment.utc(date1).format("DD-MMM-YYYY HH:mm:ss");
               this.setState(old=>({...old,...value.campaign.other_parameter,status:value.status,datetime:dateTime}))
          // Object.entries(value.campaign).map(([index1,value2])=>{
          //  console.log("state=>",this.state)


          // })




        })

        //this.setState(response.data[0])
       
      })

      
     
     

    } 
  }


  render(){

    // console.log("props",this.props)
    console.log("STATE=>",this.state)

    //  const data =()=>{
    //   this.state.other_parameter!==""?
    //   Object.entries(this.state.other_parameter).map(([index,value])=>{
    //       console.log("index",index,"value",value)
    
    //   })
    //  }
    return(<>

      
       <div className="modal fade" id="exampleModalToggle3" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
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
            {this.state.status!==""?<>

                <div className="modal-body m-body">
                  <div className="row">
                    <fieldset className="form-group border border-primary mb-2 p-3">
                      <div className="row " >
                        <legend className="col-form-label col-sm-2  pt-0" >  <h4 style={{ color: '#1F5B54'}}>{"Result:"}</h4></legend>
                          <div className="col-sm-9">
                            <div className="row">
          
                            <div class="wrapper" >
                            
                              <h4 style={{ color: '#1F5B54'}}>{this.state.campaign.title}</h4>
                              <p><span className="price">Name:<b>{this.props.param.name}</b></span></p>

                              <p>Date Of Exam & Time: <strong>{this.state.datetime}</strong></p>
                              <p>Time: <strong>{this.state.system_settings.exam_time.split(':').reduce((acc,time) => (60 * acc) + +time)/(60 * 60)} Hours</strong></p>
                                            
                              {/* <p>Time: <strong>O.5 Hours</strong></p> */}
                              <span className="price">Total Marks: <strong style={{ color: 'green'}}>{this.state.system_settings.total_marks}</strong>, Passing: <strong style={{color:'red'}}>{this.state.system_settings.passing_marks}</strong></span><br/>
                              <span> Percentage: <strong style={{color:'red'}}>15%</strong></span><br/>
                              <span className="price"> Exam Result: <strong style={{ color: 'red'}}>{this.state.status}</strong></span>
                                
                            
          
          
          
                            </div>
          
                            </div> 
                          </div>  
                      </div>                    
                                        
                    </fieldset>
                  </div>
                </div>
              </>:""
             } 
        


             
            </div>
          </div>
        </div>


    </>)
  }
}
  
  