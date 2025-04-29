
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface RevenuePercentageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const RevenuePercentageSelector = ({ value, onChange }: RevenuePercentageSelectorProps) => {
  return (
    <div>
      <Label htmlFor="revenue_percentage">Current Email Revenue (%)</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="revenue_percentage" className="mt-1">
          <SelectValue placeholder="What percentage of your revenue comes from email?" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="less_than_5">Less than 5%</SelectItem>
          <SelectItem value="5_10">5-10%</SelectItem>
          <SelectItem value="10_20">10-20%</SelectItem>
          <SelectItem value="20_30">20-30%</SelectItem>
          <SelectItem value="over_30">Over 30%</SelectItem>
          <SelectItem value="not_sure">Not sure</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
