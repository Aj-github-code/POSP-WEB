import React from 'react'

import Layout from '../components/Admin/Layout/Layout'

import Login  from '../components/Login/Login'
import Frontend from '../components/Frontend/Frontend'

import Crypt from '../Services/Crypt'

const isLoggedIn = () => {
  
  if(localStorage.getItem('_token_posp')){
    return true
  } else {
    return false
  }

 
}

function parseJwt(token){        
  const decode = JSON.parse(atob(token.split('.')[1]));
  // console.log('Decode', decode.exp);
  if ((decode.exp * 1000) < new Date().getTime()) {
    alert('Session Timeout Due To In-Activity', 'Please Login Again');
    localStorage.clear()
    navigation('/')
    location.reload('/')
  }
}
const Routerss = () => {
  const cryptCtrl = new Crypt;
  if((localStorage.getItem('_token_posp') !== 'undefined') && (localStorage.getItem('_token_posp') !== null)){
    parseJwt(cryptCtrl.decrypt(localStorage.getItem('_token_posp')))
  }
  var roles = [];
  if((localStorage.getItem('posp_user_roles') !== 'undefined') && (localStorage.getItem('posp_user_roles') !== null)){
    // alert('hii');
    var role = JSON.parse(cryptCtrl.decrypt(localStorage.getItem('posp_user_roles')))
    roles = role[0];
  }
  return (
    <div>
      
      {isLoggedIn()
      
      
        ? 
        <>
          { ((roles.role_code === "SA") || (roles.role_code === "AD")) 
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

