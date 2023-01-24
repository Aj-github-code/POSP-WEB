
// ReactDOM.createRoot(document.getElementById('example')).render(
//     <BrowserRouter>
//         <Example />
//     </BrowserRouter>
// )

import { ReactDOM } from 'react';
import './App.css';
import Header from './layout/Header';
import Menu from './layout/Menu';
import Dashboard from './Dashboard';
import Footer from './layout/Footer';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './modules/login/Login';
import Register from './modules/login/Register';
import React, { useState } from 'react';
import { ReactSession } from 'react-client-session';

import "./plugins/fontawesome-free/css/all.min.css";
import "./plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css";
import "./plugins/icheck-bootstrap/icheck-bootstrap.min.css";
import "./plugins/jqvmap/jqvmap.min.css";
import "./dist/css/adminlte.min.css";
import "./plugins/overlayScrollbars/css/OverlayScrollbars.min.css";
import "./plugins/daterangepicker/daterangepicker.css";
import "./plugins/summernote/summernote-bs4.css";
import "./plugins/jquery/jquery.min.js";
import "./plugins/jquery-ui/jquery-ui.min.js";
import "./plugins/bootstrap/js/bootstrap.bundle.min.js"
import "./plugins/chart.js/Chart.min.js";


import "./dist/js/adminlte.js";
import "./dist/js/pages/dashboard.js";
import "./dist/js/demo.js";


function Main() {
//   const [token, setToken] = useState();

//   if(!sessionStorage.getItem('token')) {
//     return <Login setToken={setToken} />
//   }

  return (
    <>
    <Router>
      <div className="hold-transition sidebar-mini layout-fixed">
        <div className="wrapper">
          <Header/>
          <Menu/>
          <Routes>
            <Route path='/' element={<Dashboard/>} index></Route>
            <Route path='/register' element={<Register/>}></Route>
          </Routes>
          <Footer/>
        </div>

      </div>
    </Router>
    </>
   
  );
}

export default Main;

if (document.getElementById('admin')) {
    ReactDOM.render(<Main />, document.getElementById('admin'));
}