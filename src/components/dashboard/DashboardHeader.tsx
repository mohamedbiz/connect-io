
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader = ({ title }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-[#0A2342]">{title}</h1>
      <Button 
        className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white transition-colors"
        onClick={() => navigate("/payments")}
      >
        <DollarSign className="h-4 w-4 mr-1" />
        Payments Dashboard
      </Button>
    </div>
  );
};

export default DashboardHeader;
