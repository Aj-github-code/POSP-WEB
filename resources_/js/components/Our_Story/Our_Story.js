import React from 'react'
import "../../../css/Our_Story.css"

import about_1 from "../../../assets/img/about_1.jpg"

function Our_Story() {
  return (
    <div class="bg_color_1">
			<div class="container margin_80_55">
				<div class="main_title_2">
					<span><em></em></span>
					<h2>Our Origins and Story</h2>
					<p>Cum doctus civibus efficiantur in imperdiet deterruisset.</p>
				</div>
				<div class="row justify-content-between">
					<div class="col-lg-6 wow animated" data-wow-offset="150" style={{ visibility: "visible" }}>
						<figure class="block-reveal">
							<div class="block-horizzontal"></div>
							<img src={about_1} class="img-fluid" alt="" />
						</figure>
					</div>
					<div class="col-lg-5">
						<p>Lorem ipsum dolor sit amet, homero erroribus in cum. Cu eos <strong>scaevola probatus</strong>. Nam atqui intellegat ei, sed ex graece essent delectus. Autem consul eum ea. Duo cu fabulas nonumes contentiones, nihil voluptaria pro id. Has graeci deterruisset ad, est no primis detracto pertinax, at cum malis vitae facilisis.</p>
						<p>Dicam diceret ut ius, no epicuri dissentiet philosophia vix. Id usu zril tacimates neglegentur. Eam id legimus torquatos cotidieque, usu decore <strong>percipitur definitiones</strong> ex, nihil utinam recusabo mel no. Dolores reprehendunt no sit, quo cu viris theophrastus. Sit unum efficiendi cu.</p>
						<p><em>CEO Marc Schumaker</em></p>
					</div>
				</div>
			
			</div>
			
		</div>
  )
}

export default Our_Story