import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowTableApplications from "./ShowTableApplications";
import { sendCustomEmail } from "./status_email/email";
import TabComponent from "./TabComponent";
import ReactDOMServer from "react-dom/server";
import RejectEmailBody from "./status_email/RejectEmailBody";
import FranchiseEmailBody from "./status_email/FranchiseEmailBody";

function MainApp({ getApplicants, jsonAllAppObj }) {
  const [jsonObj, setJsonObj] = useState(null);

  //const [tab, setTab] = useState("All");

  //const status_array = ["PENDING", "ACCEPTED", "FRANCHISED", "REJECTED"];

  useEffect(() => {
    setJsonObj(jsonAllAppObj);
  }, []);

  // ------------------- onAccept ---------------------
  async function onAccept(obj) {
    let url = `http://localhost:2016/admin/acceptApplicant`;
    let resp = await axios.post(
      url,
      { email: obj.email },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    if (resp.data.stat) {
      alert(resp.data.msg);
      getApplicants();
      sendCustomEmail({
        to_email: obj.email,
        to_name: obj.fname,
        template_id: import.meta.env.VITE_ACCEPT_EMAIL_TEMPLATE_ID,
      });
    }
  }
  // ------------------- onReject ---------------------
  async function onReject(obj) {
    let url = `http://localhost:2016/admin/rejectApplicant`;
    let resp = await axios.post(
      url,
      { email: obj.email },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    if (resp.data.stat) {
      alert(resp.data.msg);
      getApplicants();
      sendCustomEmail({
        to_email: obj.email,
        to_name: obj.fname,
        template_id: import.meta.env.VITE_REJECT_EMAIL_TEMPLATE_ID,
      });
    }
  }

  /// ------------------- onFranchise ---------------------
  async function onFranchise(obj) {
    let url = `http://localhost:2016/admin/grantApplicant`;
    let resp = await axios.post(
      url,
      { email: obj.email },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    if (resp.data.stat) {
      //alert(resp.data.msg);
      getApplicants();
      async function createFranCred(obj) {
        let url = `http://localhost:2016/admin/saveFranchiseCred`;
        resp = await axios.post(
          url,
          { email: obj.email },
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        );
        if (resp.data.stat) {
          alert(resp.data.msg);
          sendCustomEmail({
            to_email: obj.email,
            subject: "Congratulations! You Are Now A Franchisee",
            message: ReactDOMServer.renderToStaticMarkup(
              <FranchiseEmailBody
                name={obj.fname}
                pwd={resp.data.pwd}
                email={obj.email}
              />
            ),
          });
        }
      }
      createFranCred(obj);
    }
  }

  //var tabs = import.meta.env.ADMIN_DASHBOARD_TAB_IDS;

  return (
    <>
      <div className="w-full flex flex-col gap-3 m-3">
        <div className="w-full text-3xl font-medium text-black p-7 shadow-md bg-slate-400">
          Applications
        </div>
        <div className="w-full p-7">
          <TabComponent setJsonObj={setJsonObj} jsonAllAppObj={jsonAllAppObj} />
        </div>
        <div>
          <ShowTableApplications
            jsonObj={jsonObj}
            onAccept={onAccept}
            onReject={onReject}
            onFranchise={onFranchise}
          />
        </div>
      </div>
    </>
  );
}

export default MainApp;
