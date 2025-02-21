import React, { useEffect, useState } from "react";

const TabComponent = ({ setJsonObj, jsonAllAppObj }) => {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = [
    { id: "All", label: "All" },
    { id: "Accepted", label: "Accepted" },
    { id: "Rejected", label: "Rejected" },
    { id: "Franchised", label: "Franchised" },
  ];

  useEffect(() => {
    if (activeTab === "All") {
      setJsonObj(jsonAllAppObj);
    } else if (activeTab === "Accepted") {
      setJsonObj(jsonAllAppObj.filter((obj) => obj.status === 1));
    } else if (activeTab === "Rejected") {
      setJsonObj(jsonAllAppObj.filter((obj) => obj.status === 3));
    } else if (activeTab === "Franchised") {
      setJsonObj(jsonAllAppObj.filter((obj) => obj.status === 2));
    }
  }, [activeTab, jsonAllAppObj]);

  return (
    <div className="w-full">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
                transition-colors duration-200
              `}
            >
              {tab.label}
              {/* You can add count badges here if needed */}
              {/* <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2.5 rounded-full text-xs">
                {count}
              </span> */}
            </button>
          ))}
        </nav>
      </div>

      {/* Content area for each tab */}
      {/* <div className="mt-4">
        {activeTab === "All" && <div>All content goes here</div>}
        {activeTab === "Accepted" && <div>Accepted content goes here</div>}
        {activeTab === "Rejected" && <div>Rejected content goes here</div>}
        {activeTab === "Franchised" && <div>Franchised content goes here</div>}
      </div> */}
    </div>
  );
};

export default TabComponent;
