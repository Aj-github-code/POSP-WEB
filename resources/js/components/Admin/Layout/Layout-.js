import React, { useEffect } from 'react';

import { BrowserRouter as Router , Routes, Route} from 'react-router-dom';

import Dashboard from '../Dashboard/Dashboard';
import NavBar from '../NavBar/NavBar';
AddRoles
import UpdateClaimForm from '../Pages/UpdateClaimForm';
import ClaimAssesment from '../Pages/ClaimAssesment/ClaimAssesment';
import ClaimDetailList from '../Pages/ClaimDetailList';
import CompanyClaim from '../Pages/CompanyClaim/CompanyClaim';
import  Login  from '../Pages/Login/Login';
import { ForgotPassword } from '../Pages/Login/ForgotPassword';
import UserList from '../Pages/Users/UserList';
import AddUsers from '../Pages/Users/AddUsers';
import ClaimList from '../Pages/ClaimList/ClaimList';
import AddRoles from '../Pages/Roles/AddRoles'
import RolesList from '../Pages/Roles/RolesList';
import AddClaim from '../Pages/AddClaim'
import Setup from '../Pages/setup/Setup'
import ProductCategory from '../Pages/ProductCategory/ProductCategory';
import Product from '../Pages/Product/Product';
import ProductList from '../Pages/Product/ProductList';
export default function Layout() {


  return (
    <Router>
      <div  className=" body fixed-nav sticky-footer" id="page-top">

        <NavBar />
        <div className="content-wrapper" style={{backgroundColor: "#EEF5FF"}}>
          <div className="container-fluid" style={{backgroundColor: "#EEF5FF"}}>
            <Routes>
              <Route path='/login' element={<Login />} />
          
              <Route path='/forgotpassword' element={<ForgotPassword/>}/>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/dealer/add-claim" element={<AddClaim />} />
              <Route path="/dealer/update-claim-form" element={<UpdateClaimForm />} />
              <Route exact path="/dealer/claim-details" element={<ClaimDetailList />} />
              <Route path="/assessor/claim-assessment" element={<ClaimAssesment />} />
              <Route path="/company/add-claim" element={<CompanyClaim />} />             
              <Route path="/create/:any" element={<AddUsers />} />
              <Route path="/user-list" element={<UserList />} /> 
              
              <Route path="/claim-list" element={<ClaimList />} /> 


      
          
              <Route path="/create-role" element={<AddRoles />} /> 
              <Route path="/role-list" element={<RolesList />} /> 
              <Route path="/setup" element={<Setup/>}/>
              <Route path="/product-category" element={<ProductCategory/>}/>
              <Route path="/product/add-product" element={<Product />} /> 
              <Route path="/product/product-list" element={<ProductList />} /> 

              
              {/* <Route  path="/" element={<MainHomePage />} /> */}
            </Routes>    
            
          </div>
        </div>
    
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fa fa-angle-up"></i>
        </a>
      
      </div>
    </Router>
  )
}
