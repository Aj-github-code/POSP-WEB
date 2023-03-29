import React, { useEffect, useState } from "react";
import { TextField,MenuItem } from "@mui/material";
import Api from "../api";


export const SearchableInputTextfield=(props)=>{
     const [listval,setListval]=useState()
     const [data,setData]=useState({})

     const apiCtrl=new Api
    // const [visable,setVisable]=useState(false)
    // const [updatedList,setUpdatedList]=useState()




useEffect(()=>{

    apiCtrl.callAxios("tags/list",data).then(res=>{     
         Object.entries(res.data).map(([key,value])=>{
             // console.log("key",key,"value",value)
            setData(old=>({...old,[value.name]:value.name}))
         })
      
     })

},data)

 const getval =(e)=>{

   // console.log("value=>",e)

    setListval(e.target.innerText)
    e.target ={...e.target, value: e.target.innerText}
    props.onChange(e)
   // setVisable(false)

   
  

 }


 const handleKeyDown=(e)=>{
   // console.log('validate=>',e.target.value);
    if ((e.key === 'Enter') || (e.keyCode === 13)) {

       const dataTag={
           name:e.target.value,
           is_active:1,
           slug:"ghjgh",
       }


       if(dataTag.name!==data[dataTag.name]){
         //setData(old=>({...old,[data.name]:data.name}))
        //  console.log("Data=>",data)

            apiCtrl.callAxios("tags/create",dataTag).then((response)=>{
                if(response.success == true){
                    
                setData(old=>({...old,[dataTag.name]:dataTag.name}))
                //console.log("Data=>",data)
                } else {
                    
                }
            })

        }  
        //  else{
        //     alert()
        // }
       
        
    }
}


 
//console.log("props=>",props)


    return(<>

      
        <div className="btn-group">

            <TextField style={{position:"relative"}}
                name={props.name ? props.name : 'search'}
                label={props.label? props.label : ""}  
                
                InputLabelProps={{ 
                  //  style:  props.style  ? (props.style.label ? {...props.style.label} :  {...labelcss}) : {...labelcss},
                    shrink: true,
                }}     
                            //  value={listval}
                value={props.value?props.value:""}
                fullWidth={props.fullWidth ? true : false}
                className={props.className ? props.className :  null}
                error={props.error == "" ? 'false' : props.error}
                helperText={props.helperText == "" ? '' : props.helperText}
                autoComplete='off'             
                //  onChange={(e)=>handleSelectBox(e.target.value)}
                {...props}
                data-toggle="dropdown"
                onKeyDown={handleKeyDown}
                                       
            />
           
            <button type="button" className="dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-expanded="false" style={{position:"absolute",right: "1%",top: "15%"}}>
                <span className="sr-only">Toggle Dropdown</span>
            </button>
        

            <div className="dropdown-menu">


                { Object.entries(data).map(([index, value]) =>  {
                    

                //  console.log("value =>",value)
                if((value !== undefined)){
                    if((props.value!=="") && (props.value !== null) && (typeof props.value !== 'undefined') && (value !== undefined) ){
                //  console.log("valueinner=>",value)
                        


                    var newval= value.includes(props.value)

                    if(newval){
                        return <MenuItem className="dropdown-item" value={index} key={index} onClick={getval}>{value}</MenuItem>
                    }

                    }else{
                    return <MenuItem className="dropdown-item" value={index} key={index} onClick={getval}>{value}</MenuItem>

                    }
                }else{
                    return <MenuItem className="dropdown-item" value={index} key={index} onClick={getval}>{value}</MenuItem>

                }
                
                })
            
                
            }
                
            </div>
           

        </div>
        

       

           
    
    </>)

}





