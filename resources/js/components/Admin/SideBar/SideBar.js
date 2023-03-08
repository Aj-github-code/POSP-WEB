import React from 'react'
import { Link } from 'react-router-dom'

export default function SideBar() {
  return (
    <>
    <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
        <li className="nav-item" data-toggle="tooltip" data-placement="right" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  title="Dashboard">
        
        <Link className="nav-link" to="/">
            <i className="fa fa-fw fa-dashboard"></i>
            <span className="nav-link-text">&nbsp;Dashboard</span>
          </Link>
         
        </li>
   
      
        <li className="nav-item" data-toggle="tooltip" style={{borderBottomColor:"#1F5B54", borderBottomWidth:"thin"}}  data-placement="right" title="My listings">
          <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMylistings">
            <i className="fa fa-fw fa-list"></i>
            <span className="nav-link-text">&nbsp;Master List</span>
          </a>
          <ul className="sidenav-second-level collapse" id="collapseMylistings">
            <li>
              <Link to="/user-list/admin">Admin List</Link>
            </li>
            <li>
              <Link to="/user-list/posp">POSP List</Link>
            </li>
           
            <li>
              {/* <a >Expired <span className="badge badge-pill badge-danger">6</span></a> */}
            </li>
          </ul>
        </li>

        <li className="nav-item" data-toggle="tooltip" style={{borderBottomColor:"#1F5B54", borderBottomWidth:"thin"}}  data-placement="right" title="My listings">
          <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMylistingss">
            <i className="fa fa-fw fa-list"></i>
            <span className="nav-link-text">&nbsp;Master Tag</span>
          </a>
          <ul className="sidenav-second-level collapse" id="collapseMylistingss">
            <li>
              <Link to="/tag-list">Tag List</Link>
            </li>
            
           
            <li>
              {/* <a >Expired <span className="badge badge-pill badge-danger">6</span></a> */}
            </li>
          </ul>
        </li>

        <li className="nav-item" data-toggle="tooltip" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  data-placement="right" title="My listings">
          <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMylisting">
            <i className="fa fa-fw fa-list"></i>
            <span className="nav-link-text">&nbsp;Exams </span>
          </a>
          <ul className="sidenav-second-level collapse" id="collapseMylisting">
            <li>
              <Link to="/result-list">Result List</Link>
            </li>
           
           
            <li>
              {/* <a >Expired <span className="badge badge-pill badge-danger">6</span></a> */}
            </li>
          </ul>
        </li>
        <li className="nav-item" data-toggle="tooltip" data-placement="right" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  title="Excel Upload">
        
        <Link className="nav-link" to="/excel-uplaod">
            <i className="fa fa-fw fa-upload"></i>
            <span className="nav-link-text">&nbsp;Excel Upload</span>
          </Link>
         
        </li>
    
       
       
        <li className="nav-item" data-toggle="tooltip" data-placement="right" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  title="Courses">
        
        <Link className="nav-link" to="/courses">
            <i className="fa fa-fw fa-book"></i>
            <span className="nav-link-text">&nbsp;Courses</span>
          </Link>
         
        </li>
        <li className="nav-item" data-toggle="tooltip" data-placement="right" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  title="Courses">
        
        <Link className="nav-link" to="/training">
            <i className="fa fa-fw fa-book"></i>
            <span className="nav-link-text">&nbsp;Training</span>
          </Link>
         
        </li>
        {/* <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Courses">
          <Link to="/courses">
            <a className="nav-link" >
              <i className="fa fa-fw fa-b"></i>
              <span className="nav-link-text">Courses</span>
            </a>
          </Link>
        </li> */}

	{/* 	<li className="nav-item" data-toggle="tooltip" data-placement="right" title="" data-original-title="Bookings">
          <a className="nav-link" href="bookings.html">
            <i className="fa fa-fw fa-calendar-check-o"></i>
            <span className="nav-link-text">Bookings <span className="badge badge-pill badge-primary">6 New</span></span>
          </a>
        </li>
		<li className="nav-item" data-toggle="tooltip" data-placement="right" title="Reviews">
          <a className="nav-link" href="reviews.html">
            <i className="fa fa-fw fa-star"></i>
            <span className="nav-link-text">Reviews</span>
          </a>
        </li>
		<li className="nav-item" data-toggle="tooltip" data-placement="right" title="Bookmarks">
          <a className="nav-link" href="bookmarks.html">
            <i className="fa fa-fw fa-heart"></i>
            <span className="nav-link-text">Bookmarks</span>
          </a>
        </li>
		<li className="nav-item" data-toggle="tooltip" data-placement="right" title="Add listing">
          <a className="nav-link" href="add-listing.html">
            <i className="fa fa-fw fa-plus-circle"></i>
            <span className="nav-link-text">Add listing</span>
          </a>
        </li>
		<li className="nav-item" data-toggle="tooltip" data-placement="right" title="My profile">
          <a className="nav-link" href="user-profile.html">
            <i className="fa fa-fw fa-user"></i>
            <span className="nav-link-text">My Profile</span>
          </a>
        </li>
		<li className="nav-item" data-toggle="tooltip" data-placement="right" title="Components">
          <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseComponents">
            <i className="fa fa-fw fa-gear"></i>
            <span className="nav-link-text">Components</span>
          </a>
          <ul className="sidenav-second-level collapse" id="collapseComponents">
            <li>
              <a href="charts.html">Charts</a>
            </li>
			<li>
              <a href="tables.html">Tables</a>
            </li>
          </ul>
        </li> */}
      </ul>
      <ul className="navbar-nav sidenav-toggler">
        <li className="nav-item">
          <a className="nav-link text-center" id="sidenavToggler">
            <i className="fa fa-fw fa-angle-left"></i>
          </a>
        </li>
      </ul>
    </>
  )
}
