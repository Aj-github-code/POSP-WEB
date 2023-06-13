
import  React, {useState} from 'react';

import axios from 'axios';
const axiosRequestConfig = {
    headers: { 'Content-Type': 'application/json' }
  }
export const URL = process.env.MIX_URL;
//  export const API_CONSTANTS = process.env.MIX_API_URL;
import { API_CONSTANTS } from './Services/constant';
 import Crypt from './Services/Crypt';
export default class Api extends React.Component {
    constructor(props) {
        super(props);
        this.cryptCtrl = new Crypt;
      }

   getBaseUrl(){
    // return API_CONSTANTS;
    return API_CONSTANTS.BASE_URL;
  }

//  tokenValid() {
//     const currentDate = new Date();
//     const expiryDate =   localStorage.getItem('expire_token');;
  
//     console.log('currentDate',currentDate)
//     console.log('expiryDate',expiryDate)
//     if(timeObject.getTime() < expiryDate){
//       return false;
//     } else {
//       return true;
//     }
//   }

  refreshToken(){
  

      return new Promise((resolve,reject)=>{
          var config = {
              method: 'post',
              url: API_CONSTANTS+'refresh',
              headers: { 
                  'Authorization': 'Bearer '+localStorage.getItem('_token_posp')
              },
          };
            axios(config).then(function (response) {
              // console.log(response);
              if(response.data.access_token){
                localStorage.setItem('_session_start_posp', (Date.now() + response.data.expires_in))
                // let timeObject = new Date();
                // let milliseconds= 3600 * 1000; // 10 seconds = 10000 milliseconds
                // timeObject = new Date(timeObject.getTime() + milliseconds);
                // localStorage.setItem('expire_token', timeObject);
                localStorage.setItem('_token_posp',  this.cryptCtrl.encrypt(response.data.access_token))
              resolve(response.data.access_token);
              }
            })
      
      })
    
  }

 
   getToken(){
    return new Promise((resolve,reject)=>{
        if(localStorage.getItem('_token_posp')){
          var token = null;
          token = this.cryptCtrl.decrypt(localStorage.getItem('_token_posp'))
          if(token != null){
            if(this.parseJwt(token)){
              resolve(token)
            } else {
              resolve(this.refreshToken())
            }
          }
        } else {
            resolve(false);
        }       
    })
    
  }

  checkTimeout() {
      if (Date.now() > localStorage.getItem('_posp_time_out_session')) {
          clearInterval(interval);
          alert("Your current Session is over due to inactivity.");
      }
  }
  componentDidUpdate(prevProps, prevState){
  };
  
  parseJwt(token){        
      const decode = JSON.parse(atob(token.split('.')[1]));
      // console.log('Decode', decode.exp);
      if ((decode.exp * 1000) < (new Date().getTime() + 15000)) {
        return false;
      } else {
        return true;
      }
  }
  
