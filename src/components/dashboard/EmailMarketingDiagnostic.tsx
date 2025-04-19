
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  LineChart, 
  Link, 
  Mail, 
  ShieldCheck, 
  TrendingUp, 
  Users 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

const emailPlatforms = [
  { id: "klaviyo", name: "Klaviyo" },
  { id: "mailchimp", name: "Mailchimp" },
  { id: "omnisend", name: "Omnisend" },
  { id: "brevo", name: "Brevo" },
  { id: "other", name: "Other" },
];

const storePlatforms = [
  { id: "shopify", name: "Shopify" },
  { id: "woocommerce", name: "WooCommerce" },
  { id: "magento", name: "Magento" },
  { id: "bigcommerce", name: "BigCommerce" },
  { id: "other", name: "Other" },
];

// Sample diagnostic data
const diagnosticData = {
  emailSequences: [
    { name: "Welcome Series", status: "Active", performance: 72 },
    { name: "Abandoned Cart", status: "Missing", performance: 0 },
    { name: "Post-Purchase", status: "Poor", performance: 35 },
    { name: "Win-back Campaign", status: "Missing", performance: 0 },
    { name: "Browse Abandonment", status: "Active", performance: 68 },
  ],
  impactMetrics: [
    { name: "Current Revenue", value: "$10,000" },
    { name: "Potential Revenue", value: "$25,000" },
    { name: "Revenue Gap", value: "$15,000" }
  ],
  opportunityChart: [
    { name: "Welcome", current: 900, potential: 1800 },
    { name: "Abandoned Cart", current: 0, potential: 8500 },
    { name: "Post Purchase", current: 2200, potential: 6000 },
    { name: "Win-back", current: 0, potential: 5500 },
    { name: "Browse", current: 3100, potential: 4200 },
  ]
};

const chartConfig = {
  current: {
    color: "#8884d8",
    label: "Current Revenue ($)",
  },
  potential: {
    color: "#82ca9d",
    label: "Potential Revenue ($)",
  },
};

const EmailMarketingDiagnostic = () => {
  const [storePlatform, setStorePlatform] = useState<string>("");
  const [emailPlatform, setEmailPlatform] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleConnect = () => {
    if (!storePlatform || !emailPlatform) {
      toast({
        title: "Missing Information",
        description: "Please select both your store and email platforms.",
        variant: "destructive"
      });
      return;
    }

    setIsConnected(true);
    toast({
      title: "Platforms Connected",
      description: "Your store and email platform have been connected successfully."
    });
  };

  const runDiagnostic = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      toast({
        title: "Diagnostic Complete",
        description: "Your email marketing diagnostic has been completed."
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Mail className="h-6 w-6" />
            Email Marketing Diagnostic
          </CardTitle>
          <CardDescription>
            Connect your store and email platform to get a comprehensive diagnostic of your email marketing performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isConnected ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Store Platform
                </label>
                <Select
                  value={storePlatform}
                  onValueChange={setStorePlatform}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your store platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {storePlatforms.map((platform) => (
                      <SelectItem key={platform.id} value={platform.id}>
                        {platform.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Marketing Platform
                </label>
                <Select
                  value={emailPlatform}
                  onValueChange={setEmailPlatform}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your email platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {emailPlatforms.map((platform) => (
                      <SelectItem key={platform.id} value={platform.id}>
                        {platform.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-2 flex justify-center mt-4">
                <Button onClick={handleConnect} className="w-full md:w-auto">
                  Connect Platforms
                </Button>
              </div>
            </div>
          ) : !showResults ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center rounded-full bg-green-100 p-2 mb-4">
                <ShieldCheck className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Platforms Connected Successfully</h3>
              <p className="text-muted-foreground mb-6">
                We can now analyze your email marketing performance and identify opportunities.
              </p>
              <Button 
                onClick={runDiagnostic} 
                disabled={isAnalyzing}
              >
                {isAnalyzing ? "Analyzing..." : "Run Diagnostic"}
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Sequence Assessment
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="px-4 py-2 text-left">Sequence</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Performance</th>
                        <th className="px-4 py-2 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {diagnosticData.emailSequences.map((sequence, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-3">{sequence.name}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              sequence.status === "Active" ? "bg-green-100 text-green-800" :
                              sequence.status === "Poor" ? "bg-yellow-100 text-yellow-800" :
                              "bg-red-100 text-red-800"
                            }`}>
                              {sequence.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    sequence.performance > 70 ? "bg-green-500" :
                                    sequence.performance > 40 ? "bg-yellow-500" :
                                    "bg-red-500"
                                  }`}
                                  style={{ width: `${sequence.performance}%` }}
                                ></div>
                              </div>
                              <span className="text-xs ml-2">{sequence.performance}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Button variant="outline" size="sm" className="flex items-center" asChild>
                              <Link href="/register" className="no-underline">
                                <span>Find Provider</span>
                                <Link className="h-4 w-4 ml-1" />
                              </Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Revenue Opportunity
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {diagnosticData.impactMetrics.map((metric, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">{metric.name}</p>
                          <p className="text-2xl font-bold mt-1">{metric.value}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="h-80 md:h-96">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={diagnosticData.opportunityChart}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="current" fill="#8884d8" name="Current Revenue ($)" />
                        <Bar dataKey="potential" fill="#82ca9d" name="Potential Revenue ($)" />
                      </BarChart>
                    </ResponsiveContainer>
                    <ChartLegend>
                      <ChartLegendContent />
                    </ChartLegend>
                  </ChartContainer>
                </div>
              </div>
              
              <div className="flex justify-center my-8">
                <Button size="lg" asChild>
                  <Link href="/register">
                    Connect with Email Marketing Specialists
                    <Users className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailMarketingDiagnostic;
