import React from "react";
import Link from "next/link";

const SuccessPage: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>✅ Payment Successful</h1>
      <p>Thank you for your purchase! Your order has been completed.</p>
      <Link href="/">
        <a style={{ color: "#0070f3", textDecoration: "underline" }}>
          Go back to Home
        </a>
      </Link>
    </div>
  );
};

export default SuccessPage;
