import React from 'react'


import BreadCrumb from '../Admin/BreadCrumb/BreadCrumb'
import Card from './Card'


import CardData from "./CardData"
// import MetaAndTitle from '../../../MetaAndTitle'
import MetaAndTitle from '../../MetaAndTitle'
export default function Dashboard() {


  return (
    <>
      <MetaAndTitle/>
      <BreadCrumb breadcrumb="Dashboard" breadcrumbItem1='My Dashboard' />
      <div className="row" style={{    marginTop: "98px"}}>
        {CardData.map((value, index) =>{
         return <Card icon={value.icon} color={value.color} key={index} title={value.title} link={value.link} link_text={value.link_text}/>
        })}
      </div>
    </>
  )
}
