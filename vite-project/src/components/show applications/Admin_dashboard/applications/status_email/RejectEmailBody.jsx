import React from "react";

function RejectEmailBody({ name }) {
  return (
    <>
      <div className="text-center mt-10 flex flex-col gap-3">
        <h1 className="text-3xl font-semibold">
          Application Status{" "}
          <span className="relative">
            Update
            <div className="h-[3px] w-20 bg-gray-400 absolute left-1 -bottom-2"></div>
          </span>
        </h1>
      </div>
      <main className="mt-8 px-5 sm:px-10">
        <h3>
          Dear <span className="font-bold">{name || "Applicant"}</span>,
        </h3>
        <br />
        <h2 className="text-gray-700 leading-relaxed">
          Thank you for your interest in our franchise opportunity and for
          taking the time to submit your application. After careful review of
          your application, we regret to inform you that we are unable to
          proceed with your franchise request at this time.
          <br />
          <br />
          This decision was based on our current franchise criteria and
          requirements. Please note that this decision does not reflect on your
          personal or professional capabilities.
          <br />
          <br />
          <span className="font-semibold">
            You may reapply in the future if:
          </span>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Your financial position changes significantly</li>
            <li>You gain additional relevant business experience</li>
            <li>Your target location becomes available</li>
          </ul>
        </h2>

        <div className="bg-gray-50 p-4 mt-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-2">
            For Additional Information:
          </h3>
          <p className="text-gray-600">
            Contact our Franchise Development Team
            <br />
            Email: info@yourcompany.com
            <br />
            Phone: (xyz) 123-4567
          </p>
        </div>
      </main>
    </>
  );
}

export default RejectEmailBody;
