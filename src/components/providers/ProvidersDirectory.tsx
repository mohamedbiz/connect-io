import { useState } from "react";
import { ServiceProvider } from "@/types/provider";
import ProvidersList from "./ProvidersList";
import ProvidersComparison from "./ProvidersComparison";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Updated mock data with more relevant specialties
const mockProviders: ServiceProvider[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg",
    title: "Email Marketing Strategist",
    specialties: ["Abandoned Cart Recovery", "Post-Purchase Sequences"],
    rating: 4.8,
    projectsCompleted: 124,
    averageOrderValue: 2500,
    description: "Expert in creating high-converting email sequences for eCommerce businesses with focus on cart recovery and customer retention.",
    expertise: [
      {
        category: "Email Marketing",
        skills: ["Klaviyo", "Mailchimp", "A/B Testing"]
      },
      {
        category: "Analytics",
        skills: ["Revenue Attribution", "Conversion Tracking"]
      }
    ]
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "/placeholder.svg",
    title: "eCommerce Email Expert",
    specialties: ["Customer Winback", "List Growth"],
    rating: 4.9,
    projectsCompleted: 98,
    averageOrderValue: 3000,
    description: "Specialized in data-driven email strategies and customer winback campaigns that drive measurable results.",
    expertise: [
      {
        category: "Email Marketing",
        skills: ["Email Automation", "Segmentation", "Campaign Design"]
      },
      {
        category: "Growth",
        skills: ["List Building", "Popup Optimization"]
      }
    ]
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    avatar: "/placeholder.svg",
    title: "Conversion Optimization Specialist",
    specialties: ["Email List Growth", "Product Page Optimization"],
    rating: 4.7,
    projectsCompleted: 156,
    averageOrderValue: 2800,
    description: "Focus on optimizing the entire customer journey from email signup to purchase completion.",
    expertise: [
      {
        category: "Conversion",
        skills: ["CRO", "Landing Pages", "Email Forms"]
      },
      {
        category: "Content",
        skills: ["Email Copywriting", "Product Descriptions"]
      }
    ]
  }
];

const ProvidersDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [compareProviders, setCompareProviders] = useState<ServiceProvider[]>([]);

  const handleCompare = (provider: ServiceProvider) => {
    if (compareProviders.length < 3 && !compareProviders.find(p => p.id === provider.id)) {
      setCompareProviders([...compareProviders, provider]);
    }
  };

  const handleRemoveComparison = (providerId: string) => {
    setCompareProviders(compareProviders.filter(p => p.id !== providerId));
  };

  const filteredProviders = mockProviders.filter(provider =>
    provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search providers by name or specialty..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      <ProvidersComparison 
        providers={compareProviders} 
        onRemove={handleRemoveComparison} 
      />
      <ProvidersList 
        providers={filteredProviders} 
        onCompare={handleCompare} 
      />
    </div>
  );
};

export default ProvidersDirectory;
