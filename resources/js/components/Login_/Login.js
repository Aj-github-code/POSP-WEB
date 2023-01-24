import React, {useState} from 'react'
import logo_sticky from "../../../assets/img/logo_sticky.png";
// import "../../../css/Home.css"
import "../../../css/Style.css"
// import $ from 'jquery';
// import { DateRangePicker } from 'rsuite'
// import 'rsuite/dist/rsuite-rtl.css'
import DateRangePicker from 'react-bootstrap-daterangepicker';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import axios from 'axios';

export default function Login() {

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const handleemail = (event) => {
		setEmail(event.target.value);
	  }
	  const handlepassword = (event) => {
		setPassword(event.target.value);
	  }
	var data = JSON.stringify({
		"email": email,
		"password": password
	  });
	  
	  var config = {
		method: 'post',
		url: 'https://primarykeytech.in/glocal/api/api/login',
		headers: { 
		  'Content-Type': 'application/json'
		},
		data : data
	  };
  
	  

	  
	  const submitLogin= async (e) => {
		e.preventDefault();
		axios(config)
		.then(function (response) {
		  var res = response.data;
		  console.log(res);
		  if(res.data.token !== ''){
			  var token = res.data.token;
			  console.log(token)
			  alert('Login Successfull')
		  } else {
			  if(res.status === "success") {
			  } else {
				alert(res.message);
			  }
			}
		  })
		  .catch(function (error) {
			console.log(error);
		  });
  

	  }

  return (
    <div>
        <div id="sign-in-dialog" className="zoom-anim-dialog mfp-hide">
		<div className="small-dialog-header">
			<h3>Sign In</h3>
		</div>
		<form onSubmit={submitLogin}>
			<div className="sign-in-wrapper">
				<a href="#0" className="social_bt facebook">Login with Facebook</a>
				<a href="#0" className="social_bt google">Login with Google</a>
				<div className="divider"><span>Or</span></div>
				<div className="form-group">
					<label>Email</label>
					<input type="email" className="form-control" onChange={(e)=> handleemail(e)} name="email" id="email"/>
					<i className="icon_mail_alt"></i>
				</div>
				<div className="form-group">
					<label>Password</label>
					<input type="password" className="form-control" onChange={(e)=> handlepassword(e)}  name="password" id="password" />
					<i className="icon_lock_alt"></i>
				</div>
				<div className="clearfix add_bottom_15">
					<div className="checkboxes float-left">
						<label className="container_check">Remember me
						  <input type="checkbox"/>
						  <span className="checkmark"></span>
						</label>
					</div>
					<div className="float-right mt-1"><a id="forgot" href="javascript:void(0);">Forgot Password?</a></div>
				</div>
				<div className="text-center"><input type="submit" value="Log In" className="btn_1 full-width" /></div>
				<div className="text-center">
					Don’t have an account? <a href="register.html">Sign up</a>
				</div>
				<div id="forgot_pw">
					<div className="form-group">
						<label>Please confirm login email below</label>
						<input type="email" className="form-control" name="email_forgot" id="email_forgot" />
						<i className="icon_mail_alt"></i>
					</div>
					<p>You will receive an email containing a link allowing you to reset your password to a new preferred one.</p>
					<div className="text-center"><input type="submit" value="Reset Password" className="btn_1" /></div>
				</div>
			</div>
		</form>

	</div>
    </div>
  )
}
