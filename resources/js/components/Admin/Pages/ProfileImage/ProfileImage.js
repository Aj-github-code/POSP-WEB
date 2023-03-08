import React from "react";
import { useEffect } from "react";
import Navbar from "../../../Navbar/Navbar";
import { getimag } from "../../../Navbar/Navbar";


export  const ProfileImage=(props)=>{
  var radius=props.borderRadius
  
    return(<>

           <img  src={props.image?props.image:"https://www.w3schools.com/howto/img_avatar.png"}/>

    </>)

}