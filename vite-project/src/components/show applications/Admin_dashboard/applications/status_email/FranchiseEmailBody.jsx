import React from "react";

function FranchiseEmailBody({ name, pwd, email }) {
  return (
    <div>
      <h1>Congratulations {name}!</h1>
      <p>
        Your franchise application has been accepted. We are thrilled to have
        you as a part of our franchise network.
      </p>
      <p>
        We look forward to working with you and helping you achieve your
        business goals.
      </p>
      <p>
        Your franchise credentials are as follows: Email: {email}
        Password: {pwd}
      </p>
      <p>
        If you have any questions or need further assistance, please don't
        hesitate to reach out to us.
      </p>
      <p>Best regards,</p>
      <p>The Franchise Team</p>
    </div>
  );
}

export default FranchiseEmailBody;
