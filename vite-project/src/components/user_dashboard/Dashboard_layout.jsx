import React, { useEffect } from "react";
import {
  BarChart3,
  Calendar,
  Clock,
  Settings,
  LogOut,
  HelpCircle,
  Home,
  DollarSign,
  User,
} from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard_layout = () => {
  const [activeTab, setActiveTab] = useState("calendar");
  const [u_email, setEmail] = useState("");
  const [u_name, setName] = useState("");

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
  ];

  var doRedirect = useNavigate();
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    doRedirect("/dashboard/" + tabId);
  };

  const MenuLink = ({ item, isBottom = false }) => {
    const isActive = activeTab === item.id;
    return (
      <button
        onClick={() => handleTabClick(item.id)}
        className={`w-full flex items-center px-6 py-4 text-left transition-colors duration-200
          ${
            isActive
              ? "bg-[#E9522C] text-white"
              : "text-gray-600 hover:bg-gray-200"
          } ${isBottom ? "hover:bg-red-100" : ""}`}
      >
        <item.icon
          className={`h-6 w-6 ${isActive ? "text-white" : "text-gray-500"}`}
        />
        <span className="ml-4 text-lg font-medium">{item.label}</span>
      </button>
    );
  };

  async function getFranchiseeName() {
    if (u_email) {
      let url = `http://localhost:2016/franchisee/get_name`;
      let resp = await axios.post(
        url,
        { email: u_email },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      if (resp.data.stat) {
        setName(resp.data.doc);
      }
    }
  }
  useEffect(() => {
    setEmail(localStorage.getItem("v_Franchisee_email"));
    getFranchiseeName();

    const validateToken = async () => {
      const jtoken = localStorage.getItem("jtoken");
      try {
        let resp = await axios.post(
          `http://localhost:2016/franchisee/validate`,
          {},
          { headers: { Authorization: `Bearer ${jtoken}` } }
        );

        if (resp.data.stat === true) {
          alert("Session expired. Please login again.");
          doRedirect("/");
        }
      } catch (error) {
        alert("Session expired. Please login again.");
        doRedirect("/");
      }
    };
    validateToken();
  }, []);

  return (
    <div className="flex flex-row">
      <div className="flex flex-col h-screen w-72 bg-white border-r border-gray-200">
        {/* Header */}
        {/* <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-200">
        <Home className="h-7 w-7 text-[#E9522C]" />
        <span className="text-xl font-semibold text-gray-800">
          Franchise Portal
        </span>
      </div> */}

        {/* Welcome Section */}
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-[#E9522C] rounded-full p-2">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-base text-gray-500">Welcome,</div>
              <div className="text-lg font-medium text-gray-900">{u_name}</div>
            </div>
          </div>
        </div>

        {/* Main container with flex */}
        <div className="flex flex-col flex-1">
          {/* Top Menu Items */}
          <nav className="py-4">
            <div className="space-y-1">
              {topMenuItems.map((item) => (
                <MenuLink key={item.id} item={item} />
              ))}
            </div>
          </nav>

          {/* Bottom Menu Items */}
          <div className="mt-auto mb-8 border-t border-gray-200">
            {bottomMenuItems.map((item) => (
              <MenuLink key={item.id} item={item} isBottom />
            ))}
          </div>
        </div>
      </div>
      <div className="flex-grow p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard_layout;
