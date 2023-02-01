import React from 'react'


export default function Card(props) {
  return (
    <>
        <div className="col-xl-3 col-sm-6 mb-3" >
          <div className={"card dashboard text-white  o-hidden h-100 bg-"+props.color}  >
            <div className="card-body">
              <div className="card-body-icon">
                <i className={"fa fa-fw fa-"+props.icon}></i>
              </div>
              <div className="mr-5"><h5>{props.title}</h5></div>
            </div>
            <a className="card-footer text-white clearfix small z-1" href={props.link}>
              <span className="float-left">View Details</span>
              <span className="float-right">
                <i className="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div>
    </>
  )
}
