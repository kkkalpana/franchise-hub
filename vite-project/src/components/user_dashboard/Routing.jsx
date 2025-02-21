import React from "react";
import Dashboard_layout from "./Dashboard_layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FranchiseLoginForm from "./FranchiseLoginForm";
import TodaySale from "./i_menu/today_sale/TodaySale";
import History from "./i_menu/history/History";
import Charts from "./i_menu/charts/Charts";
import Settings from "./i_menu/settings/Settings";
import Help from "./i_menu/help/Help";
import Logout from "./i_menu/logout/Logout";
import { useState, useEffect } from "react";
import axios from "axios";
import StatusCalendar from "./i_menu/calendar/StatusCalendar";

function Routing() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FranchiseLoginForm />}></Route>
          <Route path="/dashboard" element={<Dashboard_layout />}>
            <Route path="today" index element={<TodaySale />}></Route>
            <Route path="history" element={<History />}></Route>
            <Route path="charts" element={<Charts />}></Route>
            <Route path="calendar" element={<StatusCalendar />}></Route>
            <Route path="settings" element={<Settings />}></Route>
            <Route path="help" element={<Help />}></Route>
            <Route path="logout" element={<Logout />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Routing;

/*

const topMenuItems = [
    { id: "today", icon: DollarSign, label: "Today's Sale" },
    { id: "history", icon: Clock, label: "History" },
    { id: "charts", icon: BarChart3, label: "Charts" },
    { id: "calendar", icon: Calendar, label: "Calendar" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  const bottomMenuItems = [
    { id: "help", icon: HelpCircle, label: "Help & Support" },
    { id: "logout", icon: LogOut, label: "Logout" },

*/
