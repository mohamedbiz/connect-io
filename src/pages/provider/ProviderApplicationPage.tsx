
import Layout from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ProviderApplicationForm from "@/components/provider/ProviderApplicationForm";

const ProviderApplicationPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold mb-4 text-gray-900">Provider Application</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join our network of email marketing experts and connect with pre-qualified eCommerce founders looking for your expertise.
            </p>
          </div>

          <ProviderApplicationForm />
        </div>
      </div>
    </Layout>
  );
};

export default ProviderApplicationPage;
