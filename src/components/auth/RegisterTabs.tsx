
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, User } from "lucide-react";

const RegisterTabs = () => {
  return (
    <TabsList className="grid grid-cols-2 w-full">
      <TabsTrigger value="founder">
        <Building className="h-4 w-4 mr-1" />
        I'm a Founder
      </TabsTrigger>
      <TabsTrigger value="provider">
        <User className="h-4 w-4 mr-1" />
        I'm a Provider
      </TabsTrigger>
    </TabsList>
  );
};

export default RegisterTabs;
