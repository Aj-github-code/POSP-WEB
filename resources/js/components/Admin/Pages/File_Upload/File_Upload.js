import React from "react";
import Api from "../../../../api";
import { FileUploader } from "react-drag-drop-files";
import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import { object } from "prop-types";
import '../File_Upload/Upload_file.css'
export  class FileUpload extends React.Component {
    constructor(props){
      super(props);
      this.apiCtrl = new Api;
      this.state = {

        types:this.props.type,
       
       
        
      }
     
      
    }

   
    

        
  

    render(){

      var types=this.props.type
   
      const handleChange = (file) => {
        this.props.func(file,types)
      }
        
        const fileTypes={
            image:["JPG", "PNG","JPEG"] ,
            video:["mp4"],
            file:["pdf"]
        }
            
        
       
       // var typename=this.props.typename
    

        
         //  console.log("files=>",this.state)
        return(<div key={this.props.key} >
             
             
                <FileUploader handleChange={handleChange}   multiple={true} name={`files[]`} types={fileTypes[types]} />
             
             
               



        </div>)
    }
}