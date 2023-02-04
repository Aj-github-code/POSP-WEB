import React, { useState } from 'react'
import "../../../css/Style.css"
import  "../../../assets/vendors.css"
// import  "../../../assets/js/common_scripts.js"
// import  "../../../assets/js/main.js"

import logo from "../../../assets/img/logo.png";
import logo_sticky from "../../../assets/img/logo_sticky.png";
import { Link } from 'react-router-dom';
import Login from "../Login/Login";
import Modals from "../Modal/Modals";
import { useNavigate } from 'react-router-dom';
function Navbar(){

	const navigation = useNavigate();

	const [modal, setmodal] = useState(false)

	const [color, setColor] = useState(false);
	const changeColor = () => {
		if(window.scrollY >= 70){
			setColor(true)
		}else{
			setColor(false)
		}
	}

	window.addEventListener('scroll', changeColor);

  return (
    <header className={'header '}>
		{/* <div id="preloader"><div data-loader="circle-side"></div></div> */}
			<Link to="/">
		<div id="logo">
				<p style={{marginLeft:"15px", color:"white", height:"20px",fontSize:25, fontWeight:"bold"}}>POSP Training</p>
				{/* <img src={logo} width="150" height="36" alt="" className="logo_normal" />
				<img src={logo_sticky} width="150" height="36" alt="" className="logo_sticky" /> */}
		</div>
			</Link>


    <a href="#menu" className="btn_mobile">
			<div className="hamburger hamburger--spin" id="hamburger">
				<div className="hamburger-box">
					<div className="hamburger-inner"></div>
				</div>
			</div>
		</a>
		<nav id="menu" className="main-menu">
			<ul>
			<li><span><a href="dashboard">Dashboard</a></span></li>
						{/* <li><span><Link to="/">Training</Link ></span></li> */}
						<li><span><a href="/">Training</a></span></li>
				
		
				{/* <li><span><Link to="/courses">Courses</Link></span></li> */}
				<li><span><a href="/courses">Courses</a></span></li>
			
				<li><span><a href="/training/result-history">Past Score</a></span></li>
			<li><a className="login" id="sign-in" title="Logout" style={{color:'white'}}   onClick={()=>{localStorage.clear(),  navigation('/'), location.reload('/')}}><i className="fa fa-fw fa-sign-in"></i></a></li>

			</ul>
		</nav>
		<Modals toggle={() => setmodal(!modal)} isOpen={modal} content={<Login />}></Modals>
		
	</header>

  )
}

export default Navbar
