
import { useFounderApplicationContext } from '../ApplicationContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdditionalInformationStep = () => {
  const { formData, updateFormData } = useFounderApplicationContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-bold text-[#0A2342]">Additional Information</CardTitle>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="previous_experience">Previous Experience with Email Marketing Services</Label>
          <Select 
            value={formData.previous_experience} 
            onValueChange={(value) => updateFormData({ previous_experience: value })}
          >
            <SelectTrigger className="border-[#2D82B7]/30 focus:ring-[#2D82B7]">
              <SelectValue placeholder="Select your experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no_experience">No previous experience</SelectItem>
              <SelectItem value="some_experience">Some experience</SelectItem>
              <SelectItem value="extensive_experience">Extensive experience</SelectItem>
              <SelectItem value="currently_working">Currently working with a provider</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="referral_source">How did you hear about us?</Label>
          <Select 
            value={formData.referral_source} 
            onValueChange={(value) => updateFormData({ referral_source: value })}
          >
            <SelectTrigger className="border-[#2D82B7]/30 focus:ring-[#2D82B7]">
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="search">Search Engine</SelectItem>
              <SelectItem value="social_media">Social Media</SelectItem>
              <SelectItem value="referral">Referral</SelectItem>
              <SelectItem value="blog">Blog or Article</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="event">Event or Conference</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="additional_information">Additional Information</Label>
          <Textarea
            id="additional_information"
            name="additional_information"
            value={formData.additional_information}
            onChange={handleChange}
            placeholder="Anything else you'd like to share or ask?"
            className="min-h-[100px] border-[#2D82B7]/30 focus-visible:ring-[#2D82B7]"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AdditionalInformationStep;
