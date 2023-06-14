import React, { useEffect, useState } from "react";
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
import Qna_question from "./Qna_question";

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
        this.getQuestionList();
    }

    getQuestionList = () =>{
        var data = {length:this.state.pageSize, start:this.state.page*this.state.pageSize};
        var dataselect={
            is_active:this.state.is_active}

        this.setState(old => ({...old, isLoading:true}))
        this.apiCtrl.callAxios("qna-ajax-list",dataselect).then(response => {
          //  console.log("questiondata==>",response);
            
            if(response.success == true){
                this.setState(old => ({...old, data:response.data.aaData, total:response.data.iTotalRecord}))
    
            } else {
            alert("No Data Available")
            }
            this.setState(old => ({...old, isLoading:false}))
            // sessionStorage.setItem('_token', response.data.)
            
        }).catch(function (error) {
            this.setState(old => ({...old, isLoading:false}))
            // console.log(error);
        });
      }


    render(){

        var data={
            "":"All",
            "1":"Active",
            "0":"Is Active"
           }
       
        const  handleClick = (data) => {
            //  console.log("dataproduct===",data)
              this.setState({questiontData: data})
      
           }

           const handlechangeselect=(e)=>{
        
            //  console.log( e.target.value)
          
             this.setState({ is_active:e.target.value})
              this.getQuestionList()
            
            }
      
        const columns = [
            { field: 'sr_no', headerName: 'Sr no', width: 100 },
            { field: 'question', headerName: 'Question', width: 190 },
            { field: 'role', headerName: 'Question For', width: 150 },
            {field:'is active',headerName:'Isactive' ,width:190, renderCell:(params)=><Isactive param={params.row}/>},
            { field: 'action', headerName: 'Action',  width: 190 ,  renderCell: (params) =><Action fun={handleClick}  param={params.row}/> }
        ];

 
        


        return(
            <>
               <BreadCrumb breadcrumb="QNA List"  />
             <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
              
              <div className="row">
                <div className="col-md-4 mb-3">
                <MaterialSelect  value={data}labelId="Is Active" data={data} onChange={handlechangeselect}  label="Is Active" fullWidth/>
                </div>
                <div className="col-md-4 mb-3">
                <Button  type="button"  style={{ backgroundColor: '#183883',width:" 159px",marginBottom:"20px",fontSize: "small", marginLeft:"27rem",color:"#fff"}}  data-bs-toggle="modal" size='small' href="#exampleModalToggle" >Create Qna</Button>
             
                </div>
               

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
             {/* <Model params={this.state.questiontData}/> */}
               <Model />
             <ModeleEdit params={this.state.questiontData}/>
             </Box>

            </>
          )
    }


}

function Action(props){

     
  const editQuestion = (event)=>{
    props.fun(props.param)
  }
    
  
    return( 
        <>
        <Button  type="button"  data-bs-toggle="modal" size='small' href="#exampleModalToggle1" onClick={editQuestion}  >Edit</Button>
        </>

     )
}

function Isactive(props){
// console.log("isactive==>",props)
   
   const [active,setState]=useState(props.param.is_active === '1' ? true: false )
   const apiCtrl=new Api;
    const handleonchange=(e)=>{
         const{name,checked}=e.target;
       setState(checked?true:false)

     const   data={
        id:props.param.id,
        is_active:checked === true?"1":"0"
       }
      // console.log("data==>",data)

     apiCtrl.callAxios('delete-question', data).then(response => {
      //  console.log(response)
     })
      
    }


    return(
        <>
        <FormControlLabel control={<Checkbox  checked={active} onChange={handleonchange} name="is_active" />}  />
        </>
    )
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
              
            
              <Qna_question data={props.params} />
  
            </div>
              
           
            </div>  
  
            
          </div>
        </div>
        </div>
  
  
      </>
    )
  }


  




class ModeleEdit extends React.Component {
    constructor(props){
        super(props);
        this.apiCtrl = new Api;

        this.state = {
           // id:this.props.data.id,
              campaign:{
                
                0:{
                    option:{}
                },
               
              },
                // 0:{question :"",choice_type:""}, 
                type:"support",
             //   inputrow:[<InputrowforEdit   key={0} id={0} func={this.Answeronchange.bind(this)}  />],
               inputrow:''
              
            
        }
    }

    Answeronchange=(e, position)=>{
      //  console.log("amswer==>", e.target.name)
        const {name,value,checked}=e.target

        // console.log('Position',position)
      

          var x = this.state.campaign;
          // x['0']['option'][position][name] =  value;
          x['0']['option'][position] ={[name]:value};

          this.setState((prev) =>({
            ...prev,
            campaign:{...x}
          }))

        // this.setState(old =>({...old,campaign:{...old.campaign,0:{...old.campaign[0],option:{...old.option,[position]:{...old[position],[name]:value}}}}}))
        // console.log(this.state.campaign)
       }

