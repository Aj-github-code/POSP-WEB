import React, { useState} from 'react'
import {Button} from '@mui/material';

export default function MaterialButton(props) {
    const [variant, setVariant] = useState('contained');
  return (
    <Button 
        onMouseEnter={()=> setVariant("outlined")} 
        onMouseLeave={()=> setVariant("contained")} 
        variant={variant}
        sx={props.style}
        {...props}
    >{props.text}</Button>
  )
}
