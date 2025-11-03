import ReactDOM from "react-dom/client";
import React, { Fragment } from "react";
import "./index.css";
import App from "./App.jsx";
import Application_form from "./components/Application_form.jsx";
import Applications from "./components/show applications/sideBarManage/Applications.jsx";
import FranchiseLoginForm from "./components/user_dashboard/FranchiseLoginForm.jsx";
import Routing from "./components/user_dashboard/Routing.jsx";

let root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<Application_form />
  //<Applications />
  <FranchiseLoginForm />
  //<Routing />
);
