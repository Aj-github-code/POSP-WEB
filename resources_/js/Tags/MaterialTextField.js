import React from 'react'
import TextField from '@mui/material/TextField';

export default function MaterialTextField(props) {
  const labelcss =  {  fontStyle:'normal',backgroundColor:'white'};
  const inputcss =  { fontStyle:'normal',backgroundColor:'white' };

const [input, setInput] =React.useState(null);

const handleTextField = (event) => {
  setInput(event.target.value);

}
  return (

  
    <TextField  
    
 
      label={props.label}
      
     
      fullWidth={props.fullWidth ? true : false}

      InputLabelProps={{ 
        style:  props.style  ? (props.style.label ? {...props.style.label} :  {...labelcss}) : {...labelcss},
        shrink: true,
    }} 


    InputProps={{ 
        style: props.style  ? (props.style.input ?{...props.style.input} :  {...inputcss}) :  {...inputcss},
       
      //  disableUnderline: props.disableUnderline ? props.disableUnderline : false
    }} 

    // onChange={handleTextField} 
    variant={props.variant ? props.variant  : 'outlined'}
    

    type={props.type ? props.type : null}
    // value={props.value ? props.value : input}
    name={props.name ? props.name : null}
    className={props.className ? props.className :  null}
    error={props.error == "" ? 'false' : props.error}
    helperText={props.helperText == "" ? '' : props.helperText}
    {...props}
    />
    
  )
//   {{ style: { color: '#5E6366', fontFamily:'Gotham', fontWeight:400, fontSize:12, fontStyle:'normal' }, }}
}
