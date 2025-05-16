
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  ChevronRight, 
  Mail, 
  ShoppingCart, 
  UserPlus, 
  LineChart,
  MessageSquare
} from "lucide-react";

interface DashboardNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const DashboardNavigation = ({ activeTab, onTabChange }: DashboardNavigationProps) => {
  const [unreadMessages, setUnreadMessages] = useState(0);
  
  // Quick action handlers
  const navigateToProviders = () => {
    onTabChange("providers");
  };
  
  const navigateToMatches = () => {
    onTabChange("matches");
  };
  
  const navigateToPayments = () => {
    onTabChange("payments");
  };
  
  const navigateToMessages = () => {
    // This would navigate to messages page when implemented
    toast.info("Messages feature coming soon!");
  };
  
  return (
    <div className="mb-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#0A2342] mb-4">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="justify-start h-auto py-3 border-[#2D82B7]/30 hover:bg-[#BFD7ED]/10"
            onClick={navigateToProviders}
          >
            <div className="flex items-start gap-3">
              <div className="bg-[#BFD7ED]/30 p-2 rounded-md">
                <UserPlus className="h-5 w-5 text-[#2D82B7]" />
              </div>
              <div className="text-left">
                <div className="font-medium">Find Providers</div>
                <p className="text-xs text-[#0E3366]/70 mt-1">
                  Connect with email marketing experts
                </p>
              </div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="justify-start h-auto py-3 border-[#2D82B7]/30 hover:bg-[#BFD7ED]/10"
            onClick={navigateToMatches}
          >
            <div className="flex items-start gap-3">
              <div className="bg-[#BFD7ED]/30 p-2 rounded-md">
                <MessageSquare className="h-5 w-5 text-[#2D82B7]" />
              </div>
              <div className="text-left">
                <div className="font-medium">My Matches</div>
                <p className="text-xs text-[#0E3366]/70 mt-1">
                  View and manage provider matches
                </p>
              </div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="justify-start h-auto py-3 border-[#2D82B7]/30 hover:bg-[#BFD7ED]/10"
            onClick={navigateToPayments}
          >
            <div className="flex items-start gap-3">
              <div className="bg-[#BFD7ED]/30 p-2 rounded-md">
                <LineChart className="h-5 w-5 text-[#2D82B7]" />
              </div>
              <div className="text-left">
                <div className="font-medium">Payments</div>
                <p className="text-xs text-[#0E3366]/70 mt-1">
                  Manage payments to providers
                </p>
              </div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="justify-start h-auto py-3 border-[#2D82B7]/30 hover:bg-[#BFD7ED]/10"
            onClick={() => onTabChange("diagnostic")}
          >
            <div className="flex items-start gap-3">
              <div className="bg-[#BFD7ED]/30 p-2 rounded-md">
                <Mail className="h-5 w-5 text-[#2D82B7]" />
              </div>
              <div className="text-left">
                <div className="font-medium">Email Diagnostic</div>
                <p className="text-xs text-[#0E3366]/70 mt-1">
                  Analyze your email marketing
                </p>
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavigation;
