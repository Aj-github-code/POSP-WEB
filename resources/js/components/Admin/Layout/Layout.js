import React, { useEffect } from 'react';

import { BrowserRouter as Router , Routes, Route} from 'react-router-dom';

import Dashboard from '../Dashboard/Dashboard';
import NavBar from '../NavBar/NavBar';


import  Login  from '../Pages/Login/Login';
import { ForgotPassword } from '../Pages/Login/ForgotPassword';
import Qna from '../Pages/Qna/Qna';
import Qna_question from '../Pages/Qna/Qna_question';
import Campaign from '../Pages/Campaign/Campaign'
import ProductList from '../Pages/Product/ProductList'
import ProductCategoryList from '../Pages/ProductCategory/ProductCategory';
import UserList from '../Pages/Users/UserList';
import RolesList from '../Pages/Roles/RolesList';
import AddRoles from '../Pages/Roles/AddRoles';
import { ExcelUpload } from '../Pages/Excel_upload/Excel_upload';
import Courses from '../../Courses/Courses';
import ResultList from '../Pages/Result_List/Result_List';





export default function Layout() {

  var roles = JSON.parse(localStorage.getItem('user_roles'))

  return (
    <Router>
      <div  className=" body fixed-nav sticky-footer" id="page-top">

        <NavBar />
        <div className="content-wrapper" style={{backgroundColor: "#EEF5FF"}}>
          <div className="container-fluid" style={{backgroundColor: "#EEF5FF"}}>
            
          { roles === "" ? 
             <Routes>
              <Route path='/login' element={<Login />} />
              <Route exact path="/" element={<Dashboard />} />
              <Route path='/forgotpassword' element={<ForgotPassword/>}/>
              </Routes> 
              :''}
              
   
            {/*               
              { user.roles === "WO" || user.roles === "IN" || user.roles === "DA" || user.roles === "AG" ? 
              <Routes>
                 <Route exact path="/" element={<Dashboard />} />
                <Route path="/claim-list" element={<ClaimList />} /> 
                <Route path="/assessor/claim-assessment" element={<ClaimAssesment />} />
              </Routes> 
              :''} */}


              {/* {user.roles === "superadmin" || user.roles === "admin" || user.roles === "AS" ? 
              <Routes>
              <Route exact path="/" element={<Dashboard />} />

              <Route exact path="/qna" element={<Qna />} />
              <Route path='/qna-question' element={<Qna_question/>}/>
              <Route path='/campaign-list' element={<Campaign/>}/>
              <Route path='/product-list' element={<ProductList/>}/>
              <Route path='/product-category' element={<ProductCategoryList/>}/>
               
              </Routes> 
              : ''}  */}


             {roles[0].role_code === "SA" || roles[0].role_code === "AD" || roles[0].role_code === "AS" ? 
              <Routes>
              <Route exact path="/" element={<Dashboard />} />

              <Route exact path="/qna" element={<Qna />} />
              <Route path='/create-qna' element={<Qna_question/>}/>
              <Route path='/qna-list' element={<Campaign/>}/>
              <Route path='/product-list' element={<ProductList/>}/>
              <Route path='/product-category' element={<ProductCategoryList/>}/>
              <Route path='/excel-uplaod' element={<ExcelUpload/>}/>
              <Route path="/user-list/:any" element={<UserList />} /> 
              <Route path="/create-role" element={<AddRoles />} /> 
              <Route path="/role-list" element={<RolesList />} /> 
              <Route path='/courses' element={<Courses/>}/>
              <Route path='/result-list' element={<ResultList/>}/>
               
              </Routes> 
              : ''}  
          



 

              
              {/* <Route  path="/" element={<MainHomePage />} /> */}
           

            
            
          </div>
        </div>
    
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fa fa-angle-up"></i>
        </a>
      
      </div>
    </Router>
  )
}
