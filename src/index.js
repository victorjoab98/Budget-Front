import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "layouts/Admin.js";
import { Provider } from "react-redux";
import { store } from "store/store";
import { Login } from "views/Login";
import { Register } from "views/Register";
import { checkForToken } from "utils/checkForToken";

const root = ReactDOM.createRoot(document.getElementById("root"));

checkForToken();

root.render(
  <Provider store={ store }>
    <BrowserRouter>
      <Routes>
        <Route path="budget/*" element={<AdminLayout/>} />
        <Route path="budget/login" element={<Login/>}/>
        <Route path="budget/register" element={<Register/>}/>
        <Route path="*" element={<Navigate to="/budget/dashboard" replace />}/>
      </Routes>
    </BrowserRouter>
  </Provider>
);
