import { useState } from "react";
import axios from "axios";
import '../../../css/Style.css'

import logo from "../../../assets/img/logo_sticky.svg"
// import Facebook from "../../../Social_apps/Facebook";
// import Google from "../Social_apps/Google";

function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  console.log({ email, password })
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleApi = () => {
    console.log({ email, password })
    axios.post('https://reqres.in/api/login', {
      email: email,
      password: password
    }).then(result => {
      console.log(result.data)
      alert('success')
    })
      .catch(error => {
        alert('service error')
        console.log(error)
      })
  }

  return (

      <body id="login_bg">
	
	<nav id="menu" className="fake_menu"></nav>
	<div className="Login">
	<div id="login">
		<aside>
			<figure>
				<a href="index.html"><img src={logo} width="155" height="36" alt="" className="logo_sticky" /></a>
			</figure>
				<div className="access_social">
					<a href="#" className="social_bt facebook">Facebook </a>
					<a href="#" className="social_bt google">Google </a>
					<a href="#0" className="social_bt linkedin">Login with Linkedin</a>
				</div>
				<div className="divider"><span>Or</span></div>
				<div className="form-group">
					<label>Email</label>
					<input type="text" className="form-control" value={email} onChange={handleEmail} />
					<i className="icon_mail_alt"></i>
				</div>
				<div className="form-group">
					<label>Password</label>
					<input type="password" className="form-control" value={password} onChange={handlePassword} />
					<i className="icon_lock_alt"></i>
				</div>
				<div className="clearfix add_bottom_30">
					<div className="checkboxes float-left">
						<label className="container_check">Remember me
						  <input type="checkbox" />
						  <span className="checkmark"></span>
						</label>
					</div>
					<div className="float-right mt-1"><a id="forgot" href="/">Forgot Password?</a></div>
				</div>
				<button className="btn_1 rounded full-width" onClick={handleApi}>Login to Panagea</button>
				<div className="text-center add_top_10">New to Panagea? <strong><a href="register.html">Sign up!</a></strong></div>
			<div className="copy">© 2018 Panagea</div>
		</aside>
	</div>

	</div>
    </body>
   
  );
}

export default SignUp;

