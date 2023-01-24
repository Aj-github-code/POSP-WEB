import React from 'react'
import "../../../css/Adventure_header_video.css"

import video_fix from "../../../assets/img/video_fix.png"
// import videoadventure from "../../../assets/video/adventure.mp4"

function Adventure_header_video() {
  return (

    <section class="header-video adventure" style={{ width: "1519px", height: "424px" }}>
			<div id="hero_video">
				<div class="wrapper">
				<div class="container container-custom">
					<small>Introducing</small>
					<h3>Panagea Adventures</h3>
					<p>Hosted journeys to extraordinary and unique places.</p>
					<a href="adventure-detail.html" class="btn_1">Read more</a>
				</div>
			</div>
			</div>
        <img src={video_fix} alt="" class="header-video--media" data-video-src='../../assets/video/adventure' data-teaser-source='../../assets/video/adventure' data-provider="" data-video-width="1920" data-video-height="960" />
    </section>
  )
}

export default Adventure_header_video