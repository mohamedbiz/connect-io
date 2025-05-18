
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, User } from "lucide-react";

type RegisterTabsProps = {
  value: string;
  onChange: (value: string) => void;
};

const RegisterTabs = ({ value, onChange }: RegisterTabsProps) => {
  return (
    <TabsList className="grid grid-cols-2 w-full">
      <TabsTrigger 
        value="founder" 
        onClick={() => onChange("founder")}
        className={value === "founder" ? "bg-primary text-white" : ""}
      >
        <Building className="h-4 w-4 mr-1" />
        I'm a Founder
      </TabsTrigger>
      <TabsTrigger 
        value="provider"
        onClick={() => onChange("provider")}
        className={value === "provider" ? "bg-primary text-white" : ""}
      >
        <User className="h-4 w-4 mr-1" />
        I'm a Provider
      </TabsTrigger>
    </TabsList>
  );
};

export default RegisterTabs;
