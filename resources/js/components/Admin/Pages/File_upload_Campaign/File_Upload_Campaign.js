import React from "react";
import MaterialTextField from "../../../../Tags/MaterialTextField";
import MaterialButton from "../../../../Tags/MaterialButton";
import { FileUpload } from "../File_Upload/File_Upload";

import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

import Api from "../../../../api";
export  class FileUploadCampaign extends React.Component {
    constructor(props){
      super(props);
      this.apiCtrl = new Api;
      this.state = {
        
       
        LinkUrl:[<LinkUrl func={this.urllinkupload.bind(this)}  delbyidfunc={this.deletebyid} value={{key:'', val:''}} key={0} id={0}/>],
        link:{},
        imagelist:{},
        error:"",
        success:"",

        files:[]
      
      }
      
    }

    urllinkupload=({name,value,position})=>{
        // console.log("name",name,"value",value,"position",position)        
         this.setState(old=>({...old,link:{...old.link,[position]:{...old.link[position],value}}}))       
         //console.log("state--=>",this.state)     
     
    }

 
    deletebyid=(id)=>{
      //  console.log("id=>",id)
        const linksrow =this.state.LinkUrl
        // console.log("linksrow",linksrow)
         delete linksrow[id]
       // console.log("deletedata=>",datadelete)
         this.setState(old=>({...old, linksrow}))
      //  console.log("state",this.state)
    }
     
  

    componentDidUpdate(prevProps, prevState){
      // console.log('update')
      if (prevState.files !== this.state.files) {
          
        this.handleChange()
        var data = new FormData();


          
        if(this.state.files!==undefined){
          if(Object.keys(this.state.files).length > 0){
            
            Object.entries(this.state.files).map(([index, value])=>{                
              
                // console.log("key==>",key1)
                Object.entries(value).map(([key,val])=>{
                  data.append(`files[${index}][${key}]`, val);

                })

            //  data.append(`files[${index}]`, value);
            
              
                  
              
            })
            data.append(`type`, this.state.types)
            data.append(`campaign_code`, "exam-camp_1V6w0m")
          }
        }
      
     
          if(Object.keys(this.state.files).length > 0){
             
          //  console.log("satecomponent=>",this.state.files)
            
              this.apiCtrl.callAxiosFile("upload-docs-campaign",data).then((response)=>{
          
          // console.log("respomnse=>",response)
          
              if(response.success === true){
                  this.setState(old=>({...old,files:[""]}))
                  var success=this.state.types+"Uploaded"
                    this.setState(old=>({...old,imagelist:response.data,success:success}))
                }else{
              
                      var errors=this.state.types+" "+"not Uploaded"
                      this.setState(old=>({...old,error:errors}))
                  }
              })
          }
      }
    }

    handleChange = (file,types) => {
      // console.log("file",file)
  
      
          var array = [];
      if(typeof file!=="undefined"&& typeof types!=="undefined"){
        this.setState(old=>({...old,types:types}))
        Object.entries(file).map(([index, image])=>{
          // console.log("image=.",image)
            array = [...array, image]
      
          // array = [...array, image]
          })

          this.setState(old=>({...old,files:{...old.files,[types]:{...old.files[types],...array}}}))

        // console.log("array=>",array)
      }else{
        return ""
      }    
        
    };

 
    
