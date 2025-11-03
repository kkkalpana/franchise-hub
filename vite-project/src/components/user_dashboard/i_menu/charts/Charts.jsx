import React, { useEffect } from "react";

function Charts() {
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

  return (
    <>
      <center>
        <h1>Charts</h1>
      </center>
    </>
  );
}
export default Charts;
