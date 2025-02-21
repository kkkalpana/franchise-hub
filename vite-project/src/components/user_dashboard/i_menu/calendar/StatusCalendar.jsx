import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const StatusCalendar = ({ startDate = "2025-02-01" }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Sample data - replace with your actual data
  const submittedDates = ["2025-02-10", "2025-02-12", "2025-02-15"];
  const missingDates = ["2025-02-05", "2025-02-08"];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const isDateBeforeStart = (dateString) => {
    return new Date(dateString) < new Date(startDate);
  };

  useEffect(() => {
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

  const getDateStatus = (dateString) => {
    if (isDateBeforeStart(dateString)) return "disabled";

    const today = formatDate(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );

    if (dateString === today) return "current";
    if (submittedDates.includes(dateString)) return "submitted";
    if (missingDates.includes(dateString)) return "missing";
    return "default";
  };

  const getStatusColors = (status) => {
    switch (status) {
      case "current":
        return "bg-blue-500 text-white";
      case "submitted":
        return "bg-green-500 text-white";
      case "missing":
        return "bg-red-500 text-white";
      case "disabled":
        return "bg-gray-200 text-gray-400 cursor-not-allowed";
      default:
        return "bg-white hover:bg-gray-100";
    }
  };

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthYear = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <center>
      <div className="flexbox max-w-4xl rounded-lg shadow-lg bg-gray-300 flex flex-col p-4 mx-auto my-16">
        <div className="p-4 flex-grow flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => changeMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-semibold">{monthYear}</h2>
            <button
              onClick={() => changeMonth(1)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 flex-grow">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center font-medium p-2 text-gray-600"
              >
                {day}
              </div>
            ))}

            {Array.from({ length: firstDay }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const dateString = formatDate(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day
              );
              const status = getDateStatus(dateString);

              return (
                <div
                  key={day}
                  className={`aspect-square flex items-center justify-center text-lg font-medium 
                  rounded-lg transition-colors duration-200 
                  ${getStatusColors(status)}`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50">
          <div className="flex flex-col space-y-2">
            <div className="text-sm text-gray-600">
              Start Date: {new Date(startDate).toLocaleDateString()}
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                <span>Submitted</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                <span>Missing</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                <span>Current</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-200 rounded-full mr-2"></div>
                <span>Disabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </center>
  );
};

export default StatusCalendar;
