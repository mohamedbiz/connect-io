
import React from 'react';
import PayoutRequestForm from "@/components/payment/PayoutRequestForm";
import PaymentAnalytics from "@/components/payment/PaymentAnalytics";
import PayoutRequestsList from "@/components/payment/PayoutRequestsList";

const PaymentsTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-[#2D82B7]/30">
        <h3 className="text-xl font-semibold mb-4 text-[#0A2342]">Request Payout</h3>
        <PayoutRequestForm />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-[#2D82B7]/30">
        <h3 className="text-xl font-semibold mb-4 text-[#0A2342]">Payment Analytics</h3>
        <PaymentAnalytics />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-[#2D82B7]/30 lg:col-span-2">
        <h3 className="text-xl font-semibold mb-4 text-[#0A2342]">Your Payout Requests</h3>
        <PayoutRequestsList />
      </div>
    </div>
  );
};

export default PaymentsTab;