    render(){
      
      const filedownload = () => {
        this.apiCtrl.callAxios('vehicle/export-vehicle-format', {vehicle_type:1}).then((res)=>{
          // console.log(res);
          if(res.success == true){
            window.open(res.message)
          }
        })
      }
     
        let Addmore = (e) => {
              
            this.setState(old=>({...old,LinkUrl:[...old.LinkUrl,<LinkUrl func={this.urllinkupload.bind(this)}  delbyidfunc={this.deletebyid} key={this.state.LinkUrl.length} id={this.state.LinkUrl.length}/>]}))
        }


      //  console.log("state =>",this.state)

        return(<>

            <BreadCrumb breadcrumb={""} breadcrumbItem1='Create' />

            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

                <div className="row mb-3 ml-1">
                    <label><b>{""}</b></label>
                </div>

                <Divider sx={{ borderColor: '#dac4c4'}} />


                <div className="row">
                  <label><b>{"Video Upload"}</b></label>
                    <div className="col-md-6 md-3" style={{justifyContent:"right", hight:"20px",marginBottom:"24px"}}>
                  
                      {/* <FileUpload func={handleChange} type={"video"} /> */}
                      <FileUpload func={this.handleChange} error={this.state.error?this.state.error:""} key={'video'} type={"video"} />
                    </div>
                    {(this.state.error!=="")&&(this.state.types==="video")?<label className="text-danger">{this.state.error}</label>:""}
                     {(this.state.success!=="")&&(this.state.types==="video")?<label className="text-success">{this.state.success}</label>:""} 


                    
                 
                     

                </div>
                <div className="row">
                <label><b>{"Image Upload"}</b></label>                
                    <div className="col-md-6 md-3"  style={{justifyContent:"right", hight:"20px",marginBottom:"24px"}}>
                     
                      {/* <FileUpload func={handleChange} type={"image"}/> */}
                      <FileUpload func={this.handleChange} error={this.state.error?this.state.error:""} key={"image"} type={"image"}/>
                    </div>

                    <div className="col-md-6">
                      <fieldset className="form-group border p-3">
                        <div className="row " >
                          <legend className="col-form-label col-sm-2  pt-0" ></legend>
                            <div className="col-sm-10">

                                  

                                <div className="row">
                                </div>
                            </div>
                        </div>
                      </fieldset>
                    </div>

                    {(this.state.error!=="")&&(this.state.types==="image")?<label className="text-danger">{this.state.error}</label>:""}
                     {(this.state.success!=="")&&(this.state.types==="image")?<label className="text-success">{this.state.success}</label>:""} 
 
                  
                  
                </div>
                 
                <div className="row">
                  <label><b>{"PDF Upload"}</b></label>
                    <div className="col-md-6 md-3"  style={{justifyContent:"right", hight:"20px",marginBottom:"24px"}}>
                  
                      {/* <FileUpload func={handleChange} type={"file"}/> */}
                      <FileUpload func={this.handleChange} error={this.state.error?this.state.error:""} key={"file"} type={"file"}/>
                    </div>   
                      {(this.state.error!=="")&&(this.state.types==="file")?<label className="text-danger">{this.state.error}</label>:""}
                      {(this.state.success!=="")&&(this.state.types==="file")?<label className="text-success">{this.state.success}</label>:""} 
  

                </div>




                <div className="row">
                  <label className="mb-3"><b>{"Link Upload"}</b></label>
                  
                       

                        {this.state.LinkUrl}
                     
                   
                </div>
                    
                <div className="col-md-12 mb-4 d-flex"style={{justifyContent:"right",marginBottom:"auto"}}>
                <MaterialButton style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}} onClick={Addmore} name="update" text="Add More" />
                </div>

                <Divider sx={{ borderColor: '#dac4c4'}} />
                <div className="col-md-12 mb-4 d-flex"style={{justifyContent:"right",marginBottom:"auto"}}>
                <MaterialButton onClick={filedownload} style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}}  name="submit" text="Submit" />
                </div>
                

                
            </Box>
        </>)
    }
}


function LinkUrl(props){
    //console.log("props=>",props)
    const remove=()=>{
       
        props.delbyidfunc(props.id)
      
       }
    return(<>

      
      <div className="col-md-6 mb-4" >
      <MaterialTextField label="Upload Link" onChange={(e)=> props.func({name:e.target.name,value:e.target.value,position:props.id})}  placeholder="Enter URL" fullWidth/>
       
      </div>
       
     

       <div className="col-md-2 d-flex mb-4 "style={{justifyContent:"right", marginBottom:"auto"}}>
              <IconButton onClick={remove} aria-label="delete" size="large">
                  <ClearIcon fontSize="inherit" />
              </IconButton>
            </div>
            
        
     
    </>)

}