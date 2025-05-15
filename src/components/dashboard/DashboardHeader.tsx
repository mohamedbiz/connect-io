
import { Bell, Calendar, Clock, User } from "lucide-react";
import { useState, useEffect } from "react";

interface DashboardHeaderProps {
  title: string;
  firstName?: string;
  role?: string;
}

const DashboardHeader = ({ title, firstName, role }: DashboardHeaderProps) => {
  const greeting = getTimeBasedGreeting();
  const [date, setDate] = useState<Date>(new Date());
  
  // Update date every minute
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);
  
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
  
  // Get relevant actions based on user role
  const quickActions = getQuickActions(role);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <div className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-[#0A2342]">{title}</h1>
            <div className="ml-3 bg-[#BFD7ED]/20 p-1 rounded text-xs text-[#2D82B7] font-medium">
              {role === 'provider' ? 'Provider' : 'Founder'}
            </div>
          </div>
          
          {firstName && (
            <div className="mt-1">
              <p className="text-[#0E3366] flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1.5 text-[#2D82B7]/70" />
                {greeting}, {firstName}
              </p>
              <p className="text-[#0E3366]/70 text-sm flex items-center mt-1">
                <Calendar className="h-3.5 w-3.5 mr-1.5 text-[#2D82B7]/70" />
                {formattedDate}
              </p>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <button className="bg-[#BFD7ED]/10 p-2 rounded-full hover:bg-[#BFD7ED]/20">
              <Bell className="h-5 w-5 text-[#2D82B7]" />
            </button>
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </div>
          
          <div className="bg-[#BFD7ED]/10 p-2 rounded-full">
            <User className="h-5 w-5 text-[#2D82B7]" />
          </div>
          
          <span className="text-sm text-[#0E3366] hidden md:block">
            {firstName ? `${firstName}'s Account` : 'My Account'}
          </span>
        </div>
      </div>
      
      {/* Quick Actions */}
      {quickActions.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {quickActions.map((action, index) => (
            <button 
              key={index}
              onClick={action.onClick}
              className="bg-[#BFD7ED]/10 hover:bg-[#BFD7ED]/20 text-[#2D82B7] text-sm px-3 py-1.5 rounded-md flex items-center"
            >
              {action.icon && <action.icon className="h-4 w-4 mr-1.5" />}
              {action.label}
            </button>
          ))}
        </div>
      )}
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

// Helper function to get quick actions based on user role
function getQuickActions(role?: string) {
  if (role === 'provider') {
    return [
      { label: 'Update Profile', icon: User, onClick: () => {} },
      { label: 'Check Matches', icon: undefined, onClick: () => {} },
      { label: 'View Messages', icon: undefined, onClick: () => {} }
    ];
  }
  
  // Default to founder actions
  return [
    { label: 'Complete Qualification', icon: undefined, onClick: () => {} },
    { label: 'Find Providers', icon: undefined, onClick: () => {} },
    { label: 'View Dashboard', icon: undefined, onClick: () => {} }
  ];
}

export default DashboardHeader;
