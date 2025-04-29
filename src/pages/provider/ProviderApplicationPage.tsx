
import Layout from "@/components/layout/Layout";
import ProviderApplicationForm from "@/components/provider/ProviderApplicationForm";

const ProviderApplicationPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4 text-[#0A2342]">Provider Application</h1>
            <p className="text-lg text-[#0E3366] max-w-2xl mx-auto">
              Join our network of specialized service providers and connect with pre-qualified eCommerce businesses looking for your expertise.
            </p>
          </div>
          
          <ProviderApplicationForm />
        </div>
      </div>
    </Layout>
  );
};

export default ProviderApplicationPage;