      componentDidUpdate(prevProps,prevState){

        // console.log("prevProps-->",prevProps)
        // console.log("prevState-->",prevState)
  
        if (prevProps.params.id !== this.props.params.id)  {
       
         
          this.apiCtrl.callAxios("get-question", {id:this.props.params.id}).then(response => {

            // console.log("dataproduct===",response)

             // this.setState({questiontData: response.data[0]})
                this.setState( response.data[0])

                Object.entries(response.data).map(([index,value])=>{
               
                 
                     this.setState(old=>({...old,inputrow:[...old.inputrow,<InputrowforEdit  {...value} func={this.Answeronchange.bind(this)} key={index} id={index}   />]}))
                   
                //  console.log("val==>",value)

                  
                })

        })

       
    
           
  
        
        }
      }
      

      
    

    render(){
        
      
        let handleAddanswer = (e) => {
            e.preventDefault()

           // this.setState([...inputrow,<Inputrow key={inputrow.length} />]);
           this.setState(old=>({...old,inputrow:[...old.inputrow,<InputrowforEdit  func={this.Answeronchange.bind(this)} key={this.state.inputrow.length} id={this.state.inputrow.length}   />]}))
        }

       

      const  handleonchange =(e,index)=>{
            // console.log(e.target.value)

            //  console.log("index",index)
            const{name,value}=e.target
           
            this.setState(old=>({...old, [e.target.name]:e.target.value}))
           this.setState(old =>({...old,campaign:{...old.campaign,0:{...old.campaign[0], [name]:value}}}))
           // this.setState()
        }


        
       const handleonchang=(e)=>{
        const{name,checked}=e.target
        this.setState(old=>({...old, [e.target.name]:e.target.checked?"multiple":"single"}))
        this.setState(old =>({...old,campaign:{...old.campaign,0:{...old.campaign[0], [name]:checked?"multiple":"single"}}}))
        //  this.setState(old=>({...old,campaign:{0:{...old.campaign[0],choice_type:e.target.checked?"multiple":"single"}}}))
       }

  


      

       const submituser= async (e) => {
        e.preventDefault();

      const data={
        campaign:this.state.campaign,
        type:this.state.type
      }

      // console.log("data",data)

        this.apiCtrl.callAxios("create-question", data).then(response => {

            if(response.success == true){
                Swal.fire({
                    title: "Question",
                    text: " Created",
                    icon: "success",
                    showConfirmButton: false,
                })
            } else {
                Swal.fire({
                    title: "Question",
                    text: " Not Created !",
                    icon: "error",
                    showConfirmButton: false,
                })
            }
            // console.log("Qta Question===>",response);
            
            
          }).catch(function (error) {
            // console.log("error Question===>",error);
          });
       }
        
      //  console.log("editprops==>",this.props)
        // console.log(this.state)

        return(
          <>
         
            <div className="modal fade" id="exampleModalToggle1" aria-hidden="true" aria-labelledby="exampleModalToggleLabel1" tabIndex="-1">
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
                  
                <div className="row mb-4">
    
                      <div className="col-md-4 ">
                        
                        <MaterialTextField value={this.state.question?this.state.question:""}    name="question" label="question" onChange={handleonchange} fullWidth  />
    
                      </div>
    
                      <div className="col-md-4">
    
                        <FormControlLabel control={<Checkbox checked={this.state.choice_type==="multiple"?true:false}      name="choice_type" onChange={handleonchang}/>} label="Multiple" />
    
                      </div>

                      
    
    
    
    
    
                </div>
    
                <div className="row">
                      <div className="col-md-12 mb-5 ">
                      {this.state.inputrow} 
                      {/* {this.props.params.answers} */}
                        
                      </div>
    
                      <div className="col-md-12 mb-4 d-flex" style={{justifyContent:"right",marginTop:"-4rem",marginBottom:"auto"}}>
                        <Button type="submit" onClick={handleAddanswer}style={{ backgroundColor: '#183883',width:"96px",color:"#fff", marginTop: "-11px", height: "48px"}}   size='medium'>Add More</Button>
                      </div>
                </div>
    
                <div className='row'>
                  <div className="col-md-3">
                      <Button style={{ backgroundColor: '#183883'}} onClick={ submituser }>Submit</Button>
                  </div>
                </div>
    
                
      
                </div>
                  
               
                </div>  
      
                
              </div>
            </div>
            </div>
      
      
          </>
        )
        
    }
}


function InputrowforEdit(props){

  const [state,setState]=useState(
    props
  )
 

  const onHandleChange = (e) =>{
   // console.log("e",e)
      props.func(e, props.id)
    setState(old=>({...old, [e.target.name]:e.target.value , }))
  }

  const onHandleChang = (e) =>{
    // console.log("e",e)
    setState(old=>({...old, [e.target.name]:e.target.checked===true?"1":"0"  }))
    if(e.target.checked){
      e.target.value = '1';
    } else {
      e.target.value = '0';
    }
    props.func(e, props.id)
   }

  // console.log("inputrowprops==>",props )
 // console.log("inputrowprops==>",state )
  return(
      <>

    <div className="row">

    <div className="col-md-4 mb-3">
      <MaterialTextField  value={state.answers?state.answers:""} name="answers" onChange={onHandleChange}  label="Answer"  fullWidth  />
      </div> 

      <div className="col-md-3">
      
      <FormControlLabel control={<Checkbox checked={state.is_ans==="1"?true:false} onChange={onHandleChang} name="is_ans" />} label="Is Answer" />
      </div>
    

    </div>
               
      </>
  )
}