  callAxios(endPoint, reqData, auth=true,type='application/json'){
      return new Promise((resolve, reject) => {
          Promise.all([this.getBaseUrl(),this.getToken()])
          .then(data => {
              console.log(reqData);
            
            // console.log('================================>');
            // console.log('URL: ' + data[0] + endPoint);
          //  console.log('TOKEN: ' + data[1]);
            const reqDataHeader = {
              ...reqData,
            };
            // console.log('Request Body : ' + JSON.stringify(reqDataHeader));
            // console.log('================================>');
            const authtoken = auth ?  'Bearer '+ data[1] : "";
            
            if ( data[0] != null) {
              console.log( { headers: { 'Content-Type': type,
              'Authorization': authtoken}})
              axios
                .post(
                  data[0] + endPoint,
                  { ...reqData},                    
                  {
                    headers: { 'Content-Type': type,
                    'Authorization': authtoken
                  }
                }
                )
                .then((response) => {
                  //  console.log('Request Respomse', response);
                   if(response.data.access_token){ 
                    // let timeObject = new Date();
                    // let milliseconds= 3600 * 1000; // 10 seconds = 10000 milliseconds
                    // timeObject = new Date(timeObject.getTime() + milliseconds);
                    // localStorage.setItem('expire_token', timeObject);
                    resolve({success: true, access_token: response.data.access_token, ...response.data, data:response.data.data, message: response.data.message});
                   }else if(response.data.aaData){
                    resolve({success: true, data: response.data});
                  }else if(response.data.status == "success") {
                      resolve({success: true, data: response.data.data , message: response.data.message});
                   }else if(response.data.status == "error" || response.data.status == false){
                    var $str = response.data.data;
                    if(typeof response.data.errorcode!=='undefined' && response.data.errorcode===409){
                      var msg = Object.entries(response.data.message);
                      console.log("message=",msg);
                      $str = '';
                      msg.map((msg, key)=>{
                        // console.log("api controller ".msg);
                        $str+=msg[1]+"<br>";
                      })
  
                      Swal.fire({
                        title: "Following Error Detected",
                        html: $str,
                        icon: "error",
                        showConfirmButton: false,
                      })
                    }else{
  
                      resolve({success: false, message: response.data.message, data: $str});
                    }
                   }else{
                    // Alert.alert(''+response.data.message);
                    resolve({success: false, data: response.data.message});
                   }                   
                  
                })
                .catch((err) => {
                  //resolve({success: false, data: err.message});
                  resolve({success: false, data:'Some Error occured!'});
                });
            } else {
              resolve({success: false, data: 'Some Error occured!'});
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
  
  
      
    }

  
  callAxiosFile(endPoint, reqData, auth=true){
    console.log( 'data', reqData)
      return new Promise((resolve, reject) => {
          Promise.all([this.getBaseUrl(),this.getToken()])
          .then(data => {
              console.log(reqData);
            
            // console.log('================================>');
            // console.log('URL: ' + data[0] + endPoint);
          //  console.log('TOKEN: ' + data[1]);
            // const reqDataHeader = {
            //   ...reqData,
            // };
            // console.log('Request Body : ' + JSON.stringify(reqDataHeader));
            // console.log('================================>');
            const authtoken = auth ?  'Bearer '+ data[1] : "";
            
            if ( data[0] != null) {
              console.log( { headers: { 'Content-Type': "multipart/form-data",
              'Authorization': authtoken}})
              axios
                .post(
                  data[0] + endPoint,
                   reqData,                    
                  {
                    headers: { 'Content-Type': "multipart/form-data",
                    'Authorization': authtoken
                  }
                }
                )
                .then((response) => {
                  //  console.log('Request Respomse', response);
                   if(response.data.access_token){ 
                    // let timeObject = new Date();
                    // let milliseconds= 3600 * 1000; // 10 seconds = 10000 milliseconds
                    // timeObject = new Date(timeObject.getTime() + milliseconds);
                    // localStorage.setItem('expire_token', timeObject);
                    resolve({success: true, access_token: response.data.access_token, data:response.data.data, message: response.data.message});
                   }else if(response.data.aaData){
                    resolve({success: true, data: response.data});
                  }else if(response.data.status == "success") {
                      resolve({success: true, data: response.data.data , message: response.data.message});
                   }else if(response.data.status == "error" || response.data.status == false){
                    var $str = response.data.data;
                    if(typeof response.data.errorcode!=='undefined' && response.data.errorcode===409){
                      var msg = Object.entries(response.data.message);
                      console.log("message=",msg);
                      $str = '';
                      msg.map((msg, key)=>{
                        console.log("api controller ".msg);
                        $str+=msg[1]+"<br>";
                      })
  
                      Swal.fire({
                        title: "Following Error Detected",
                        html: $str,
                        icon: "error",
                        showConfirmButton: false,
                      })
                    }else{
  
                      resolve({success: false, message: response.data.message, data: $str});
                    }
                   }else{
                    // Alert.alert(''+response.data.message);
                    resolve({success: false, data: response.data.message});
                   }                   
                  
                })
                .catch((err) => {
                  //resolve({success: false, data: err.message});
                  resolve({success: false, data:'Some Error occured!'});
                });
            } else {
              resolve({success: false, data: 'Some Error occured!'});
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
  
  
      
    }

  callAxiosGet(endPoint, auth=true){
    return new Promise((resolve, reject) => {
      Promise.all([this.getBaseUrl(),this.getToken()])
        .then(data => {
          console.log(data);
       //   console.log('================================>');
          console.log('URL: ' + data[0] + endPoint);
         // console.log('TOKEN: ' + data[1]);
          // const reqDataHeader = {
          //   ...reqData,
          // };
         //console.log('Request Body : ' + JSON.stringify(reqDataHeader));
       //   console.log('================================>');
          const authtoken = auth ?  'Bearer '+data[1] : "";
          if (data[0] && data[0] != null) {
            axios
              .get(
                data[0] + endPoint,                                     
                {
                  headers: { 'Content-Type': 'application/json',
                  'Authorization':authtoken
                }
              }
              )
              .then((response) => {
                // console.log('Request Respomse', response);
                 if(response.data.success){
                  resolve({success: true, data: response.data});
                 }else{
                  resolve({success: false, data: response.data});
                 }                   
                
              })
              .catch((err) => {
                //resolve({success: false, data: err.message});
                resolve({success: false, data:'Some Error occured!'});
              });
          } else {
            resolve({success: false, data: 'Some Error occured!'});
          }
        })
        .catch(err => {
          console.log(err);
          console.log(err);
        });
    });
  }
  callAxiosWithoutSession(endPoint, reqData){
    console.log(endPoint,' ',reqData)
    return new Promise((resolve, reject) => {
      Promise.all([this.getBaseUrl()])
        .then(data => {
      //    console.log(data);
         // console.log('================================>');
          console.log('URL: ' + data[0] + endPoint);
          const reqDataHeader = {
            ...reqData,
          };
          //console.log('Request Body : ' + JSON.stringify(reqDataHeader));
          //console.log('================================>');
          
          if (data[0] && data[0] != null) {
            axios
              .post(
                data[0] + endPoint,
                { ...reqData},                    
                axiosRequestConfig
              )
              .then((response) => {
             //    console.log('Request Respomse', response);
                 if(response.data.success){
                  resolve({success: true, data: response.data});
                 }else{
                  resolve({success: false, data: response.data});
                 }                   
                
              })
              .catch(err => {
               // console.log('Request Respomse', err);
               // resolve({success: false, data: err.message});
                resolve({success: false, data:'Some Error occured!'});
              });
          } else {
            resolve({success: false, data: 'Some Error occured!'});
          }
        })
        .catch(err => {
          console.log(err);
          console.log(err);
        });
    });
  }

  callAxiosGetWithoutSession(endPoint){
    console.log(endPoint)
    return new Promise((resolve, reject) => {
      Promise.all([this.getBaseUrl()])
        .then(data => {
       //   console.log(data);
        //  console.log('================================>');
       //   console.log('URL: ' + data[0] + endPoint);            
          
          if (data[0] && data[0] != null) {
            axios
              .get(
                data[0] + endPoint,                            
              )
              .then((response) => {
            //     console.log('Request Respomse', response);
                 if(response.data.success){
                  resolve({success: true, data: response.data});
                 }else{
                  resolve({success: false, data: response.data});
                 }                   
                
              })
              .catch(err => {
         //      console.log('Request Respomse', err);
               // resolve({success: false, data: err.message});
                resolve({success: false, data:'Some Error occured!'});
              });
          } else {
            resolve({success: false, data: 'Some Error occured!'});
          }
        })
        .catch(err => {
          console.log(err);
          console.log(err);
        });
    });
  }

}