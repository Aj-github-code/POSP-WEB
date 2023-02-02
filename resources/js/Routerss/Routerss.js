import React from 'react'

import Layout from '../components/Admin/Layout/Layout'

import Login  from '../components/Login/Login'
import Frontend from '../components/Frontend/Frontend'

const isLoggedIn = () => {
  
  if(localStorage.getItem('_token')){

    return true
  } else {
    return false
  }
}
const Routerss = () => {
  var roles = JSON.parse(localStorage.getItem('user_roles'))
  return (
    <div>
      
      {isLoggedIn()
      
      
        ? 
        <>
          {  ((roles[0].role_code === "SA") || (roles[0].role_code === "AD")) 
            ?
            <Layout />
            :
            <Frontend />
            }
        </>
          
        :
        <Login />
 
        
        }
    </div>
  )
}

export default Routerss

