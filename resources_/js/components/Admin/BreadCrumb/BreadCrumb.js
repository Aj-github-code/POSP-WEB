import React from 'react'

export default function BreadCrumb(props) {
  return (
    <>
       <ol className="breadcrumb" style={{backgroundColor:"#EEF5FF"}}>
            <li className="breadcrumb-item">
                <a href="#">{props.breadcrumb}</a>
            </li>
          
            {props.breadcrumbItem1 != null ? props.breadcrumbItem1.length > 0 ? <li className="breadcrumb-item active">{props.breadcrumbItem1}</li> : '' : ''
            }

            {props.breadcrumbItem2 != null ? props.breadcrumbItem2.length > 0 ? <li className="breadcrumb-item active">{props.breadcrumbItem2}</li> : '' : ''
            }
            {props.breadcrumbItem3 != null ? props.breadcrumbItem3.length > 0 ? <li className="breadcrumb-item active">{props.breadcrumbItem3}</li> : '' : ''
            }
       
        </ol>
    </>
  )
}
