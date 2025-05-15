
import { User } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  firstName?: string;
}

const DashboardHeader = ({ title, firstName }: DashboardHeaderProps) => {
  const greeting = getTimeBasedGreeting();
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#0A2342]">{title}</h1>
        {firstName && (
          <p className="text-[#0E3366] mt-1">{greeting}, {firstName}</p>
        )}
      </div>
      
      <div className="mt-4 md:mt-0 flex items-center gap-2">
        <div className="bg-[#BFD7ED]/20 p-2 rounded-full">
          <User className="h-5 w-5 text-[#2D82B7]" />
        </div>
        <span className="text-sm text-[#0E3366]">
          {firstName ? `${firstName}'s Account` : 'My Account'}
        </span>
      </div>
    </div>
  );
};

// Helper function to get time-based greeting
function getTimeBasedGreeting() {
  const hour = new Date().getHours();
  
  if (hour < 12) {
    return "Good morning";
  } else if (hour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

export default DashboardHeader;
