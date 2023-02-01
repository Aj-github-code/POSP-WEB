import { alertClasses } from '@mui/material';
import React from 'react'
import { ZoomerImage } from "react-zoomer-image";
import './Zoomer.css'
export default function Zoomer(props) {

  return (
    <>
      <ZoomerImage 
          {...props}
      />  
    </>
  )
}
