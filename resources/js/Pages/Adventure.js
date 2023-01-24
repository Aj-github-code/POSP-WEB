import React from 'react'

import Adventureheadervideo from '../components/Adventure_header_video/Adventure_header_video'
import Plan_Your_Trip from '../components/Plan_Your_Trip/Plan_Your_Trip'
import PopularAdventuresTours from '../components/Popular_Adventures_Tours/Popular_Adventures_Tours'
import Callsection from '../components/Call_section/call_section'

function Adventure() {
  return (
    <>
        <Adventureheadervideo/>
        <PopularAdventuresTours/>
        <Plan_Your_Trip/>
        <Callsection/>

    </>
  )
}

export default Adventure