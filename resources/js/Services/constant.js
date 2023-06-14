import React from "react";

let host = window.location.host;
let protocol = window.location.protocol;
let parts = host.split(".");
// var subdomain = "shubhauto";

var subdomain="sharvaautomobiles";
var domain = '2wh'
// var subdomain = "dealer-website";
// var domain = 'primarykeytech'
// If we get more than 3 parts, then we have a subdomain
// INFO: This could be 4, if you have a co.uk TLD or something like that.
if (parts.length >= 3) {
  if( parts[0] === 'www'){
    subdomain = parts[1];
    domain = parts[2];
  } else {
    subdomain = parts[0];
    domain = parts[1];
  }

  // subdomain = 'dealer-website';
  // Remove the subdomain from the parts list
  // parts.splice(0, 1);
  // Set the location to the new url
  // window.location = protocol + "//" + parts.join(".") + "/" + subdomain;
} 

var location = window.location.origin;
// console.log('location',location);
if(location.search('localhost') || location.search('127.0.')){
  location = 'https://online-exam.primarykeytech.in'
}
// BASE_URL: `http://127.0.0.1:8003/api`, //'https://primarykeytech.in/glocal/api',
export const API_CONSTANTS = {
  BASE_URL: `${location}/api/api/`, //'https://primarykeytech.in/glocal/api',
  URL:  `${location}/api`,
    login: "/login", //used
    refresh: "/refresh",
    setupList: "/setup/list",

    domain:domain,

    subdomain: `${subdomain}`,
   
}

