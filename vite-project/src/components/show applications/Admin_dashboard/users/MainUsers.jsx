import React from "react";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function MainUsers({ jsonAllAppObj, getApplicants }) {
  const [jsonObj, setJsonObj] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (jsonAllAppObj === null) getApplicants();
  }, []);

  useEffect(() => {
    if (jsonAllAppObj !== null) {
      setJsonObj(jsonAllAppObj.filter((obj) => obj.status === 2));
    }
  }, [jsonAllAppObj]);

  const filteredUsers = jsonObj?.filter((obj) => {
    if (!searchTerm) return true;

    const fullName = `${obj.fname} ${obj.lname}`.toLowerCase();
    const city = obj.site_city.toLowerCase();
    const search = searchTerm.toLowerCase();

    return fullName.includes(search) || city.includes(search);
  });

  let doRedirect = useNavigate();
  function showUserProfile(obj) {
    doRedirect("/admin/users/details/" + obj.email);
  }

  return (
    <>
      <div className="w-full flex flex-col gap-3 m-3">
        <div className="w-full text-3xl font-medium text-black p-7 shadow-md bg-slate-400">
          Users
        </div>

        <div>
          <div className="min-h-screen h-full bg-white flex flex-col py-6 gap-4">
            {/* Search Bar */}
            <div className="w-full  px-4 flex justify-end">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or city..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="w-full">
              <div className="w-full overflow-x-scroll md:overflow-auto max-w-7xl 2xl:max-w-none">
                <table className="w-full">
                  <thead className="rounded-lg text-white font-medium w-full">
                    <tr className="bg-slate-400 text-lg">
                      <th className="py-5 px-4 text-[#212B36] text-center whitespace-nowrap">
                        SR. NO.
                      </th>
                      <th className="py-5 px-7 text-[#212B36] text-center whitespace-nowrap">
                        NAME
                      </th>
                      <th className="py-5 px-7 text-[#212B36] text-center whitespace-nowrap">
                        CITY
                      </th>
                      <th className="py-5 px-7 text-[#212B36] text-center">
                        EMAIL
                      </th>
                      <th className="py-5 px-7 text-[#212B36] text-center">
                        AVG. SALES
                      </th>
                      <th className="flex px-7 items-center justify-center py-5 text-center text-[#212B36] whitespace-nowrap">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers?.map((obj, index) => (
                      <tr
                        className="bg-white border border-b-grey text-lg"
                        key={index}
                      >
                        <td className="py-5 px-4 font-normal text-center">
                          {index + 1}
                        </td>
                        <td className="py-5 px-7 font-normal text-center">
                          {obj.fname + " " + obj.lname}
                        </td>
                        <td className="py-5 px-7 font-normal text-center">
                          {obj.site_city}
                        </td>
                        <td className="py-5 px-7 font-normal text-center">
                          {obj.email}
                        </td>
                        <td className="py-5 px-7 font-normal text-center">
                          $0
                        </td>
                        <td className="py-5 px-7 font-normal text-center">
                          <div className="flex items-center justify-center gap-3">
                            <button
                              className="flex-1 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 px-6 font-medium leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none active:shadow-lg"
                              onClick={() => showUserProfile(obj)}
                            >
                              User Profile
                            </button>
                            <button className="flex-1 py-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 px-6 font-medium leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none active:shadow-lg">
                              Sales
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainUsers;
