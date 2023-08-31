import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <>
      <div style={{ width: "80%", marginLeft: "10%", marginTop: "5%" }}>
        <h1 style={{ fontSize: "30px", fontWeight: "900" }}>Security</h1>
        <br />
        <p style={{ fontSize: "20px" }}>
          Our Site is encrypted with Hypertext Transfer Protocol Secure (HTTPS).
          PDFClear does not access, use analyze or store any processed data. All
          raw data automatically removed when you leave PDFClear after working.
          You are responsible for all activities regarding maintaining of
        </p>
        <br />
        <h1 style={{ fontSize: "32px", fontWeight: "900" }}>
          Personal data processed for the following purpose and using the
          following service:
        </h1><br />
        <h1 style={{ fontSize: "30px", fontWeight: "900" }}>Advertising</h1>
        <br />
        <h1>Google AdSense (Google Inc.)</h1>
        <br />
        <p style={{ fontSize: "20px" }}>
          Google AdSense is an advertising service by Google Ireland Ltd
          (“Google”), Google AdSense use cookies to showing user behavior
          concerning ads. If you want to know Google’s use of data, consult
          Google’s partner policies.
        </p><br />
        <h1 style={{ fontSize: "30px", fontWeight: "900" }}>Analytics</h1>
        <br />
        <h1>Google Analytics (Google Inc.)</h1>
        <br />
        <p>
          Google Analytics is a web analytics service provided by Google Ireland
          Ltd (“Google”), Google use this data to track, analysis and prepare
          reports and share them with other Google products.
        </p><br />

        <h1 style={{ fontSize: "30px", fontWeight: "900" }}>Contact Us</h1>
        <br />
        <p>
          By filling the contact forms your email and name added to our users
          list and use for just new updates, account related queries and time to
          time notify our new offers.
        </p><br />

        <h1 style={{ fontSize: "30px", fontWeight: "900" }}>
          Payments Handling
        </h1>
        <br />
        <h1>Stripe (Stripe, Inc.)</h1>
        <br />
        <p style={{marginBottom:'5%'}}>
          You pay using Stripe, Stripe is a payment service platform which is
          provide by Stripe Inc. You pay with credit cards and other methods.
          These types of services use the information to send messages, emails,
          notifications and invoices regarding your payments.
        </p>
      </div>
    </>
  );
};
export default PrivacyPolicy;
