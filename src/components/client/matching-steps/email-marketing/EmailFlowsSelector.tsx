
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface EmailFlowsSelectorProps {
  selectedFlows: string[];
  onChange: (flows: string[]) => void;
}

export const EmailFlowsSelector = ({ selectedFlows, onChange }: EmailFlowsSelectorProps) => {
  const toggleFlow = (flow: string) => {
    let newFlows;
    
    if (selectedFlows.includes(flow)) {
      newFlows = selectedFlows.filter(f => f !== flow);
    } else {
      newFlows = [...selectedFlows, flow];
    }
    
    onChange(newFlows);
  };

  return (
    <div>
      <Label className="mb-2 block">Automated Flows You Need Help With</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="welcome" 
            checked={selectedFlows.includes('welcome') || false}
            onCheckedChange={() => toggleFlow('welcome')} 
          />
          <Label htmlFor="welcome" className="cursor-pointer">Welcome Series</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="abandoned_cart" 
            checked={selectedFlows.includes('abandoned_cart') || false}
            onCheckedChange={() => toggleFlow('abandoned_cart')} 
          />
          <Label htmlFor="abandoned_cart" className="cursor-pointer">Abandoned Cart</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="browse_abandonment" 
            checked={selectedFlows.includes('browse_abandonment') || false}
            onCheckedChange={() => toggleFlow('browse_abandonment')} 
          />
          <Label htmlFor="browse_abandonment" className="cursor-pointer">Browse Abandonment</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="post_purchase" 
            checked={selectedFlows.includes('post_purchase') || false}
            onCheckedChange={() => toggleFlow('post_purchase')} 
          />
          <Label htmlFor="post_purchase" className="cursor-pointer">Post-Purchase</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="winback" 
            checked={selectedFlows.includes('winback') || false}
            onCheckedChange={() => toggleFlow('winback')} 
          />
          <Label htmlFor="winback" className="cursor-pointer">Customer Winback</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="review_request" 
            checked={selectedFlows.includes('review_request') || false} 
            onCheckedChange={() => toggleFlow('review_request')} 
          />
          <Label htmlFor="review_request" className="cursor-pointer">Review Request</Label>
        </div>
      </div>
    </div>
  );
};
