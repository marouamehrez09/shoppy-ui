import React from "react";
import Link from "next/link";

const CancelPage: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>❌ Payment Cancelled</h1>
      <p>
        Your payment was not completed. You can try again or contact support.
      </p>
      <Link href="/">
        <a style={{ color: "#0070f3", textDecoration: "underline" }}>
          Go back to Home
        </a>
      </Link>
    </div>
  );
};

export default CancelPage;
