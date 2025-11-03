import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  FileText,
  DollarSign,
  Settings,
  LogOut,
} from "lucide-react";

const AdminSideBar = () => {
  const navItems = [
    { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
    { icon: FileText, label: "Applications", href: "/admin/applications" },
    { icon: Users, label: "Users", href: "/admin/franchises" },
    // { icon: DollarSign, label: "Sales", href: "/sales" },
  ];

  const bottomNavItems = [
    { icon: Settings, label: "Settings", href: "/admin/settings" },
    { icon: LogOut, label: "Logout", href: "/admin/logout" },
  ];

  let doRedirect = useNavigate();

  function doNavigate(path) {
    doRedirect(path);
  }

  return (
    <div className="flex flex-col h-screen w-64 bg-white border-r border-gray-200">
      {/* Header */}
      <div className="px-6 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mt-5">Dashboard</h1>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 pr-24">
        <div className="space-y-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center px-2 py-3 text-gray-600 rounded-lg hover:bg-slate-200 hover:text-gray-900 transition-colors group"
              onClick={(e) => {
                e.preventDefault();
                doNavigate(item.href);
              }}
            >
              <item.icon className="w-6 h-6 mr-3 stroke-2" />
              <span className="text-base font-medium">{item.label}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="px-4 py-4 border-t border-gray-200">
        <div className="space-y-1">
          {bottomNavItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center px-2 py-3 text-gray-600 rounded-lg hover:bg-slate-200 hover:text-gray-900 transition-colors group"
            >
              <item.icon className="w-6 h-6 mr-3 stroke-2" />
              <span className="text-base font-medium">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
