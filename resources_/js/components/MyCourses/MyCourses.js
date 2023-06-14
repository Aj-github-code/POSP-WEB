import React from 'react'

import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Api from '../../api';
import Swal from 'sweetalert2';

export default function MyCourses() {
    const [courses, setCourses] = React.useState({});
    const [btnVariant1, setBtnVariant1] = React.useState({variant:'outlined', backgroundColor:"#1F5B54"});
    const [btnVariant2, setBtnVariant2] = React.useState({variant:'contained', backgroundColor:"#1F5B54"});
    const [btnVariant3, setBtnVariant3] = React.useState({variant:'contained', backgroundColor:"#1F5B54"});

    const apiCtrl = new Api;
    React.useEffect(()=>{
        handleCampaign('all');
    },[])
    const handleCampaign = (filter) => {
        apiCtrl.callAxios('get-campaign', {assigned:filter}).then((res)=>{
            // console.log('Response ',res);
            if(res.success == true){
                setCourses({...res.data});
            }
        })
    }

  return (
    <>
         
		
        {/* <section className="hero_in restaurants">
            <div className="wrapper">
                <div className="container">
                    <h1 className="fadeInUp"><span></span>Paris Eat &amp; Drink list</h1>
                </div>
            </div>
        </section> */}
        
{/*         
        <div className="filters_listing sticky_horizontal" style={{marginTop:'10%'}}>
            <div className="container">
                <ul className="clearfix">
                    <li>
                        <div className="switch-field">
                            <input type="radio" id="all" name="listing_filter" value="all" checked data-filter="*" className="selected" />
                            <label for="all">All</label>
                            <input type="radio" id="popular" name="listing_filter" value="popular" data-filter=".popular" />
                            <label for="popular">Popular</label>
                            <input type="radio" id="latest" name="listing_filter" value="latest" data-filter=".latest" />
                            <label for="latest">Latest</label>
                        </div>
                    </li>
                    <li>
                        <div className="layout_view">
                            <a href="restaurants-grid-isotope.html"><i  className="fa fa-fw fa-th"></i></a>
                            <a href="#0" className="active"><i className="fa fa-fw fa-list"></i></a>
                        </div>
                    </li>
               
                </ul>
            </div>
            
        </div>
        
        
        <div className="collapse" id="collapseMap">
            <div id="map" className="map"></div>
        </div>
         */}
    
        <div className="container margin_60_35" style={{marginTop:'5%'}} >
            <div className="row">
                <div className="col-lg-12">
                <Button onClick={()=>{handleCampaign('all')}} variant={btnVariant1.variant} style={{ backgroundColor: `${btnVariant1.backgroundColor}`, borderColor:"#1F5B54", borderRadius:'20px'}} onMouseLeave={()=>{setBtnVariant1({variant:'contained', backgroundColor:"#1F5B54"})}}  onMouseEnter={()=>{setBtnVariant1({variant:'outlined', borderColor:"#1F5B54", backgroundColor: 'white'})}} >All</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={()=>{handleCampaign('admin')}}  variant={btnVariant2.variant} style={{ backgroundColor: `${btnVariant2.backgroundColor}`, borderColor:"#1F5B54", borderRadius:'20px'}} onMouseLeave={()=>{setBtnVariant2({variant:'contained', backgroundColor:"#1F5B54"})}}  onMouseEnter={()=>{setBtnVariant2({variant:'outlined', borderColor:"#1F5B54", backgroundColor: 'white'})}} >Assigned By Admin</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={()=>{handleCampaign('self')}}  variant={btnVariant3.variant} style={{ backgroundColor: `${btnVariant3.backgroundColor}`, borderColor:"#1F5B54",  borderRadius:'20px'}} onMouseLeave={()=>{setBtnVariant3({variant:'contained', backgroundColor:"#1F5B54"})}}  onMouseEnter={()=>{setBtnVariant3({variant:'outlined', borderColor:"#1F5B54", backgroundColor: 'white'})}} >Self Enrolled</Button>&nbsp;&nbsp;&nbsp;&nbsp;
      
                </div>
            </div>
        <div className="col-lg-12 d-flex" style={{justifyContent:"right"}}>
                <div className="row no-gutters custom-search-input-2 inner">
                    <div className="col-lg-8">
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="What are you looking for..." />
                            <i className="icon_search"></i>
                        </div>
                    </div>
                    {/* <div className="col-lg-3">
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Where" />
                            <i className="fa fa-fw fa-map-marker"></i>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <select className="wide">
                            <option>All Categories</option>	
                            <option>Restaurants</option>
                            <option>Bars</option>
                            <option>Coffee Bars</option>
                        </select>
                    </div> */}
                    <div className="col-lg-4">
                        <input type="submit" className="btn_search" value="Search" />
                    </div>
                </div>
                
            </div>
            
            <div className="isotope-wrapper">
                <div className="row">
                {
                    Object.entries(courses).map(([index, value])=>{
                        var values = JSON.parse(value.other_parameter)
                        const {system_settings, user_parameters, campaign } = values;
            //  console.log('Value ', values)
                        
                        return(
                                <div class="col-xl-4 col-lg-6 col-md-6 isotope-item popular">
                                    <div class="box_grid">
                                        <Link 
                                            to={{
                                            pathname: '/exam',
                                            state: {data:value}}} state={{ value }} >
                                        <figure>
                                            <video src={`${value.video}`} className="img-fluid"  alt="" width="800" height="533"  />

                                            <small title={value.assigned_name}>Assigned By: {value.role_name}</small>
                                        </figure>
                                        </Link>
                                        <div class="wrapper" >
                                             
                                            <h4 style={{ color: '#1F5B54'}}>{campaign.title.toUpperCase()}</h4>
                                            <p>Time: <strong>{system_settings.exam_time.split(':').reduce((acc,time) => (60 * acc) + +time)/(60 * 60)} Hours</strong></p>
                                         
                                            <span className="price">Total Marks: <strong>{system_settings.total_marks}</strong>, Passing: <strong style={{color:'red'}}>{system_settings.passing_marks}</strong></span>
                                       
                                        </div>
                                        <ul>
                                        
                                             <li></li>
                                           
                                        </ul>
                                    </div>
                                            
                                </div>
                            // <div className="box_list isotope-item popular">
                            //     <div className="row no-gutters">
                            //         <div className="col-lg-5">
                            //             <figure>
                            //                 <small>{value.campaign_type}</small>
                            //                  <video src={`${value.video}`} className="img-fluid"  alt="" width="800" height="533"  />
                            //                 <a href="#"> 
                            //                 {/* <i style={{ color: '#1F5B54', position:'absolute', top:0, bottom:0, margin: 'auto 0'}} className="fa fa-fw fa-play"></i> */}
                            //                 {/* <img src={restaurant_1} /> */}
                            //                 <div className="read_more">
                            //                     <span>Read more</span></div></a>
                            //             </figure>
                            //         </div>
                            //         <div className="col-lg-7">
                            //             <div className="wrapper">
                            
                            //                 {/* <a href="#0" className="wish_bt"><i style={{ color: '#1F5B54'}} className="fa fa-fw fa-pin"></i></a> */}
                            //                 <h3 style={{ color: '#1F5B54'}}>{campaign.reference_type.toUpperCase()}</h3>
                            //                 <p>Time: <strong>{system_settings.exam_time.split(':').reduce((acc,time) => (60 * acc) + +time)/(60 * 60)} Hours</strong></p>
                            //                 {/* <p>Dicam diceret ut ius, no epicuri dissentiet philosophia vix. Id usu zril tacimates neglegentur. Eam id legimus torquatos cotidieque, usu decore percipitur definitiones ex, nihil utinam recusabo mel no.</p> */}
                            //                 <span className="price">Total Marks: <strong>{system_settings.total_marks}</strong>, Passing: <strong style={{color:'red'}}>{system_settings.passing_marks}</strong></span>
                            //             </div>
                            //             <ul>
                            //                 <li>
                            //                 {/* <i className="ti-eye"></i> 164 views */}
                            //                 </li>
                            //                 <li>
                            //                         <Link 
                            //                             to={{
                                //                             pathname: '/exam',
                            //                             state: {data:value}}} state={{ value }} >
                            //                             <Button name="Assign" variant='contained' style={{ backgroundColor: '#1F5B54'}}  label="Assign" >Start</Button></Link>
                            //                     <div className="score">
                            //                         {/* <span>Superb<em>350 Reviews</em></span><strong>8.9</strong> */}
                            //                     </div>
                            //                 </li>
                            //             </ul>
                            //         </div>
                            //     </div>
                            // </div>
            
                        )
                    })
                }
       
                    </div>
            
            </div>
            
            
            <p className="text-center add_top_30"><a href="#0" className="btn_search btn_1 rounded">Load more</a></p>
        
        </div>
{/*         
        <div className="bg_color_1">
            <div className="container margin_60_35">
                <div className="row">
                    <div className="col-md-4">
                        <a href="#0" className="boxed_list">
                            <i className="pe-7s-help2"></i>
                            <h4>Need Help? Contact us</h4>
                            <p>Cum appareat maiestatis interpretaris et, et sit.</p>
                        </a>
                    </div>
                    <div className="col-md-4">
                        <a href="#0" className="boxed_list">
                            <i className="pe-7s-wallet"></i>
                            <h4>Payments and Refunds</h4>
                            <p>Qui ea nemore eruditi, magna prima possit eu mei.</p>
                        </a>
                    </div>
                    <div className="col-md-4">
                        <a href="#0" className="boxed_list">
                            <i className="pe-7s-note2"></i>
                            <h4>Quality Standards</h4>
                            <p>Hinc vituperata sed ut, pro laudem nonumes ex.</p>
                        </a>
                    </div>
                </div>
                
            </div>
            
        </div> */}

    </>
  )
}
