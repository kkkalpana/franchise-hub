import React from "react";

function AcceptEmailBody({ name }) {
  return (
    <>
      <div className="text-center mt-10 flex flex-col gap-3">
        <h1 className="text-3xl font-semibold">
          Congratulations on Your {""}
          <span className="relative">
            Approval!
            <div className="h-[3px] w-20 bg-[#365CCE] absolute left-1 -bottom-2"></div>
          </span>
        </h1>
      </div>
      <main className="mt-8 px-5 sm:px-10">
        <h3>
          Dear <span className="font-bold">{name || "Applicant"}</span>,
        </h3>
        <br />
        <h2 className="text-gray-700 leading-relaxed">
          We are pleased to inform you that your franchise application has been
          accepted. You are now one step closer to joining our growing family of
          successful franchise owners.
          <br />
          <br />
          <span className="font-semibold">Next Steps:</span>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>
              Schedule a consultation with our Franchise Development Manager
            </li>
            <li>
              Review the detailed franchise requirements and documentation
            </li>
            <li>Complete the initial franchise training program</li>
            <li>Finalize location and territory details</li>
          </ul>
        </h2>

        <div className="bg-gray-50 p-4 mt-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-2">
            Your Franchise Support Contact:
          </h3>
          <p className="text-gray-600">
            Name: XYZ
            <br />
            Position: Franchise Development Manager
            <br />
            Email: kansalkalpana01@gmail.com
            <br />
            Phone: (xyz) 123-4567
          </p>
        </div>
      </main>
    </>
  );
}

export default AcceptEmailBody;
