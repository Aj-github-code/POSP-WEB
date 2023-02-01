import React, { useState } from 'react'
import "../../../css/Style.css"


import logo from "../../../assets/img/logo.png";
import logo_sticky from "../../../assets/img/logo_sticky.png";
import { Link } from 'react-router-dom';
import Login from "../Login/Login";
import Modals from "../Modal/Modals";
function Navbar(){

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
    <header className={color ? 'header header-sticky' : 'header'}>
			<Link to="/">
		<div id="logo">
				<p style={{marginLeft:"15px", color:"white", height:"20px",fontSize:25, fontWeight:"bold"}}>POSP Training</p>
				{/* <img src={logo} width="150" height="36" alt="" className="logo_normal" />
				<img src={logo_sticky} width="150" height="36" alt="" className="logo_sticky" /> */}
		</div>
			</Link>
    <ul id="top_menu">
			{/* <li><a href="cart-1.html" className="cart-menu-btn" title="Cart"><i className="fa fa-fw fa-shopping-cart"></i></a></li>
			<li><a href="#" className="wishlist_bt_top" title="Your wishlist"><i className="fa fa-fw fa-shopping-bag"></i></a></li> */}
			<li><a className="login" id="sign-in" title="Logout"   onClick={()=>{localStorage.clear(), location.reload('/')}}><i className="fa fa-fw fa-sign-in"></i></a></li>
			{/* onClick={() => setmodal(true)} */}
			{/* <li><a href="cart-1.html" style={{height:'10px'}} className="fa fa-fw fa-shopping-cart" title="Cart"> </a>   </li>
			<li><a className="fa fa-fw fa-sign-in" id="sign-in"   onClick={() => setmodal(true)} ></a></li>
			<li><a href="wishlist.html" className="fa fa-fw fa-shopping-bag" title="Your wishlist"></a></li> */}
		</ul>

    <a href="#menu" className="btn_mobile">
			<div className="hamburger hamburger--spin" id="hamburger">
				<div className="hamburger-box">
					<div className="hamburger-inner"></div>
				</div>
			</div>
		</a>
		<nav id="menu" className="main-menu">
			<ul>
						{/* <li><span><Link to="/">Home Default</Link></span></li> */}
				
		
				<li><span><Link to="/">Courses</Link></span></li>
			
				<li><span><a href="#">Others</a></span></li>
			</ul>
		</nav>
		<Modals toggle={() => setmodal(!modal)} isOpen={modal} content={<Login />}></Modals>
		
	</header>

  )
}

export default Navbar