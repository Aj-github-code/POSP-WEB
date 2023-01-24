import React from 'react'
import "../../../css/Our_hotels.css"

import hotel_1 from "../../../assets/img/hotel_1.jpg";
import hotel_2 from "../../../assets/img/hotel_2.jpg";
import hotel_3 from "../../../assets/img/hotel_3.jpg";
import hotel_4 from "../../../assets/img/hotel_4.jpg";
import restaurant_1 from "../../../assets/img/restaurant_1.jpg";
import restaurant_2 from "../../../assets/img/restaurant_2.jpg";
import restaurant_3 from "../../../assets/img/restaurant_3.jpg";
import restaurant_4 from "../../../assets/img/restaurant_4.jpg";

function Our_hotels() {
  return (
    <div className="container container-custom margin_30_95">
			<section className="add_bottom_45">
				<div className="main_title_3">
					<span><em></em></span>
					<h2>Popular Hotels and Accommodations</h2>
					<p>Cum doctus civibus efficiantur in imperdiet deterruisset.</p>
				</div>
				<div className="row">
					<div className="col-xl-3 col-lg-6 col-md-6">
						<a href="hotel-detail.html" className="grid_item">
							<figure>
								<div className="score"><strong>8.9</strong></div>
								<img src={hotel_1} className="img-fluid" alt="" />
								<div className="info">
									<div className="cat_star"><i className="icon_star"></i><i className="icon_star"></i><i className="icon_star"></i><i className="icon_star"></i></div>
									<h3>Mariott Hotel</h3>
								</div>
							</figure>
						</a>
					</div>
					<div className="col-xl-3 col-lg-6 col-md-6">
						<a href="hotel-detail.html" className="grid_item">
							<figure>
								<div className="score"><strong>7.9</strong></div>
								<img src={hotel_2} className="img-fluid" alt="" />
								<div className="info">
									<div className="cat_star"><i className="icon_star"></i><i className="icon_star"></i><i className="icon_star"></i><i className="icon_star"></i></div>
									<h3>Concorde Hotel </h3>
								</div>
							</figure>
						</a>
					</div>
					<div className="col-xl-3 col-lg-6 col-md-6">
						<a href="hotel-detail.html" className="grid_item">
							<figure>
								<div className="score"><strong>7.0</strong></div>
								<img src={hotel_3} className="img-fluid" alt="" />
								<div className="info">
									<div className="cat_star"><i className="icon_star"></i><i className="icon_star"></i><i className="icon_star"></i><i className="icon_star"></i></div>
									<h3>Louvre Hotel</h3>
								</div>
							</figure>
						</a>
					</div>
					<div className="col-xl-3 col-lg-6 col-md-6">
						<a href="hotel-detail.html" className="grid_item">
							<figure>
								<div className="score"><strong>8.9</strong></div>
								<img src={hotel_4} className="img-fluid" alt="" />
								<div className="info">
									<div className="cat_star"><i className="icon_star"></i><i className="icon_star"></i><i className="icon_star"></i><i className="icon_star"></i></div>
									<h3>Park Yatt Hotel</h3>
								</div>
							</figure>
						</a>
					</div>
				</div>
				<a href="hotels-grid-isotope.html"><strong>View all (157) <i className="arrow_carrot-right"></i></strong></a>
			</section>
			
			<section className="add_bottom_45">
				<div className="main_title_3">
					<span><em></em></span>
					<h2>Popular Restaurants</h2>
					<p>Cum doctus civibus efficiantur in imperdiet deterruisset.</p>
				</div>
				<div className="row">
					<div className="col-xl-3 col-lg-6 col-md-6">
						<a href="restaurant-detail.html" className="grid_item">
							<figure>
								<div className="score"><strong>8.5</strong></div>
								<img src={restaurant_1} className="img-fluid" alt="" />
								<div className="info">
									<h3>Da Alfredo</h3>
								</div>
							</figure>
						</a>
					</div>
					<div className="col-xl-3 col-lg-6 col-md-6">
						<a href="restaurant-detail.html" className="grid_item">
							<figure>
								<div className="score"><strong>7.9</strong></div>
								<img src={restaurant_2} className="img-fluid" alt="" />
								<div className="info">
									<h3>Slow Food</h3>
								</div>
							</figure>
						</a>
					</div>
					<div className="col-xl-3 col-lg-6 col-md-6">
						<a href="restaurant-detail.html" className="grid_item">
							<figure>
								<div className="score"><strong>7.5</strong></div>
								<img src={restaurant_3} className="img-fluid" alt="" />
								<div className="info">
									<h3>Bella Napoli</h3>
								</div>
							</figure>
						</a>
					</div>
					<div className="col-xl-3 col-lg-6 col-md-6">
						<a href="restaurant-detail.html" className="grid_item">
							<figure>
								<div className="score"><strong>9.0</strong></div>
								<img src={restaurant_4} className="img-fluid" alt="" />
								<div className="info">
									<h3>Marcus</h3>
								</div>
							</figure>
						</a>
					</div>
				</div>
				<a href="restaurants-grid-isotope.html"><strong>View all (157) <i className="arrow_carrot-right"></i></strong></a>
			</section>

			<div className="banner mb-0">
				<div className="wrapper d-flex align-items-center opacity-mask" data-opacity-mask="rgba(0, 0, 0, 0.3)">
					<div>
						<small>Adventure</small>
						<h3>Your Perfect<br/>Advenure Experience</h3>
						<p>Activities and accommodations</p>
						<a href="adventure.html" className="btn_1">Read more</a>
					</div>
				</div>
			</div>

		</div>
  )
}

export default Our_hotels