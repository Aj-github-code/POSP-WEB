import React, { useEffect, useState } from 'react'
import "../../../css/Style.css"
import  "../../../assets/vendors.css"
import { ProfileImage } from '../Admin/Pages/ProfileImage/ProfileImage'
// import  "../../../assets/js/common_scripts.js"
// import  "../../../assets/js/main.js"
import './profile.css'

import logo from "../../../assets/img/logo.png";
import logo_sticky from "../../../assets/img/logo_sticky.png";
import { Link } from 'react-router-dom';
import Login from "../Login/Login";
import Modals from "../Modal/Modals";
import { useNavigate } from 'react-router-dom';
import Api from '../../api'
import Swal from 'sweetalert2'
import Crypt from '../../Services/Crypt'

function Navbar(props){

	const cryptCtrl = new Crypt;
   
	const navigation = useNavigate();
	const apiCtrl=new Api

	const [modal, setmodal] = useState(false)

	const [color, setColor] = useState(false);
	const  [state,setState] =useState({
		id:""
	})
	
	const changeColor = () => {
		if(window.scrollY >= 70){
			setColor(true)
		}else{
			setColor(false)
		}
	}
     
	$(document).on('click', '.log-out', function(e){
		e.preventDefault();
		e.stopPropagation();
		console.log('logout')
		apiCtrl.callAxios('logout', {}).then((res)=>{
            if(res.success == true){

                
            } else {
                Swal.fire({
                    title: "Logout",
                    text: "Unable To Logout",
                    icon: "error",
                    timer: 3000,
                    showConfirmButton: false,
                })
            }
        })
		setTimeout(()=>{
			localStorage.clear()
			navigation('/')
			location.reload('/')
		},4000)

	})
	
	useEffect(()=>{
			var x = cryptCtrl.decrypt(localStorage.getItem("posp_user_details"));


			let localdata=JSON.parse(x) 
			const data={
				email:localdata.email
				
			}
			apiCtrl.callAxios("users/myprofile",data).then(res=>{
	
			//	console.log("response=>",res)
				setState({...res.data})
	
			})
		
	},[state.id])

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
				<li>
					<Link to={"/my-profile"}> 
						<div className="dropdown" >
							<div className="btn dropbtn"   >
								<div className="d-flex mr-auto">
									{/* <div className="profile-img me-2">
									<img width="50" height="50" src={"https://www.w3schools.com/howto/img_avatar.png"} />
									</div>
									{"nikhil"} */}
									<div className="img-nav me-2">
									<img style={{borderRadius: "55%"}} width="50" height="50" src={state.profile_image?state.profile_image:props.data.profile_image?props.data.profile_image:"https://www.w3schools.com/howto/img_avatar.png"} />
									{/* <ProfileImage   borderRadius={"55%"}  width={'50'} height={'50'}/> */}
									&nbsp;&nbsp;<span style={{color:"#ffff"}}>{state.name?state.name:props.data.name}</span>
									</div>
									
								</div>
							</div>
		
						</div>
					</Link>
				   
				</li>
			<li><span><a className="login log-out" id="logout" title="Logout"  href=''>Logout <i className="fa fa-fw fa-sign-in"></i></a></span></li>

			</ul>
			
		</nav>
		<Modals toggle={() => setmodal(!modal)} isOpen={modal} content={<Login />}></Modals>
		
	</header>

  )
}


export default Navbar


