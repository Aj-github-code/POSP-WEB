import React from "react";
import Api from "../../../../api";
import { DataGrid } from '@mui/x-data-grid';
import MaterialButton from '../../../../Tags/MaterialButton'
import { Button } from 'react-bootstrap';
import MaterialTextField from '../../../../Tags/MaterialTextField'
import MaterialSelect from '../../../../Tags/MaterialSelect'
import { Box, Divider, ThemeProvider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Swal from "sweetalert2";
export default class Qna_question extends React.Component {
    constructor(props){
        super(props);
        this.apiCtrl = new Api;

        this.state = {
            
              campaign:{
                0:{
                    option:{}
                },
               
              },
                // 0:{question :"",choice_type:""}, 
                type:"support",
                inputrow:[<Inputrow key={0} id={0} func={this.Answeronchange.bind(this)}  />]
              
            
        }
    }

    Answeronchange=(e, position)=>{
        const {name,value}=e.target

        var x = this.state.campaign;
        x['0']['option'][position]={answers:value};
        this.setState((prev) => ({
            ...prev,
            campaign: x,
        }))
        // this.setState(old =>({...old,campaign:{...old.campaign,0:{...old.campaign[0],option:{...old.option,[position]:{...old[position],[name]:value}}}}}))
         console.log(this.state.inputrow)
       }

    // componentDidUpdate(prevProps,prevState){

    //     // console.log("prevProps-->",prevProps)
    //     // console.log("prevState-->",prevState)
  
    //     if (prevProps.data.id !== this.props.data.id)  {
       
        
  
    //       this.setState(this.props.data)
           
  
        
    //     }
    //   }

    render(){
        
      
        let handleAddanswer = (e) => {
            e.preventDefault()
           // this.setState([...inputrow,<Inputrow key={inputrow.length} />]);
           this.setState(old=>({...old,inputrow:[...old.inputrow,<Inputrow func={this.Answeronchange.bind(this)} key={this.state.inputrow.length} id={this.state.inputrow.length}   />]}))
        }

       

      const  handleonchange =(e)=>{
            // console.log(e.target.value)
            // console.log
            const{name,value}=e.target
           

            this.setState(old =>({...old,campaign:{...old.campaign,0:{...old.campaign[0], [name]:value}}}))
           // this.setState()
        }
        
       const handleonchang=(e)=>{
        const{name,checked}=e.target
        this.setState(old =>({...old,campaign:{...old.campaign,0:{...old.campaign[0], [name]:checked?"multiple":"single"}}}))
        //  this.setState(old=>({...old,campaign:{0:{...old.campaign[0],choice_type:e.target.checked?"multiple":"single"}}}))
       }

  


      

       const submituser= async (e) => {
        e.preventDefault();

      const data={
        campaign:this.state.campaign,
        type:this.state.type
      }

      console.log("data",data)

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
            console.log("Qta Question===>",response);
            
            
          }).catch(function (error) {
            console.log("error Question===>",error);
          });
       }
        
    //   console.log("ptops==>",this.props.data)
        console.log(this.state)
        return(
            <>

                 {/* <BreadCrumb breadcrumb="Roles" breadcrumbItem1='Create' /> */}
              
                <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
  
                    <div className="row ml-1">
                        <label><b>Qna Question</b></label>
                    </div>

                    <Divider sx={{ borderColor: '#dac4c4',marginBottom:5}}    />



                    <div className="row mb-4">

                     <div className="col-md-4 ">
                        
                        <MaterialTextField     name="question" label="question" onChange={handleonchange} fullWidth  />
            
                     </div>

                     <div className="col-md-4">

                        <FormControlLabel control={<Checkbox   name="choice_type" onChange={handleonchang}/>} label="Multiple" />

                     </div>

                     
                     

                     
                    </div>

                    <div className="row">
                            <div className="col-md-4 mb-5 ">
                            {this.state.inputrow} 
                              
                            </div>

                            <div className="col-md-12 mb-4 d-flex" style={{justifyContent:"right",marginTop:"-4rem",marginBottom:"auto"}}>
                             <Button type="submit" onClick={handleAddanswer}style={{ backgroundColor: '#183883',width:"auto",color:"#fff", marginTop: "-11px", height: "48px"}}   size='medium'>Add More</Button>
                            </div>
                    </div>

                    <div className='row'>
                        <div className="col-md-3">
                            <Button style={{ backgroundColor: '#183883'}} onClick={ submituser }>Submit</Button>
                        </div>
                    </div>

                    

                        





                </Box>



            </>
        )
    }
}


function Inputrow(props){
    // const Multipleanswer = (event)=>{
    //    // props.fun(props.param)
    //    console.log(props.fun(props.param))
         
        //  props.func()
         
    //    }
    return(
        <>
        <div className="mb-3">
          <MaterialTextField    name="answers" onChange={(e)=>props.func(e, props.id)}  label="Answer"  fullWidth  />
        </div>          
        </>
    )
}