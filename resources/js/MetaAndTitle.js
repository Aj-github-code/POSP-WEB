import React from 'react'
import { useEffect } from "react";
import { BrowserRouter as Router , Routes, Route , useLocation} from 'react-router-dom'

export default function MetaAndTitle() {
    const pathname = window.location.pathname;

    // useEffect(() => {
    //   if (action !== "POP") {
    //     window.scrollTo(0, 0);
    //   }
    // }, [action]);
    

  
    useEffect(() => {
      let title = "";
      let metaDescription = "";
      //TODO: Update meta titles and descriptions below
      switch (pathname) {
        case "/":
          title = "Dashboard";
          metaDescription = "Dashboard";
          break;

        default:
          title= "POSP";
          metaDescription= "POSP";
         
        
       
      }
      
  
      if (title) {
        document.title = title;
      }
  
      if (metaDescription) {
        const metaDescriptionTag = document.querySelector(
          'head > meta[name="description"]'
        );
        if (metaDescriptionTag) {
          metaDescriptionTag.content = metaDescription;
        }
      }
    }, [pathname]);
  return (
    <></>
  )
}
