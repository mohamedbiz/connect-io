
import React from 'react';
import Layout from "@/components/layout/Layout";
import PaymentStatusChecker from "@/components/payment/PaymentStatusChecker";

const PaymentSuccessPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <PaymentStatusChecker />
      </div>
    </Layout>
  );
};

export default PaymentSuccessPage;
