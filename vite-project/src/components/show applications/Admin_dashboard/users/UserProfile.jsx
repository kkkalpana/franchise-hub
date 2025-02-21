import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UserProfile({ jsonAllAppObj, getApplicants }) {
  const [franchise, setFranchise] = useState(null);
  const params = useParams();
  const doRedirect = useNavigate();

  useEffect(() => {
    if (jsonAllAppObj === null) getApplicants();
  }, [jsonAllAppObj, getApplicants]);

  useEffect(() => {
    if (jsonAllAppObj !== null) {
      const matchedFranchise = jsonAllAppObj.filter(
        (obj) => obj.email === params.email
      );
      setFranchise(matchedFranchise.length > 0 ? matchedFranchise[0] : null);
    }
  }, [jsonAllAppObj, params.email]);

  if (franchise === null) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-slate-400">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 md:p-12">
        <h2 className="text-3xl font-semibold text-gray-800 border-b pb-4 mb-6 text-center">
          {franchise.fname} {franchise.lname}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1 */}
          <div className="space-y-4">
            <p>
              <span className="font-semibold text-gray-700">Email:</span> <br />
              <span className="text-gray-600">{franchise.email}</span>
            </p>
            <p>
              <span className="font-semibold text-gray-700">
                Residential Address:
              </span>{" "}
              <br />
              <span className="text-gray-600">{franchise.res_address}</span>
            </p>
            <p>
              <span className="font-semibold text-gray-700">
                Franchise Address:
              </span>{" "}
              <br />
              <span className="text-gray-600">
                {franchise.site_address}
                {", Floor: "} {franchise.site_floor}
                {", "} {franchise.site_city}
                {", "}
                {franchise.site_postal}
              </span>
            </p>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <p>
              <span className="font-semibold text-gray-700">
                Contact Number:
              </span>{" "}
              <br />
              <span className="text-gray-600">{franchise.phone}</span>
            </p>
            <p>
              <span className="font-semibold text-gray-700">
                Current Business:
              </span>{" "}
              <br />
              <span className="text-gray-600">{franchise.buis_name}</span>
            </p>
            <p>
              <span className="font-semibold text-gray-700">
                Franchisee since:
              </span>{" "}
              <br />
              <span className="text-red-600 text-bold">Date</span>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => doRedirect("/admin/franchises")}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
