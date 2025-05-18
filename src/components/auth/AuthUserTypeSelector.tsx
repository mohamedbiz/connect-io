
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type AuthUserTypeSelectorProps = {
  userType: "founder" | "provider";
  setUserType: (value: "founder" | "provider") => void;
};

const AuthUserTypeSelector = ({ userType, setUserType }: AuthUserTypeSelectorProps) => {
  // Added console.log to help debug user type selection
  const handleUserTypeChange = (value: string) => {
    console.log("User type changed to:", value);
    setUserType(value as "founder" | "provider");
  };

  return (
    <Tabs
      defaultValue={userType}
      value={userType}
      onValueChange={handleUserTypeChange}
      className="mb-6"
    >
      <TabsList className="grid grid-cols-2 w-full bg-[#BFD7ED]/30">
        <TabsTrigger 
          value="founder"
          className="data-[state=active]:bg-[#2D82B7] data-[state=active]:text-white"
        >
          I'm a Founder
        </TabsTrigger>
        <TabsTrigger 
          value="provider"
          className="data-[state=active]:bg-[#2D82B7] data-[state=active]:text-white"
        >
          I'm a Provider
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default AuthUserTypeSelector;
