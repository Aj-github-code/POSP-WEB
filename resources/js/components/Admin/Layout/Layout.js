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
import ResultHistory from '../Pages/Result_History/Result_History';
import { FileUploadCampaign } from '../Pages/File_upload_Campaign/File_Upload_Campaign';
import { ExamAnswerList } from '../Pages/Result_History/Examanswer';
import { Tag } from '../Pages/Master Tag/Tag';
import Taglist from '../Pages/Master Tag/Tag_List';
import UserExcelUpload from '../Pages/User_Excel_Upload/UserExcelUpload';

import Crypt from '../../../Services/Crypt';



export default function Layout() {
  const cryptCtrl = new Crypt;
  var roles = {};
  if((localStorage.getItem('posp_user_roles') !== 'undefined') && (localStorage.getItem('posp_user_roles') !== null)){
    var role = JSON.parse(cryptCtrl.decrypt(localStorage.getItem('posp_user_roles')))
    roles = role[0];
  }

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


             {roles.role_code === "SA" || roles.role_code === "AD" || roles.role_code === "AS" ? 
              <Routes>
              <Route exact path="/" element={<Dashboard />} />

              <Route exact path="/qna" element={<Qna />} />
              <Route path='/create-qna' element={<Qna_question/>}/>
              <Route path='/qna-list' element={<Campaign/>}/>
              {/* <Route path='/product-list' element={<ProductList/>}/>
              <Route path='/product-category' element={<ProductCategoryList/>}/> */}
              <Route path='/excel-uplaod' element={<ExcelUpload/>}/>
              <Route path="/user-list/:any" element={<UserList />} /> 
              <Route path="/create-role" element={<AddRoles />} /> 
              <Route path="/role-list" element={<RolesList />} /> 
              <Route exact path='/courses' element={<Courses campaign_type={"courses"} head='' />}/>
              <Route exact path="/training" element={ <Courses campaign_type={"training"} head='' />} />
              <Route path='/result-list' element={<ResultList/>}/>
              <Route path='/result-history' element={<ResultHistory/>}/>
              <Route path='/upload-file' element={<FileUploadCampaign/>}/>
              <Route path='/fileUploadCampaign' element={<FileUploadCampaign/>}/>
              <Route path='/examans-list' element={<ExamAnswerList/>}/>
              <Route path='/tag' element={<Tag/>}/>
              <Route path='/source-list' element={<Taglist/>}/>
              <Route path='/userexcelupload' element={<UserExcelUpload/>}/>
           
          
               
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
