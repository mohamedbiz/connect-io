
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import FounderRegistrationForm from "@/components/auth/FounderRegistrationForm";
import ProviderRegistrationForm from "@/components/auth/ProviderRegistrationForm";
import RegisterHeader from "@/components/auth/RegisterHeader";
import RegisterFooter from "@/components/auth/RegisterFooter";
import RegisterTabs from "@/components/auth/RegisterTabs";

const Register = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-md mx-auto">
          <Card className="border shadow-lg">
            <RegisterHeader />
            <CardContent>
              <Tabs defaultValue="founder" className="mb-6">
                <RegisterTabs />
                <TabsContent value="founder">
                  <FounderRegistrationForm />
                </TabsContent>
                <TabsContent value="provider">
                  <ProviderRegistrationForm />
                </TabsContent>
              </Tabs>
            </CardContent>
            <RegisterFooter />
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
