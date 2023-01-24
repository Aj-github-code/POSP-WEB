import React from 'react'
import Zoomer from './Zoomer'
import Box  from '@mui/material/Box';

export default function ImageBar(props) {
  return (
    <>
        <Box  sx={{border:1, borderRadius:"8px", borderColor:"gray", display:"flex", justifyContent: "space-between", padding:"5px", paddingLeft:"25px", paddingRight:"25px", fontSize:"25px"}} >
        <span key={props.category}>{props.category}</span>
        <span key={props.damage}>{props.damage}</span>
            <Zoomer 
                {...props}
                
            />
        </Box>
    </>
  )
}
