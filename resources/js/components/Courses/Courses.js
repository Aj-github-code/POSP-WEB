import React, { useEffect, useState } from 'react'
import restaurant_1 from "../../../assets/img/restaurant_1.jpg";

import { DataGrid } from '@mui/x-data-grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import MaterialSelect from'../../Tags/MaterialSelect'
import Api from '../../api';
import Swal from 'sweetalert2';
import { Upload } from '@mui/icons-material';

export default function Courses(props) {
    var roles = JSON.parse(localStorage.getItem('user_roles'))

    const [courses, setCourses] = React.useState({});

//     const apiCtrl = new Api;
// //     React.useEffect(()=>{
// //         apiCtrl.callAxios('get-campaign').then((res)=>{
// // console.log('Response ',res);
// //             if(res.success == true){
// //                 setCourses({...res.data});
// //             }
// //         })
// //     },[])
console.log("props=>",props.campaign_type)

const [isVisible, setIsVisible] = React.useState({'-1':false})
    const [btnVariant1, setBtnVariant1] = React.useState({variant:'outlined', backgroundColor:"#1F5B54"});
    const [btnVariant2, setBtnVariant2] = React.useState({variant:'contained', backgroundColor:"#1F5B54"});
    const [btnVariant3, setBtnVariant3] = React.useState({variant:'contained', backgroundColor:"#1F5B54"});

    const [search, setSearch] = React.useState('');

    const [pageLength,setPageLength]=useState(3)
    const [total,setTotal]=useState()

    const apiCtrl = new Api;
    React.useEffect(() => {
        handleCampaign('all');
    },[search, pageLength, props.campaign_type])
    const getCampaign = () => {
        
    }
    const handleCampaign = (filter) => {
        Swal.fire({
            title: 'Loading...',
            didOpen: () => {
                Swal.showLoading()
            }
        })
        apiCtrl.callAxios('get-campaign',{campaign_type:props.campaign_type,length:pageLength}, {assigned:filter, search: search}).then((res)=>{
            console.log('Response ',res);

            if(res.success == true){
                setCourses({...res.data.aaData});
               // total:response.data.iTotalRecords
               setTotal(res.data.iTotalRecords)
            //    Swal.close();  
            }
            Swal.close();  
          
        })
       
    }
   const handleLoadMoreFromBottom = () => {
        console.log("Coming to bottom");
        // this.vehiclelist(this.state.pageLength+10);
        setPageLength(pageLength+10)
        // handleCampaign('all')

       
      }

 

    function secondsToTime(uploaddate){
        var x = moment(uploaddate);
        var y = moment();

        let seconds = y.diff(x)/1000;
        //  console.log("seconds: "+seconds)
        seconds = Number(seconds);
        var d = Math.floor(seconds / (3600*24));
        var h = Math.floor(seconds % (3600*24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);



        
        // var dDisplay = d > 0 ? d + (d == 1 ? " day " : " Days ") : "";
        var dDisplay = d > 0 ? d :"";
        var hDisplay = h > 0 ? h + (h == 1 ? "": "") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " min " : " Min ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
        //  console.log('TIme '+ dDisplay + hDisplay + mDisplay + sDisplay)
        // console.log("dDisplay",dDisplay)
        if(dDisplay !== "")  {
            return {day:dDisplay , color: "#FFA6A6"}
        } else {
            return {day:0 , color: ""}
        }
        
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
            
        </div> */}
        
{/*         
        <div className="collapse" id="collapseMap" >
            <div id="map" className="map"></div>
        </div>
         */}
    
    <div className={`container ${props.head}`} style={props.head != '' ? {marginTop:'8%'} : {marginTop:'4%'} } >
        {  ((roles[0].role_code === "SA") || (roles[0].role_code === "AD")) 
                                            ?
                                            <></>
                :
            <div className="row mb-3">
                    <div className="col-lg-12">
                    <Button onClick={()=>{handleCampaign('all')}} variant={btnVariant1.variant} style={{ backgroundColor: `${btnVariant1.backgroundColor}`, borderColor:"#1F5B54", borderRadius:'20px'}} onMouseLeave={()=>{setBtnVariant1({variant:'contained', backgroundColor:"#1F5B54"})}}  onMouseEnter={()=>{setBtnVariant1({variant:'outlined', borderColor:"#1F5B54", backgroundColor: 'white'})}} >All</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button onClick={()=>{handleCampaign('admin')}}  variant={btnVariant2.variant} style={{ backgroundColor: `${btnVariant2.backgroundColor}`, borderColor:"#1F5B54", borderRadius:'20px'}} onMouseLeave={()=>{setBtnVariant2({variant:'contained', backgroundColor:"#1F5B54"})}}  onMouseEnter={()=>{setBtnVariant2({variant:'outlined', borderColor:"#1F5B54", backgroundColor: 'white'})}} >Assigned By Admin</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button onClick={()=>{handleCampaign('self')}}  variant={btnVariant3.variant} style={{ backgroundColor: `${btnVariant3.backgroundColor}`, borderColor:"#1F5B54",  borderRadius:'20px'}} onMouseLeave={()=>{setBtnVariant3({variant:'contained', backgroundColor:"#1F5B54"})}}  onMouseEnter={()=>{setBtnVariant3({variant:'outlined', borderColor:"#1F5B54", backgroundColor: 'white'})}} >Self Enrolled</Button>&nbsp;&nbsp;&nbsp;&nbsp;
        
                    </div>
                </div>
                }
            <div className="col-lg-12 d-flex" style={{justifyContent:"right"}}>
                <div className="row no-gutters custom-search-input-2 inner">
                    <div className="col-lg-8">
                        <div className="form-group">
                            <input className="form-control" onChange={(e)=>{setSearch(e.target.value)}} type="text" placeholder="Search Here..." />
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
                        const uploaddate =value.created_at
                       
                            
                        var date1 = new Date(value.previous_result?value.previous_result.created:"");
                        var dateTime = moment.utc(date1).format("DD-MMM-YYYY HH:mm:ss");
                        // var date2= date1.moment().format('ddd MMM DD YYYY hh:mm:ss')
                        // console.log("date=>",dateTime)

                        var days =  secondsToTime(uploaddate)                        ;
                     
                    //  console.log("timer=.",day)
                     
                     

                        return(
                                <div class="col-xl-4 col-lg-6 col-md-6 isotope-item popular">
                                  
                                    <div class="box_grid">
                                     {  ((roles[0].role_code === "SA") || (roles[0].role_code === "AD")) 
                                            ?
                                            <Button 
                                                 onClick={()=>{setIsVisible(old=>({...old, [index]:true}))}} key={index} data-bs-toggle="modal" size='small' href={`#exampleModalToggle${index}`}
                                                
                                                >
                                                    
                                                <figure>
                                                {days.day<=7?<>
                                                    <span className="badge rounded-pill  bg-danger " style={{position:"absolute",top: "10px", right:"10px"}}>New</span>
                                                    
                                                    </>:""} 
                                               
                                                    <video src={`${value.video}`} className="img-fluid"  alt="" width="800" height="533"  />
                                                    <small>{value.campaign_type}</small>
                                                </figure>
                                            </Button>
                                            :
                                            (value.assigned_name !== null) ?
                                            <Link 
                                                to={{
                                                pathname: '/training',
                                                state: {data:value}}} state={{ value }} >
                                                <figure>
                                                    {days.day<=7?<>
                                                    <span className="badge rounded-pill  bg-danger " style={{position:"absolute",top: "10px", right:"10px"}}>New</span>
                                                    
                                                    </>:""}
                                                  
                                                  
                                                    <video src={`${value.video}`} className="img-fluid"  alt="" width="800" height="533"  />
                                                    

                                                    <small title={value.assigned_name}>Assigned By: {value.role_name}</small>
                                                   
                                                </figure>
                                            </Link>
                                            
                                                :
                                              
                                                <figure>
                                                     {days.day<=7?<>
                                                    <span className="badge rounded-pill  bg-danger " style={{position:"absolute",top: "10px", right:"10px"}}>New</span>
                                                    
                                                    </>:""} 
                                                    <video src={`${value.video}`} className="img-fluid"  alt="" width="800" height="533"  />

                                                    <small title={value.assigned_name}>Assigned By: {value.role_name}</small>
                                                </figure>
                                            }   
                                        {/* <div class="wrapper" >
                                             
                                            <h4 style={{ color: '#1F5B54'}}>{campaign.title.toUpperCase()}</h4>
                                            <p>Time: <strong>{system_settings.exam_time.split(':').reduce((acc,time) => (60 * acc) + +time)/(60 * 60)} Hours</strong></p>
                                         
                                            <span className="price">Total Marks: <strong>{system_settings.total_marks}</strong>, Passing: <strong style={{color:'red'}}>{system_settings.passing_marks}</strong></span>
                                        <br />
                                            <span> {(value.created_at != null) ? `Uploaded: ${value.created_at}` : ''}</span>
                                        </div> */}

                                        <div class="wrapper" >
                                             
                                            <h4 style={{ color: '#1F5B54'}}>{campaign.title.toUpperCase()}</h4>
                                            <p style={{marginBottom:'7px'}}>Time: <strong>{system_settings.exam_time.split(':').reduce((acc,time) => (60 * acc) + +time)/(60 * 60)} Hours</strong></p>                                       
                                            <span className="price">Total Marks: <strong>{system_settings.total_marks}</strong>, Passing: <strong style={{color:'red'}}>{system_settings.passing_marks}</strong></span>
                                            <br />
                                            <span> {(value.created_at != null) ? `Uploaded: ${value.created_at}` : ''}</span>
                                            <br />
                                            {((roles[0].role_code === "AG"))
                                                ?
                                                <>
                                                    <span className='d-flex justify-content-between'  data-bs-toggle="collapse" data-bs-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample"><label style={{width:'auto'}}><b>{"Previous Report"}</b></label></span>
                                            
                                                        <div className="row mb-4 collapse" id="collapseExample1">  
                                                        <p> <span className="price">Marks: <strong>{value.previous_result?value.previous_result.marks:""}</strong>,Result: <strong style={{color:'red'}}>{value.previous_result?value.previous_result.status:""}</strong></span></p>
                                                        
                                                        <span>Exam Date & Time:{dateTime} </span> 
                                                    </div>

                                                   
                                                </>:""
                                            }
                                           

                                        </div>

                                        
                                        <ul>
                                        
                                        <li>
                                        {
                                                ((roles[0].role_code === "SA") || (roles[0].role_code === "AD")) 
                                                ?
                                          
                                                    <div className="modal fade" id={`exampleModalToggle${index}`} aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                                                          <AssignCampaign visible={isVisible[index] === true ? true : false} key={index} id={index} campaign_code={value.campaign_code} />
                                                        
                                                    </div>
                                                :
                                                <div className="col-lg-12 d-flex" style={{justifyContent:'right'}}>
                                                {
                                                    (value.assigned_name === null) ?
                                                    <SelfAssigned key={index} id={index} campaign_code={value.campaign_code} />
                                                    :
                                                    <Link 
                                                    to={{
                                                    pathname: '/training',
                                                    state: {data:value}}} state={{ value }} >
                                                        <Button variant={'contained'} style={{ backgroundColor: '#1F5B54'}}  >
                                                         Start Module Training
                                                        </Button>
                                                        </Link>

                                                }
                                                </div>
                                            }
                                        </li>
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
               {courses.length!==total?<>

                <div className='row'>
                    <div className='col-md-12 d-flex justify-content-center'>
                        <button type="button" class="btn btn-outline-dark" onClick={handleLoadMoreFromBottom}>View More</button>&nbsp;
                                            
                        {/* <span className='mt-2'>CountPage:{this.state.vehicles.length}</span>&nbsp;<span className='mt-2'>TotalPages:{this.state.totalRecords}</span> */}
                    </div>


                </div>
               </>:""}
               
            
            </div>
            
            
            {/* <p className="text-center add_top_30"><a href="#0" className="btn_search btn_1 rounded">Load more</a></p> */}
        
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

const AssignCampaign = ({key, id, visible, campaign_code})=>{

    const [user, setUser] = React.useState([]);
    const [userdata,setUserdata]=useState([])
    const [assign,setAssign]=useState({})
    //const [assign,setAssign]=useState([3,58,59,60,61,62])
  
    const [allcheck,setAllcheck]=useState(false)
   
    
    const userData = [
        { name: "Jeevan" ,user_id:1 },
        { name: "Manish" ,user_id:2},
        { name: "Prince" ,user_id:3},
        { name: "Arti" ,user_id:4},
        { name: "rahul" ,user_id:5 }
      ];
      
    let count = 1;
    useEffect(() => {
        setUserdata(userData);
      }, []);
    

    
    const apiCtrl = new Api;
    const [reload, setReload] = React.useState(false);
    const [statedata,setStatedata]=useState([])
    const[citydata,setCitydata]=useState([])
    const [state,setState]=useState({
      state:{},
      city:{}
    })
    
    React.useEffect(()=>{
        // visible &&

            (Object.keys(user) < 1) &&
          
            userList()
        
            
        
    },[reload])
    const userList = () => {
        setUser({});
        apiCtrl.callAxios('user-list-campaign', {campaign_code: campaign_code}).then((res)=>{
           // console.log('Response ',res);
            if(res.success == true){
                setUser({...res.data});
                Swal.close();
            }
        })
    }

    const handleAssign = () => {
        var data = {
            campaign_code: campaign_code,
            user_id: assign
        }
        apiCtrl.callAxios('assign-campaign', data).then((res)=>{
            console.log('Response ',res);
            if(res.success == true){
                // setUser({...res.data});
                Swal.fire({
                    title: "Assign Campaign!",
                    text: res.message,
                    icon: "success",
                    timer: 3000,
                    showConfirmButton: false,
                })
                userList()
                
                $('.close').trigger('click')
            } else {
                Swal.fire({
                    title: "Assign Campaign!",
                    text: res.message,
                    icon: "error",
                    timer: 3000,
                    showConfirmButton: false,
                })
            }
        })
    }

    const handleChange = (e,index) => {
        //console.log("e==>",e.target.checked)
        console.log("value" ,e.target.value,"index",index)
     const  value=e.target.value
      //  alert()
      if(e.target.checked){
        
          setAssign(old =>({...old,[index]:value}))
          //setAssign(old =>({...old,[index]:value }))
                    // console.log("assign=>",assign)
            }else{

                setAllcheck(false)
              
                //setUncheckall(false)                
                const assignData = assign
                console.log("deletedata=>",assignData[index])
                setAssign(old =>({...old,[index]:''}))
                assignData[index] = false
                
                // setAssign(...assignData)              
            }
            
            
            
            console.log("value" ,e.target.value,"index",index)
        };

        const checkall=(e)=>{
            setAllcheck(true)
            //setUncheckall(true)
            Object.entries(user).map(([index, value])=>{
                //    console.log("index",index)
              //  console.log("chekall=>",value) 
              //  // return handleChange(e, value.user_id)
                e.target.value=value.user_id
                 return handleChange(e, index)
               })

        }
        
     
    const getstatedata = () => {

        if(Object.keys(statedata).length < 1){
            
            Swal.fire({
                title: 'Loading...',
                didOpen: () => {
                    Swal.showLoading()
                }
            })
           // console.log('loader stART', Object.keys(statedata).length)
            apiCtrl.callAxios('states/list',{search:{country_id:1}}).then(res => {
  
                var dataOfstate=[];
                dataOfstate = {...dataOfstate, ['']:'Select State'};
                res.data.map((value)=>{                  
                  // console.log("STATE==>",value)
                  
                  dataOfstate = {...dataOfstate, [value.id]:value.state_name};
                })     
                
            //    console.log("datastate=>",dataOfstate)
               
             setStatedata(dataOfstate);
             console.log("datastate=>",statedata)
             
                Swal.close();     
              })
            console.log('loader close')
        }
    }
     
    const handlechang =(e)=>{
   
   
        setState(old => ({...old , state:e.target.value}))
           
        Swal.fire({
            title: 'Loading...',
            didOpen: () => {
        Swal.showLoading()
            }
        })
        setCitydata("");
        apiCtrl.callAxios('cities/list',{search:{state_id:e.target.value}}).then(res => {
             
        var dataOfcity=[]
        
        dataOfcity = {...dataOfcity, ['']:'Select City'};
        res.data.map((value)=>{                  
            // console.log("Scity==>",value)
                
            dataOfcity = {...dataOfcity, [value.id]:value.city_name};
        })     
        setCitydata( dataOfcity);
        })  
        Swal.close();      
    }


      console.log("assign=>",assign)
    //  console.log("allcheck=>",allcheck)

    return(
    
        <>

            <div className="modal-dialog  modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Assign To POSP</h5>
                        
                        <div className="row ml-1" style={{ paddingTop: '2%'}}>
                            {/* <label><b>{props.params.any} Details</b></label> */}
                        </div>
                        <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    
                    <div className="modal-body m-body">

                       <div className='row'>

                        <div className='col-md-6'>
                        <MaterialSelect value={state.state?state.state:""}
                            onMouseEnter={()=>{getstatedata()}}       
                            data={statedata}  id="state_id" labelId="state" name="state"
                            size={"small"}
                        
                            onChange={(e)=>{handlechang(e )}}   label="State" fullWidth
                        
                        />

                        </div>
                        <div className='col-md-6'>
                            <MaterialSelect   value={state.city?state.city:""} 
                                data={citydata}  id="city_id" labelId="city-id" 
                                name="city"    onChange={(e)=>setState(old=>({...old,city : e.target.value}))}
                                size={"small"}
                                label="City *" fullWidth
                            />

                        </div>

                       </div>

                        <div className="row" key={id}>
                        <div className="col-md-12">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <td>#</td>
                                    <td>Name</td>
                                    {/* <td>Action</td> */}
                                    <td> <FormControlLabel control={<Checkbox checked={allcheck}  onClick={checkall}  />} label={" All"} /></td>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.keys(user).length > 1 
                                    ?
                                        Object.entries(user).map(([index, value])=>{
                                    
                                        return(
                                            <tr key={index}>
                                                <td>{count++}</td>
                                                <td>{value.name}</td>
                                                <td>  <FormControlLabel control={<Checkbox  checked={assign[index] ? true : false}  onChange={(e)=>handleChange(e,index)}      />} value={value.user_id} /></td>
                                                {/* <td><Button name="Assign" variant='contained' style={{ backgroundColor: '#1F5B54'}}  onClick={()=>{handleAssign(value.user_id)}} >Assign</Button></td> */}
                                            </tr>
                                            )
                                        })
                                    :
                                
                                    <tr >
                                        <td colSpan={3}><span style={{textAlign: "center"}}>No Records Found</span></td>
                                    </tr>
                                }
                            </tbody>
                    
                        </table>
                    </div>
                        </div>
        
                      
                    </div>
                    <div className="modal-footer">
                        {
                            Object.keys(user).length > 1 
                            ?
                                <Button name="Assign" variant='contained' style={{ backgroundColor: '#1F5B54'}}  onClick={()=>{handleAssign()}} >Assign</Button>
                            :
                            <></>
                        }
                    </div>
                </div>
            </div>




            {/* <div className="row" key={id}>
                <div className="col-md-12">
                    <table className="table">
                        <tr>
                        <td><input type="checkbox"/></td>
                            <td>#</td>
                            <td>Name</td>
                            <td>Action</td>

                        </tr>
                       
                        
                       
                             
                            {Object.entries(user).map(([index, value])=>{
                           
                            return(
                                <tr key={index}>
                                    <td>{count++}</td>
                                    <td>{value.name}</td>
                                    {/* <td><Button name="Assign" variant='contained' style={{ backgroundColor: '#1F5B54'}}  onClick={()=>{handleAssign(value.user_id)}} >Assign</Button></td> 
                                    <td><input type="checkbox"/></td>

                                </tr>
                                )
                        })
                    }
                
                    </table>
                </div>
            </div> */}
        </>
    )
}




const SelfAssigned = ({key, id, campaign_code})=>{

    const [user, setUser] = React.useState({});

    let count = 1;
    
    const apiCtrl = new Api;
    const [reload, setReload] = React.useState(false);
    var user_details = JSON.parse(localStorage.getItem('user_details'))
    console.log(user_details)

    const handleAssign = (user_id) => {
        var data = {
            campaign_code: campaign_code,
            user_id: user_id
        }
        apiCtrl.callAxios('assign-campaign', data).then((res)=>{
            console.log('Response ',res);
            if(res.success == true){
                setUser({...res.data});
                Swal.fire({
                    title: "Assign Campaign!",
                    text: res.message,
                    icon: "success",
                    timer: 3000,
                    showConfirmButton: false,
                })
                setReload(true)
                
                // $('.close').trigger('click')
            } else {
                Swal.fire({
                    title: "Assign Campaign!",
                    text: res.message,
                    icon: "error",
                    timer: 3000,
                    showConfirmButton: false,
                })
            }
        })
    }

    return(
    
        <>
           <Button name="Assign" variant='contained' style={{ backgroundColor: '#1F5B54'}}  onClick={()=>{handleAssign(user_details.id)}} >Enroll</Button>
        </>
    )
}

