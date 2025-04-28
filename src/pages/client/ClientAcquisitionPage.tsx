
import Layout from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ClientAcquisitionForm from "@/components/client/ClientAcquisitionForm";

const ClientAcquisitionPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold mb-4 text-gray-900">Client Acquisition Process</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Generate effective outreach materials, discovery call scripts, and proposals to acquire new eCommerce clients for email marketing services.
            </p>
          </div>

          <ClientAcquisitionForm />
        </div>
      </div>
    </Layout>
  );
};

export default ClientAcquisitionPage;
