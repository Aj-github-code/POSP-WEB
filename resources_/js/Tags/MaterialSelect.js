import React,{useState} from 'react'
import {TextField, MenuItem, FormControl, Select, InputLabel} from '@mui/material';
export default function MaterialSelect(props) {
  const inputcss =  { color: '#ABAFB1', fontFamily:'Gotham', fontWeight:400, fontSize:14, fontStyle:'normal' };
  const labelcss =  { color: '#5E6366', fontFamily:'Gotham', fontWeight:400, fontSize:14, fontStyle:'normal' };
  const [select, setSelect]= useState();

  const [selectBox, setSelectBox] = useState('');

  const handleSelectBox = (event) => {
    setSelectBox(event.target.value)
    console.log(event.target.value)
  
    }

    const [data, setData] = React.useState(props.data)
   

  return (
 

     <FormControl fullWidth={props.fullWidth ? true : false}   >
     <InputLabel 
       id={props.labelId ? props.labelId : 'select-label-id'}
       
       >
        {props.label? props.label : "Select Box"}

     </InputLabel>
     <Select  
      //  labelId={props.labelId ? props.inplabelIdutId : 'select-label-id'}
      //  id={props.id ? props.id : 'select-id'}
       name={props.name ? props.name : 'select-name'}
       label={props.label? props.label : "Select Box"}
       
       value={props.value? props.value : ''}
      //  onChange={(e)=>handleSelectBox(e.target.value)}
       {...props}
    
     >   
     {/* {Menu(props.data)} */}
     { Object.entries(props.data).map(([index, value]) =>  {
 
 return <MenuItem value={index} key={index}>{value}</MenuItem>
      
     })}
    
     </Select>
    
   </FormControl>
  

  )
}


const Menu = (props) => {
 
  }
  {/* <MenuItem value={value} >{value}</MenuItem> */}