/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { useLocation, Route, Routes } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";

import routes from "routes.js";
import { getApiContentThunk } from "store/appSlice";
import { useAppDispatch } from "hooks/reduxHooks";
import { useAppSelector } from "hooks/reduxHooks";
import { getUserContentThunk } from "store/userAccount";

// import sidebarImage from "assets/img/sidebar-3.jpg";

function Admin() {
  const dispatch = useAppDispatch();

  const { id } = useAppSelector((state) => state.user.user);
  const contentAppFetched = useAppSelector((state) => state.app.fetched);
  const contentUserFetched = useAppSelector((state) => state.user.userFetched);

  const location = useLocation();
  const mainPanel = React.useRef(null);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/budget") {
        return (
          <Route
            path={prop.path}
            element={<prop.component />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  React.useEffect(() => {
    dispatch( getApiContentThunk() );
    dispatch( getUserContentThunk( id ) );
  }, []);

  React.useEffect(() => {
    if(contentUserFetched === false){
      dispatch( getUserContentThunk( id ) );
    }
  }, [location]);

  React.useEffect(() => {
    if(contentAppFetched === false){
      dispatch( getApiContentThunk() );
    }
  }, [location]);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);

  return (
    <>
      <div className="wrapper">
        <Sidebar color="black" routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Routes>{getRoutes(routes)}</Routes>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Admin;
