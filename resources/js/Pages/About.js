import React from 'react'

import Aboutus from '../components/About_us/About_us'
import OurStory from '../components/Our_Story/Our_Story'
import WhyChoosePanagea from '../components/Why_Choose_Panagea/Why_Choose_Panagea'
// import '../../css/toTop.css'

function About() {
  return (
    <>
      <Aboutus />
      <WhyChoosePanagea />
      <OurStory />
      {/* <div id="toTop" style={{display: "none"}}></div> */}
    </>
  )
}

export default About