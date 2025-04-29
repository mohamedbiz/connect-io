
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface CampaignTypesSelectorProps {
  selectedTypes: string[];
  onChange: (types: string[]) => void;
}

export const CampaignTypesSelector = ({ selectedTypes, onChange }: CampaignTypesSelectorProps) => {
  const toggleCampaignType = (type: string) => {
    let newTypes;
    
    if (selectedTypes.includes(type)) {
      newTypes = selectedTypes.filter(t => t !== type);
    } else {
      newTypes = [...selectedTypes, type];
    }
    
    onChange(newTypes);
  };

  return (
    <div>
      <Label className="mb-2 block">Campaign Types You're Interested In</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="newsletters" 
            checked={selectedTypes.includes('newsletters') || false}
            onCheckedChange={() => toggleCampaignType('newsletters')} 
          />
          <Label htmlFor="newsletters" className="cursor-pointer">Newsletters</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="promotional" 
            checked={selectedTypes.includes('promotional') || false}
            onCheckedChange={() => toggleCampaignType('promotional')} 
          />
          <Label htmlFor="promotional" className="cursor-pointer">Promotional Campaigns</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="seasonal" 
            checked={selectedTypes.includes('seasonal') || false}
            onCheckedChange={() => toggleCampaignType('seasonal')} 
          />
          <Label htmlFor="seasonal" className="cursor-pointer">Seasonal Campaigns</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="product_launches" 
            checked={selectedTypes.includes('product_launches') || false}
            onCheckedChange={() => toggleCampaignType('product_launches')} 
          />
          <Label htmlFor="product_launches" className="cursor-pointer">Product Launches</Label>
        </div>
      </div>
    </div>
  );
};
