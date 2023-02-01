import React from 'react'


import BreadCrumb from '../BreadCrumb/BreadCrumb'
import Card from './Card'


import CardData from "./CardData"
import MetaAndTitle from '../../../MetaAndTitle'
export default function Dashboard() {


  return (
    <>
      <MetaAndTitle/>
      <BreadCrumb breadcrumb="Dashboard" breadcrumbItem1='My Dashboard' />
      <div className="row">
        {CardData.map((value, index) =>{
         return <Card icon={value.icon} color={value.color} key={index} title={value.title} link={value.link}/>
        })}
      </div>
    </>
  )
}
