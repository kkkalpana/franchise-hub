import React, { useState, useEffect } from "react";
import { Calendar, Users, DollarSign, Send, AlertCircle } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DailySalesEntry = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    customersVisited: "",
    totalSales: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

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

  const validateField = (name, value) => {
    switch (name) {
      case "date":
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (!value) return "Date is required";
        if (selectedDate > today) return "Cannot enter future dates";
        const thirtyDaysAgo = new Date();
        // thirtyDaysAgo.setDate(today.getDate() - 30);
        // if (selectedDate < thirtyDaysAgo)
        //   return "Cannot enter dates older than 30 days";
        return "";

      case "customersVisited":
        const visitorsNum = Number(value);
        if (!value) return "Number of customers is required";
        if (isNaN(visitorsNum)) return "Must be a valid number";
        if (visitorsNum < 0) return "Cannot be negative";
        if (!Number.isInteger(visitorsNum)) return "Must be a whole number";
        if (visitorsNum > 10000) return "Value seems too high";
        return "";

      case "totalSales":
        const salesNum = Number(value);
        if (!value) return "Total sales amount is required";
        if (isNaN(salesNum)) return "Must be a valid number";
        if (salesNum < 0) return "Cannot be negative";

        if (Math.round(salesNum * 100) / 100 !== salesNum)
          return "Maximum 2 decimal places allowed";
        return "";

      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      date: true,
      customersVisited: true,
      totalSales: true,
    });

    if (!validateForm()) return;

    setStatus("submitting");

    try {
      const jtoken = localStorage.getItem("jtoken");

      const v_email = localStorage.getItem("v_Franchisee_email");
      if (!jtoken || !v_email) {
        setStatus("error");
        alert("Please login again - session expired");
        navigate("/");
        return;
      }

      // Convert string values to numbers before sending
      const salesData = {
        email: v_email,
        date: formData.date,
        customersVisited: parseInt(formData.customersVisited, 10),
        totalSales: Number(parseFloat(formData.totalSales).toFixed(2)),
      };

      // Check if sales entry exists
      const checkResponse = await axios.post(
        `http://localhost:2016/franchisee/chkSalesIfExist`,
        {
          email: v_email,
          date: formData.date,
        },
        {
          headers: {
            Authorization: `Bearer ${jtoken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (checkResponse.data.stat) {
        alert("Sales entry already exists for this date!");
        setStatus("");
        return;
      }

      const saveResponse = await axios.post(
        `http://localhost:2016/franchisee/addSales`,
        salesData,
        {
          headers: {
            Authorization: `Bearer ${jtoken}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert(saveResponse.data.msg);
      if (saveResponse.data.stat) {
        setStatus("success");
        setFormData((prev) => ({
          ...prev,
          customersVisited: "",
          totalSales: "",
        }));
        setTouched({});
        setErrors({});

        setTimeout(() => {
          setStatus("");
        }, 2000);
      } else {
        setStatus("error");
        alert(saveResponse.data.msg || "Failed to save sales data");
      }
    } catch (error) {
      console.error("Error submitting sales:", error);
      if (error.response?.status === 403) {
        alert("Session expired - please login again");
        navigate("/");
      } else {
        setStatus("error");
        alert(
          error.response?.data?.msg ||
            "An error occurred while saving sales data"
        );
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let processedValue = value;

    if (name === "customersVisited") {
      processedValue = value.replace(/\D/g, "");
    } else if (name === "totalSales") {
      processedValue = value.replace(/[^\d.]/g, "");
      const parts = processedValue.split(".");
      if (parts.length > 2) {
        processedValue = parts[0] + "." + parts.slice(1).join("");
      }
      if (parts[1]?.length > 2) {
        processedValue = parts[0] + "." + parts[1].slice(0, 2);
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    if (touched[name]) {
      const error = validateField(name, processedValue);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    const error = validateField(name, formData[name]);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  return (
    <div className="w-full mx-auto overflow-hidden ">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 shadow-sm bg-gray-100 py-8 px-8 rounded-lg mb-10">
          Sales History Overview
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-5xl mx-auto">
          {/* Date Field */}
          <div className="relative">
            <label className="block text-md font-medium text-gray-700 mb-1">
              Date
            </label>
            <div className="relative">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`pl-10 w-full rounded-md border py-2 px-3 text-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         ${errors.date ? "border-red-500" : "border-gray-300"}`}
              />
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            {touched.date && errors.date && (
              <div className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.date}
              </div>
            )}
          </div>

          {/* Customers Visited Field */}
          <div className="relative">
            <label className="block text-md font-medium text-gray-700 mb-1">
              Total Customers Visited
            </label>
            <div className="relative">
              <input
                type="text"
                name="customersVisited"
                value={formData.customersVisited}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`pl-10 w-full rounded-md border py-2 px-3 text-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         ${errors.customersVisited ? "border-red-500" : "border-gray-300"}`}
              />
              <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            {touched.customersVisited && errors.customersVisited && (
              <div className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.customersVisited}
              </div>
            )}
          </div>

          {/* Total Sales Field */}
          <div className="relative">
            <label className="block text-md font-medium text-gray-700 mb-1">
              Total Sales
            </label>
            <div className="relative">
              <input
                type="text"
                name="totalSales"
                value={formData.totalSales}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`pl-10 w-full rounded-md border py-2 px-3 text-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         ${errors.totalSales ? "border-red-500" : "border-gray-300"}`}
              />
              <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            {touched.totalSales && errors.totalSales && (
              <div className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.totalSales}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className={`w-full flex items-center justify-center gap-2 py-4 px-4 rounded-md 
                     text-white text-lg font-medium transition-colors duration-200
                     ${
                       status === "submitting"
                         ? "bg-[#ac5c48] cursor-not-allowed"
                         : "bg-[#E9522C] hover:bg-[#E9522C]"
                     }`}
          >
            <Send className="h-5 w-5" />
            {status === "submitting" ? "Publishing..." : "Publish Sales Data"}
          </button>
        </form>

        {/* Status Messages */}
        {status === "success" && (
          <div className="mt-4 p-2 bg-green-100 text-green-700 rounded-md text-center">
            Sales data published successfully!
          </div>
        )}
        {status === "error" && (
          <div className="mt-4 p-2 bg-red-100 text-red-700 rounded-md text-center">
            Error publishing sales data. Please try again.
          </div>
        )}
      </div>
    </div>
  );
};

export default DailySalesEntry;
