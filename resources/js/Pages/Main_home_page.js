import React from 'react'
import Home from '../components/Home/Home'
import Newsevents from '../components/News_Events/News_events'

// import Ourhotels from '../components/Our_hotels/Our_hotels'
// import Callsection from '../components/Call_section/call_section'
// import OurPopularTours from '../components/Our_Popular_Tours/Our_Popular_Tours'


function Pages() {
  return (
    <>
    {/* <div>Home</div> */}
        <Home/>
       
        {/* <OurPopularTours /> */}
        {/* <Ourhotels/> */}
        <Newsevents/>
        {/* <Callsection/> */}
    </>
  )
}

export default Pages