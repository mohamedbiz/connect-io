
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type AuthUserTypeSelectorProps = {
  userType: "founder" | "provider";
  setUserType: (value: "founder" | "provider") => void;
};

const AuthUserTypeSelector = ({ userType, setUserType }: AuthUserTypeSelectorProps) => {
  return (
    <Tabs
      defaultValue="founder"
      value={userType}
      onValueChange={(value) => setUserType(value as "founder" | "provider")}
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
