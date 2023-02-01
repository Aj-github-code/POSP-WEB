import React from 'react'
import "../../../css/Popular_Adventures_Tours.css"

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import adventure_popular_1 from "../../../assets/img/adventure_popular_1.jpg"
import adventure_popular_2 from "../../../assets/img/adventure_popular_2.jpg"
import adventure_popular_3 from "../../../assets/img/adventure_popular_3.jpg"
import adventure_popular_4 from "../../../assets/img/adventure_popular_4.jpg"
import adventure_popular_5 from "../../../assets/img/adventure_popular_5.jpg"
import adventure_popular_6 from "../../../assets/img/adventure_popular_6.jpg"

import adventure_latest_1 from "../../../assets/img/adventure_latest_1.jpg"
import adventure_latest_2 from "../../../assets/img/adventure_latest_2.jpg"
import adventure_latest_3 from "../../../assets/img/adventure_latest_3.jpg"
import adventure_latest_4 from "../../../assets/img/adventure_latest_4.jpg"


function Popular_Adventures_Tours() {

	let settings = {
		dot: true,
		Infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		cssEase: "linear"
	}

  return (
    <div class="container container-custom margin_80_55">
			<section class="add_bottom_45">
				<div class="main_title_3">
					<span><em></em></span>
					<h2>Popular Adventures Tours</h2>
					<p>Cum doctus civibus efficiantur in imperdiet deterruisset.</p>
				</div>

				<div id="reccomended_adventure" class="owl-carousel owl-theme owl-loaded owl-drag owl-stage-outer owl-stage owl-item active" style={{ transition: "all 0s ease 0s", width: "1698px", transform: "translate3d(0px, 0px, 0px)" }}>
				<Slider {...settings}>
					<div class="item">
						<a href="adventure-detail.html" class="grid_item_adventure">
							<figure>
								<div class="score"><strong>7.9</strong></div>
								<img src={adventure_popular_1} class="img-fluid" alt="" />
								<div class="info">
									<em>3 days in Patagonia</em>
									<h3>Horseback ride through Valencia</h3>
								</div>
							</figure>
						</a>
					</div>

					<div class="item">
						<a href="adventure-detail.html" class="grid_item_adventure">
							<figure>
								<div class="score"><strong>9.0</strong></div>
								<img src={adventure_popular_2} class="img-fluid" alt="" />
								<div class="info">
									<em>2 days in Caribbean</em>
									<h3>Horseback ride through Valencia</h3>
								</div>
							</figure>
						</a>
					</div>

					<div class="item">
						<a href="adventure-detail.html" class="grid_item_adventure">
							<figure>
								<div class="score"><strong>9.5</strong></div>
								<img src={adventure_popular_3} class="img-fluid" alt="" />
								<div class="info">
									<em>2 days in Caribbean</em>
									<h3>Horseback ride through Valencia</h3>
								</div>
							</figure>
						</a>
					</div>

					<div class="item">
						<a href="adventure-detail.html" class="grid_item_adventure">
							<figure>
								<div class="score"><strong>9.0</strong></div>
								<img src={adventure_popular_4} class="img-fluid" alt="" />
								<div class="info">
									<em>2 days in Canada</em>
									<h3>Horseback ride through Valencia</h3>
								</div>
							</figure>
						</a>
					</div>

					<div class="item">
						<a href="adventure-detail.html" class="grid_item_adventure">
							<figure>
								<div class="score"><strong>9.0</strong></div>
								<img src={adventure_popular_5} class="img-fluid" alt="" />
								<div class="info">
									<em>3 days in Norway</em>
									<h3>Horseback ride through Valencia</h3>
								</div>
							</figure>
						</a>
					</div>

					<div class="item">
						<a href="adventure-detail.html" class="grid_item_adventure">
							<figure>
								<div class="score"><strong>8.5</strong></div>
								<img src={adventure_popular_6} class="img-fluid" alt="" />
								<div class="info">
									<em>3 days in Brasil</em>
									<h3>Horseback ride through Valencia</h3>
								</div>
							</figure>
						</a>
					</div>
				</Slider>
				</div>
				
			</section>
			

			<div class="banner">
				<div class="wrapper d-flex align-items-center opacity-mask" data-opacity-mask="rgba(0, 0, 0, 0.3)">
					<div>
						<small>Adventure</small>
						<h3>Your Perfect<br/>Advenure Experience</h3>
						<p>Activities and accommodations</p>
						<a href="adventure-detail.html" class="btn_1">Read more</a>
					</div>
				</div>
				
			</div>
			
			
			<section>
				<div class="main_title_3">
					<span><em></em></span>
					<h2>Last Added Adventures Tours</h2>
					<p>Cum doctus civibus efficiantur in imperdiet deterruisset.</p>
				</div>
				<div class="row">
					<div class="col-xl-3 col-lg-6 col-md-6">
						<a href="restaurant-detail.html" class="grid_item latest_adventure">
							<figure>
								<div class="score"><strong>8.5</strong></div>
								<img src={adventure_latest_1} class="img-fluid" alt="" />
								<div class="info">
									<em>2 days in United States</em>
									<h3>Canyoning El paso</h3>
								</div>
							</figure>
						</a>
					</div>
					
					<div class="col-xl-3 col-lg-6 col-md-6">
						<a href="restaurant-detail.html" class="grid_item latest_adventure">
							<figure>
								<div class="score"><strong>7.9</strong></div>
								<img src={adventure_latest_2} class="img-fluid" alt="" />
								<div class="info">
									<em>2 days in Canada</em>
									<h3>Camping and mountains</h3>
								</div>
							</figure>
						</a>
					</div>
					
					<div class="col-xl-3 col-lg-6 col-md-6">
						<a href="restaurant-detail.html" class="grid_item latest_adventure">
							<figure>
								<div class="score"><strong>7.5</strong></div>
								<img src={adventure_latest_3} class="img-fluid" alt="" />
								<div class="info">
									<em>1 days in United States</em>
									<h3>Route 66 Bike Riding</h3>
								</div>
							</figure>
						</a>
					</div>
					
					<div class="col-xl-3 col-lg-6 col-md-6">
						<a href="restaurant-detail.html" class="grid_item latest_adventure">
							<figure>
								<div class="score"><strong>9.0</strong></div>
								<img src={adventure_latest_4} class="img-fluid" alt="" />
								<div class="info">
									<em>2 days Belize</em>
									<h3>San Rafael Belize</h3>
								</div>
							</figure>
						</a>
					</div>
					
				</div>
				
				<a href="#0"><strong>View all (157) <i class="arrow_carrot-right"></i></strong></a>
			</section>
		
		</div>
  )
}

export default Popular_Adventures_Tours