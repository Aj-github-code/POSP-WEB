import React from 'react'
import adventure_icon_1 from "../../../assets/img/adventure_icon_1.svg"
import adventure_icon_2 from "../../../assets/img/adventure_icon_2.svg"
import adventure_icon_3 from "../../../assets/img/adventure_icon_3.svg"

function Plan_Your_Trip() {
  return (
    <div class="bg_color_1">
			<div class="container container-custom margin_80_55">
				<div class="main_title_2">
					<h2>Plan Your Trip Easly</h2>
					<p>Cum doctus civibus efficiantur in imperdiet deterruisset.</p>
				</div>
				<div class="row adventure_feat">
					<div class="col-md-4">
						<img src={adventure_icon_1} alt="" width="75" height="75" />
						<h3>Itineraries studied in detail</h3>
						<p>Ius cu tamquam persequeris, eu veniam apeirian platonem qui, id aliquip voluptatibus pri.</p>
					</div>
					<div class="col-md-4">
						<img src={adventure_icon_2} alt="" width="75" height="75" />
						<h3>Room and food included</h3>
						<p>His in harum errem dissentias, has mutat facilisi ea, ubique possim praesent eum ea.</p>
					</div>
					<div class="col-md-4">
						<img src={adventure_icon_3} alt="" width="75" height="75" />
						<h3>Everything organized</h3>
						<p>In ridens tamquam argumentum usu, ne ludus intellegebat vix. Eu inani omnes usu, an pri errem mucius.</p>
					</div>
				</div>
			</div>
		
		</div>
  )
}

export default Plan_Your_Trip