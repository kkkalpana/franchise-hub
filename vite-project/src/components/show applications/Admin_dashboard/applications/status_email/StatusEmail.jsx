{
  /*-----------------------------------  NOT USING THIS  -----------------------------------*/
}
{
  /*-----------------------------------  NOT USING THIS  -----------------------------------*/
}
{
  /*-----------------------------------  NOT USING THIS  -----------------------------------*/
}
{
  /*-----------------------------------  NOT USING THIS  -----------------------------------*/
}
{
  /*-----------------------------------  NOT USING THIS  -----------------------------------*/
}

import React, { useEffect, useState } from "react";
import { sendCustomEmail } from "./email.jsx";
import AcceptEmailBody from "./AcceptEmailBody.jsx";
import RejectEmailBody from "./RejectEmailBody.jsx";

function StatusEmail({ obj, actionPerformed }) {
  [details, setDetails] = useState({
    to_email: obj.email,
    subject: "",
    message: "",
  });

  useEffect(() => {
    console.log(obj.email);
    if (actionPerformed == 1) {
      const message = ReactDOMServer.renderToStaticMarkup(
        <AcceptEmailBody name={obj.fname} />
      );
      setDetails({
        to_email: obj.email,
        subject:
          "Congratulations! Your Franchise Application Has Been Accepted",
        message: message,
      });
    } else if (actionPerformed == 3) {
      const message = ReactDOMServer.renderToStaticMarkup(
        <RejectEmailBody name={obj.fname} />
      );
      setDetails({
        to_email: obj.email,
        subject: "Update Regarding Your Franchise Application",
        message: message,
      });
    }
  }, [actionPerformed]);

  useEffect(() => {
    if (details.to_email && details.subject && details.message) {
      sendCustomEmail(details); // Assuming sendCustomEmail expects the details object
    }
  }, [details]);

  return <div></div>;

  // const currentYear = new Date().getFullYear();

  // const renderContent = () => {
  //   if (actionPerformed === 1) return <AcceptEmailBody name={obj.fname} />;
  //   else if (actionPerformed === 3) return <RejectEmailBody name={obj.fname} />;
  // };

  // return (
  //   <div className="flex items-center justify-center flex-col mt-5">
  //     <section className="max-w-2xl mx-auto bg-white border border-blue-800 rounded-lg">
  //       {/* <header className="py-8 flex justify-center w-full">
  //         <a href="#">
  //           <img
  //             src="/your-franchise-logo.png"
  //             alt="Franchise Logo"
  //             className="h-16"
  //           />
  //         </a>
  //       </header> */}
  //       <div
  //         className={`w-full h-[2px] ${
  //           actionPerformed === "accepted" ? "bg-[#365CCE]" : "bg-gray-400"
  //         }`}
  //       ></div>

  //       {renderContent()}

  //       <p className="text-gray-500 px-5 sm:px-10 mt-8">
  //         This is an automated message from your franchise application system.
  //         Please do not reply directly to this email. For assistance, please
  //         contact our support team at{" "}
  //         <a
  //           href="mailto:support@yourfranchise.com"
  //           className="text-[#365CCE] hover:underline"
  //         >
  //           support@yourfranchise.com
  //         </a>
  //       </p>

  //       <footer className="mt-8">
  //         {/* Footer content remains the same */}
  //         <div className="bg-gray-300/60 h-[200px] flex flex-col gap-3 justify-center items-center">
  //           <div className="text-center flex flex-col gap-2">
  //             <h1 className="text-[#365CCE] font-semibold tracking-wide text-lg">
  //               Contact Us
  //             </h1>
  //             <a href="tel:+1-555-123-4567" className="text-gray-500">
  //               +1 (xyz) 123-4567
  //             </a>
  //             <a
  //               href="mailto:franchising@yourcompany.com"
  //               className="text-gray-500"
  //             >
  //               franchising@yourcompany.com
  //             </a>
  //           </div>
  //         </div>
  //         <div
  //           className={`${
  //             actionPerformed === 1 ? "bg-[#365CCE]" : "bg-gray-600"
  //           } py-5 text-white text-center`}
  //         >
  //           <p className="mt-3">
  //             © {currentYear} Your Franchise Name. All Rights Reserved.
  //           </p>
  //         </div>
  //       </footer>
  //     </section>
  //   </div>
  // );
}

export default StatusEmail;
