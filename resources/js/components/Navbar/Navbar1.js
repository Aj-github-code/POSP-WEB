import React, { useState } from 'react'
import '../../../css/Navbar.css'

import { Link } from 'react-router-dom'

function Navbar(){

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
    <header>
   
		<nav id="menu" className="main-menu">
			
					<ul>
						<li><Link to="/">Home Default</Link></li>
					
						<li><Link to="/about">About</Link></li>
					</ul>
		</nav>
		
	</header>
  )
}

export default Navbar