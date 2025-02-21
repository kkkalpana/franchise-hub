// import React from "react";

// function History() {
//   return (
//     <>
//       <center>
//         <h1>History</h1>
//       </center>
//     </>
//   );
// }
// export default History;

import React, { useState, useEffect } from "react";
import { Calendar, ArrowUpDown, TrendingUp, TrendingDown } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });

  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "asc",
  });

  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const doRedirect = useNavigate();

  useEffect(() => {
    if (dateRange.start && dateRange.end) {
      fetchSales();
    }
  }, [dateRange.start, dateRange.end]);

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

  async function fetchSales() {
    setLoading(true);
    setError(null);
    try {
      const email = localStorage.getItem("v_Franchisee_email");
      const jtoken = localStorage.getItem("jtoken");

      const response = await axios.post(
        "http://localhost:2016/franchisee/getfilteredSales",
        {
          email: email,
          start: dateRange.start,
          end: dateRange.end,
        },
        {
          headers: {
            Authorization: `Bearer ${jtoken}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.data.stat) {
        setSalesData(response.data.doc);
      }
    } catch (err) {
      if (err.response?.status === 403) {
        alert("Session expired - please login again");
        doRedirect("/");
      }
      setError(err.message || "An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  }

  const calculateGrowth = (current, previous) => {
    return previous ? ((current - previous) / previous) * 100 : 0;
  };

  const processedData =
    salesData.length > 0
      ? salesData.map((item, index) => {
          const previousDay = index > 0 ? salesData[index - 1] : null;
          return {
            ...item,
            salesGrowth: calculateGrowth(
              item.totalSales,
              previousDay?.totalSales
            ),
          };
        })
      : [];

  const avgSales =
    processedData.length > 0
      ? Math.round(
          processedData.reduce((sum, item) => sum + item.totalSales, 0) /
            processedData.length
        )
      : 0;

  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    if (!processedData.length) return [];

    return [...processedData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  return (
    <div className="min-h-screen h-full flex justify-center pt-10 pb-14">
      <div className="w-full px-2">
        <h1 className="text-2xl font-bold text-gray-800 shadow-sm bg-gray-100 py-10 px-10 rounded-lg">
          Sales History Overview
        </h1>

        <div className="bg-white p-6">
          <div className="flex items-center space-x-4 mb-6">
            <Calendar className="text-blue-600" />
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="text-gray-600">to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {loading && <div className="text-center py-4">Loading...</div>}
          {error && <div className="text-red-600 py-4">{error}</div>}

          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="p-4 text-left">
                      <button
                        className="flex items-center space-x-2 font-semibold text-gray-700"
                        onClick={() => sortData("date")}
                      >
                        <span>Date</span>
                        <ArrowUpDown className="h-4 w-4" />
                      </button>
                    </th>
                    <th className="p-4 text-left">
                      <button
                        className="flex items-center space-x-2 font-semibold text-gray-700"
                        onClick={() => sortData("customersVisited")}
                      >
                        <span>Visitors</span>
                        <ArrowUpDown className="h-4 w-4" />
                      </button>
                    </th>
                    <th className="p-4 text-left">
                      <button
                        className="flex items-center space-x-2 font-semibold text-gray-700"
                        onClick={() => sortData("totalSales")}
                      >
                        <span>Sales</span>
                        <ArrowUpDown className="h-4 w-4" />
                      </button>
                    </th>
                    <th className="p-4 text-left">Sales Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {getSortedData().map((row, index) => (
                    <tr
                      key={row.date}
                      className={`border-b border-gray-200 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-blue-50 transition-colors`}
                    >
                      <td className="p-4 font-medium">
                        {row.date.split("T")[0]}
                      </td>
                      <td className="p-4">
                        {row.customersVisited.toLocaleString()}
                      </td>
                      <td className="p-4">
                        ${row.totalSales.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-1">
                          {row.salesGrowth > 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : row.salesGrowth < 0 ? (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          ) : null}
                          <span
                            className={
                              row.salesGrowth > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {row.salesGrowth.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 border-t-2 border-gray-300 font-semibold">
                    <td colSpan="2" className="p-4 text-right">
                      Average Daily Sales:
                    </td>
                    <td className="p-4 text-blue-600">
                      ${avgSales.toLocaleString()}
                    </td>
                    <td className="p-4"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
