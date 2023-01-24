import React, { useState } from 'react'
import "../../../css/Home.css"

// import $ from 'jquery';
// import { DateRangePicker } from 'rsuite'
// import 'rsuite/dist/rsuite-rtl.css'
import DateRangePicker from 'react-bootstrap-daterangepicker';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';

function Home() {
	const [isActive, setIsActive] = useState(false);
  return (
    <>
    <section className="hero_single version_2">
			<div className="wrapper">
				<div className="container">
					<h3>Book unique experiences</h3>
					<p>Expolore top rated tours, hotels and restaurants around the world</p>
					<form>
						<div className="row no-gutters custom-search-input-2">
							<div className="col-lg-4">
								<div className="form-group">
									<input className="form-control" type="text" placeholder="Hotel, City..." />
									<i className="icon_pin_alt"></i>
								</div>
							</div>
							<div className="col-lg-3">
								<div className="form-group">
								{/* <label>When...</label> */}
									<DateRangePicker>
										<label><i className="icon_calendar"></i></label>
									{/* <input className="form-control" type="text" name="dates" placeholder="When.." /> */}
									{/* <i className="icon_calendar"></i> */}
									</DateRangePicker>
								</div>
							</div>
							<div className="col-lg-3">
								<div className="panel-dropdown" onClick={(e) => setIsActive(!isActive)}>
									<a href="/">Guests <span className="qtyTotal">1</span></a></div>
									{isActive && (<div className="panel-dropdown-content">
										
										<div className="qtyButtons">
											<label>Adults</label>
											<input type="text" name="qtyInput" value="1" />
										</div>
										<div className="qtyButtons">
											<label>Childrens</label>
											<input type="text" name="qtyInput" value="0" />
										</div>
									</div>
									)}
								
								</div>
							<div className="col-lg-2">
								<input type="submit" className="btn_search" value="Search" />
							</div>
						</div>
						
					</form>
				</div>
			</div>
		</section>
		
		
    </>
	
  )
  

  
}

export default Home