import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSideBar from "./AdminSideBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainDashboard from "../Admin_dashboard/dashboard/MainDashboard";
import MainApp from "../Admin_dashboard/applications/MainApp";
import MainUsers from "../Admin_dashboard/users/MainUsers";
import UserProfile from "../Admin_dashboard/users/UserProfile";
import MainSettings from "../Admin_dashboard/settings/MainSettings";
import MainLogout from "../Admin_dashboard/logout/MainLogout";
import ResourceNotAvailable from "../ResourceNotAvailable";

// var dotenv = require("dotenv");
// dotenv.config();

function Applications() {
  const [jsonAllAppObj, setJsonAllAppObj] = useState(null);

  // ------------------- getApplicants ---------------------
  async function getApplicants() {
    try {
      let url = `http://localhost:2016/admin/allApplicants`;
      let resp = await axios.get(url);
      setJsonAllAppObj(resp.data.doc);
    } catch (error) {
      console.error("Error fetching applicants:", error);
      alert("Failed to fetch applicants.");
    }
  }

  useEffect(() => {
    getApplicants();
  }, []);

  return (
    <div className="flex flex-row">
      <BrowserRouter>
        <AdminSideBar />
        <Routes>
          <Route path="/admin/dashboard" element={<MainDashboard />}></Route>
          <Route path="/admin/*" element={<MainDashboard />}></Route>
          <Route
            path="/admin/applications"
            element={
              <MainApp
                getApplicants={getApplicants}
                jsonAllAppObj={jsonAllAppObj}
              ></MainApp>
            }
          ></Route>
          <Route
            path="/admin/franchises"
            element={
              <MainUsers
                jsonAllAppObj={jsonAllAppObj}
                getApplicants={getApplicants}
              ></MainUsers>
            }
          ></Route>
          <Route
            path="/admin/users/details/:email"
            element={
              <UserProfile
                jsonAllAppObj={jsonAllAppObj}
                getApplicants={getApplicants}
              />
            }
          ></Route>

          <Route path="/admin/settings" element={<MainSettings />}></Route>
          <Route path="/admin/logout" element={<MainLogout />}></Route>
          {/* <Route path="/admin/*" element={<ResourceNotAvailable />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>

    // <StatusEmail obj={obj} actionPerformed={1} />
  );
}

export default Applications;
