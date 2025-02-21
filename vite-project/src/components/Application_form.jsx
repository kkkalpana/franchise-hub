import React, { useState } from "react";
import axios from "axios";

function Applicant() {
  const [darkMode, setDarkMode] = useState(true);
  const [errors, setErrors] = useState({});
  const [obj, setobj] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    res_address: "",
    buis_name: "",
    site_address: "",
    site_city: "",
    site_postal: "",
    area_sqft: "",
    site_floor: "0",
    ownership: "Owned",
  });

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateField = (name, value) => {
    switch (name) {
      case "fname":
        return value.trim().length >= 2
          ? ""
          : "First name must be at least 2 characters";
      case "lname":
        return value.trim().length >= 2
          ? ""
          : "Last name must be at least 2 characters";
      case "email":
        return validateEmail(value) ? "" : "Please enter a valid email address";
      case "phone":
        return validatePhone(value)
          ? ""
          : "Please enter a valid 10-digit phone number";
      case "res_address":
        return value.trim().length >= 5
          ? ""
          : "Address must be at least 5 characters";
      default:
        return "";
    }
  };

  function doUpdate(event) {
    const { name, value } = event.target;
    setobj({ ...obj, [name]: value });

    // Validate field on change
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  }

  async function dosave() {
    // Validate all required fields
    const newErrors = {};
    ["fname", "lname", "email", "phone", "res_address"].forEach((field) => {
      const error = validateField(field, obj[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    // Check Terms and Conditions
    const tncCheckbox = document.querySelector('input[name="tnc"]');
    if (!tncCheckbox?.checked) {
      newErrors.tnc = "You must agree to the Terms and Conditions";
    }

    // If there are any errors, show them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      let url = `http://localhost:2016/applicant/saveFranApp`;
      let resp = await axios.post(url, obj, {
        headers: { "Content-Type": "application/json" },
      });

      if (resp.data.status === true) {
        alert(resp.data.msg);
        // Clear form after successful submission
        setobj({
          fname: "",
          lname: "",
          email: "",
          phone: "",
          res_address: "",
          buis_name: "",
          site_address: "",
          site_city: "",
          site_postal: "",
          area_sqft: "",
          site_floor: "0",
          ownership: "Owned",
        });
        setErrors({});
      } else {
        alert("Error submitting form");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  }

  const inputClassName = (fieldName) => `
    w-full px-5 py-3 rounded-lg font-medium border-2 
    placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline 
    ${darkMode ? "bg-[#302E30] text-white focus:border-white" : "bg-gray-100 text-black focus:border-black"}
    ${errors[fieldName] ? "border-red-500" : "border-transparent"}
  `;

  return (
    <div>
      <div className="flex flex-col justify-center items-center w-full h-full bg-[#282D2D] px-5">
        <div className="xl:max-w-3xl flex flex-col items-end justify-start overflow-hidden mb-2 w-full">
          <div className="flex">
            <h3 className="text-white">Dark Mode : &nbsp;</h3>
            <label className="inline-flex relative items-center mr-5 cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                readOnly
              />
              <div
                onClick={() => {
                  setDarkMode(!darkMode);
                }}
                className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
              ></div>
            </label>
          </div>
        </div>

        <div
          className={`xl:max-w-3xl ${darkMode ? "bg-black" : "bg-white"} w-full p-5 sm:p-10 rounded-md`}
        >
          <h1
            className={`text-center text-xl sm:text-3xl font-semibold ${darkMode ? "text-white" : "text-black"}`}
          >
            Register for Franchise
          </h1>

          <div className="w-full mt-8">
            <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full">
                  <input
                    className={inputClassName("fname")}
                    type="text"
                    placeholder="Your first name"
                    name="fname"
                    value={obj.fname}
                    onChange={doUpdate}
                  />
                  {errors.fname && (
                    <p className="text-red-500 text-sm mt-1">{errors.fname}</p>
                  )}
                </div>
                <div className="w-full">
                  <input
                    className={inputClassName("lname")}
                    type="text"
                    name="lname"
                    placeholder="Your last name"
                    value={obj.lname}
                    onChange={doUpdate}
                  />
                  {errors.lname && (
                    <p className="text-red-500 text-sm mt-1">{errors.lname}</p>
                  )}
                </div>
              </div>

              <div>
                <input
                  className={inputClassName("email")}
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={obj.email}
                  onChange={doUpdate}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.temail}</p>
                )}
              </div>

              <div>
                <input
                  className={inputClassName("phone")}
                  type="tel"
                  placeholder="Enter your phone"
                  name="phone"
                  value={obj.phone}
                  onChange={doUpdate}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <input
                  className={inputClassName("res_address")}
                  type="text"
                  placeholder="Address"
                  name="res_address"
                  value={obj.res_address}
                  onChange={doUpdate}
                />
                {errors.res_address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.res_address}
                  </p>
                )}
              </div>

              <hr style={{ border: "1px solid red", borderRadius: "5px" }} />

              <input
                className={inputClassName("exisbusiness")}
                type="text"
                name="buis_name"
                value={obj.buis_name}
                placeholder="Existing Business(if any)"
                onChange={doUpdate}
              />

              <input
                className={inputClassName("site_address")}
                type="text"
                name="site_address"
                value={obj.site_address}
                placeholder="Site Address/ location"
                onChange={doUpdate}
              />

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  className={inputClassName("site_city")}
                  type="text"
                  name="site_city"
                  value={obj.site_city}
                  placeholder="City"
                  onChange={doUpdate}
                />
                <input
                  className={inputClassName("site_postal")}
                  type="number"
                  name="site_postal"
                  value={obj.site_postal}
                  placeholder="Pincode"
                  onChange={doUpdate}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  className={inputClassName("area_sqft")}
                  type="number"
                  name="area_sqft"
                  value={obj.area_sqft}
                  placeholder="Area(in sq. ft.)"
                  onChange={doUpdate}
                />
                <select
                  className={inputClassName("site_floor")}
                  name="site_floor"
                  value={obj.site_floor}
                  onChange={doUpdate}
                >
                  <option value="0">Ground Floor</option>
                  <option value="1">1st Floor</option>
                  <option value="2">2nd Floor</option>
                  <option value="3">3rd Floor</option>
                </select>
              </div>

              <div className="flex flex-col justify-center items-center sm:flex-row gap-10">
                <label
                  className={`font-semibold text-sm-10 ${darkMode ? "text-white" : "text-black"}`}
                >
                  Ownership status:
                </label>
                <div className="flex sm:flex-row gap-2">
                  <input
                    className="h-7"
                    type="radio"
                    name="ownership"
                    value="Owned"
                    checked={obj.ownership === "Owned"}
                    onChange={doUpdate}
                  />
                  <span
                    className={`h-7 ${darkMode ? "text-white" : "text-black"}`}
                  >
                    Owned
                  </span>
                </div>
                <div className="flex sm:flex-row gap-2">
                  <input
                    className="h-7"
                    type="radio"
                    name="ownership"
                    value="Rented"
                    checked={obj.ownership === "Rented"}
                    onChange={doUpdate}
                  />
                  <span
                    className={`h-7 ${darkMode ? "text-white" : "text-black"}`}
                  >
                    Rented
                  </span>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-5">
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 cursor-pointer checked:accent-green-600"
                      name="tnc"
                    />
                    <span
                      className={`font-semibold text-sm-10 ${darkMode ? "text-white" : "text-black"}`}
                    >
                      Agreed to Terms and Conditions
                    </span>
                  </label>
                  {errors.tnc && (
                    <p className="text-red-500 text-sm mt-1">{errors.tnc}</p>
                  )}
                </div>
              </div>

              <button
                className="mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                onClick={dosave}
              >
                <svg
                  className="w-6 h-6 -ml-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                <span className="ml-3">Submit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Applicant;
