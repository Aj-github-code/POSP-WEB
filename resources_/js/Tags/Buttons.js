import React, { useState} from 'react'
import {Button} from '@mui/material';
export default function Buttons() {
    const [variant, setVariant] = useState('contained');
  return (
    <Button 
        onMouseEnter={()=> setVariant("outlined")} 
        onMouseLeave={()=> setVariant("contained")} 
        variant={variant}
        sx={props.style}
        color={props.color}
    >{Submit}</Button>
  )
}
