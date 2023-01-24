import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "../../../css/Our_Popular_Tours.css"

import TestiMonialsDetails from '../TestiMonialsDetails/TestiMonialsDetails'


import tour_1 from "../../../assets/img/tour_1.jpg"
import tour_2 from "../../../assets/img/tour_2.jpg"
import tour_3 from "../../../assets/img/tour_3.jpg"
import tour_4 from "../../../assets/img/tour_4.jpg"
import tour_5 from "../../../assets/img/tour_5.jpg"


	const TestiMonials = () => {
  
		const testiMonials = [
			{
				small_name: 'Historic',
				name: 'Arc Triomphe',
				description: 'Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cu.',
				img: tour_1,
				price: '$54',
				score: '8.9'
			},
			{
				small_name: 'Churches',
				name: 'Notredam',
				description: 'Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cu.',
				img: tour_2,
				price: '$124',
				score: '7.0'
			},
			{
				small_name: 'Historic',
				name: 'Versailles',
				description: 'Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cu.',
				img: tour_3,
				price: '$25',
				score: '8.9'
			},
			{
				small_name: 'Museum',
				name: 'Pompidue Museum',
				description: 'Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cu.',
				img: tour_4,
				price: '$45',
				score: '9.0'
			},{
				small_name: 'Walking',
				name: 'Tour Eiffel',
				description: 'Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cu.',
				img: tour_5,
				price: '$65',
				score: '7.5'
			},{
				small_name: 'Testing',
				name: 'Tour Eiffel',
				description: 'Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cu.',
				img: tour_5,
				price: '$65',
				score: '7.5'
			},
		]
		//Owl Carousel Settings
		const options = {
			loop: true,
			center: true,
			items: 5,
			margin: 0,
			dots: true,
			
			nav: false,
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 3
				},
				1000: {
					items: 4
				}
			}
		};

  return (
    <>
    <div className="container container-custom margin_80_0">
			<div className="main_title_2">
				<span><em></em></span>
				<h2>Our Popular Tours</h2>
				<p>Cum doctus civibus efficiantur in imperdiet deterruisset.</p>
			</div>
			<div id="reccomended" className="owl-carousel owl-theme owl-loaded owl-drag">
				<div className='owl-stage-outer'>
					<div className='owl-stage'>
					<OwlCarousel id="customer-testimonoals" className="owl-carousel owl-theme" {...options}>
                            {
                                testiMonials.length === 0 ?
									<div className="item">
										<div className="box_grid">
											<figure>
												<a href="/" className="wish_bt"></a>
												<a href="tour-detail.html"><img src={tour_1} className="img-fluid" alt="" width="800" height="533" /><div className="read_more"><span>Read more</span></div></a>
												<small>Historic</small>
											</figure>
											<div className="wrapper">
												<h3><a href="tour-detail.html">Arc Triomphe</a></h3>
												<p>Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cu.</p>
												<span className="price">From <strong>$54</strong> /per person</span>
											</div>
											<ul>
												<li><i className="icon_clock_alt"></i> 1h 30min</li>
												<li><div className="score"><span>Superb<em>350 Reviews</em></span><strong>8.9</strong></div></li>
											</ul>
										</div>
									</div>:
									testiMonials.map(testiMonialDetail => {
										return (
											<TestiMonialsDetails testiMonialDetail={testiMonialDetail} key={testiMonialDetail._key} />

										)
									})
							}
						</OwlCarousel>
						
					</div>
				</div>
			</div>
			<p className="btn_home_align"><a href="tours-grid-isotope.html" className="btn_1 rounded">View all Tours</a></p>
			<hr className="large" />
		</div>
        </>
  )
}

export default TestiMonials