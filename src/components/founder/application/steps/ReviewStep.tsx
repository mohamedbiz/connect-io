
import { useFounderApplicationContext } from '../ApplicationContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  INDUSTRIES,
  EMAIL_PLATFORMS,
  LIST_SIZE_OPTIONS,
  PROJECT_TIMELINES,
  BUDGET_RANGES
} from '@/types/founder';

const ReviewStep = () => {
  const { formData } = useFounderApplicationContext();

  const getDisplayValue = (value: string, options: { value: string, label: string }[]) => {
    const option = options.find(opt => opt.value === value);
    return option ? option.label : value;
  };

  const getIndustryDisplay = () => {
    if (formData.industry.startsWith('other:')) {
      return formData.industry.substring(6); // Remove 'other:' prefix
    }
    return getDisplayValue(formData.industry, INDUSTRIES);
  };

  const getEmailPlatformDisplay = () => {
    if (formData.current_email_platform === 'other') {
      return formData.current_email_platform_other;
    }
    return getDisplayValue(formData.current_email_platform, EMAIL_PLATFORMS);
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-bold text-[#0A2342]">Review Your Information</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-8">
          {/* Business Information Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-[#0E3366] border-b pb-1">Business Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-500">Business Name</Label>
                <p className="text-[#0A2342]">{formData.business_name || 'Not provided'}</p>
              </div>
              
              <div>
                <Label className="text-sm text-gray-500">Industry</Label>
                <p className="text-[#0A2342]">{getIndustryDisplay() || 'Not provided'}</p>
              </div>
              
              <div>
                <Label className="text-sm text-gray-500">Monthly Revenue</Label>
                <p className="text-[#0A2342]">
                  {getDisplayValue(formData.monthly_revenue, [
                    { value: "under_10k", label: "Less than $10,000" },
                    { value: "10k_50k", label: "$10,000 - $50,000" },
                    { value: "50k_100k", label: "$50,000 - $100,000" },
                    { value: "100k_500k", label: "$100,000 - $500,000" },
                    { value: "over_500k", label: "Over $500,000" },
                    { value: "not_yet", label: "Not generating revenue yet" }
                  ]) || 'Not provided'}
                </p>
              </div>
              
              <div>
                <Label className="text-sm text-gray-500">Team Size</Label>
                <p className="text-[#0A2342]">
                  {getDisplayValue(formData.number_of_employees, [
                    { value: "solo", label: "Just me" },
                    { value: "2_5", label: "2-5 employees" },
                    { value: "6_10", label: "6-10 employees" },
                    { value: "11_50", label: "11-50 employees" },
                    { value: "over_50", label: "Over 50 employees" }
                  ]) || 'Not provided'}
                </p>
              </div>
              
              <div className="md:col-span-2">
                <Label className="text-sm text-gray-500">Website URL</Label>
                <p className="text-[#0A2342]">
                  {formData.website_url ? (
                    <a href={formData.website_url} target="_blank" rel="noopener noreferrer" className="text-[#2D82B7] hover:underline">
                      {formData.website_url}
                    </a>
                  ) : 'Not provided'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Email Marketing Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-[#0E3366] border-b pb-1">Email Marketing Needs</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-500">Current Email Platform</Label>
                <p className="text-[#0A2342]">{getEmailPlatformDisplay() || 'Not provided'}</p>
              </div>
              
              <div>
                <Label className="text-sm text-gray-500">Email List Size</Label>
                <p className="text-[#0A2342]">
                  {getDisplayValue(formData.email_list_size, LIST_SIZE_OPTIONS) || 'Not provided'}
                </p>
              </div>
              
              <div className="md:col-span-2">
                <Label className="text-sm text-gray-500">Current Email Strategies</Label>
                {formData.current_email_strategies.length > 0 ? (
                  <ul className="list-disc pl-5 text-[#0A2342]">
                    {formData.current_email_strategies.map(strategy => (
                      <li key={strategy}>
                        {strategy === 'other' 
                          ? formData.main_challenges_other 
                          : getDisplayValue(strategy, [
                              { value: "welcome_series", label: "Welcome series" },
                              { value: "abandoned_cart", label: "Abandoned cart emails" },
                              { value: "post_purchase", label: "Post-purchase follow-ups" },
                              { value: "newsletters", label: "Regular newsletters" },
                              { value: "promotional", label: "Promotional campaigns" },
                              { value: "winback", label: "Win-back campaigns" },
                              { value: "segmentation", label: "Segmentation & personalization" },
                              { value: "automation", label: "Advanced automations" },
                              { value: "none", label: "None yet" },
                              { value: "other", label: "Other" }
                            ])
                        }
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[#0A2342]">Not provided</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <Label className="text-sm text-gray-500">Main Challenges</Label>
                {formData.main_challenges.length > 0 ? (
                  <ul className="list-disc pl-5 text-[#0A2342]">
                    {formData.main_challenges.map(challenge => (
                      <li key={challenge}>
                        {challenge === 'other' 
                          ? formData.main_challenges_other 
                          : getDisplayValue(challenge, [
                              { value: "deliverability", label: "Email deliverability issues" },
                              { value: "open_rates", label: "Low open rates" },
                              { value: "click_rates", label: "Low click-through rates" },
                              { value: "conversion", label: "Poor conversion from emails" },
                              { value: "growth", label: "Difficulty growing list" },
                              { value: "segmentation", label: "Poor segmentation" },
                              { value: "content", label: "Creating engaging content" },
                              { value: "technical", label: "Technical implementation" },
                              { value: "strategy", label: "Lack of overall strategy" },
                              { value: "time", label: "Not enough time to manage emails" },
                              { value: "expertise", label: "Lack of expertise" },
                              { value: "other", label: "Other" }
                            ])
                        }
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[#0A2342]">Not provided</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Project Requirements Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-[#0E3366] border-b pb-1">Project Requirements</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-500">Project Timeline</Label>
                <p className="text-[#0A2342]">
                  {getDisplayValue(formData.project_timeline, PROJECT_TIMELINES) || 'Not provided'}
                </p>
              </div>
              
              <div>
                <Label className="text-sm text-gray-500">Budget Range</Label>
                <p className="text-[#0A2342]">
                  {getDisplayValue(formData.budget_range, BUDGET_RANGES) || 'Not provided'}
                </p>
              </div>
              
              <div className="md:col-span-2">
                <Label className="text-sm text-gray-500">Specific Goals</Label>
                {formData.specific_goals.length > 0 ? (
                  <ul className="list-disc pl-5 text-[#0A2342]">
                    {formData.specific_goals.map(goal => (
                      <li key={goal}>
                        {goal === 'other' 
                          ? formData.specific_goals_other 
                          : getDisplayValue(goal, [
                              { value: "improve_open_rates", label: "Improve email open rates" },
                              { value: "improve_clicks", label: "Improve click-through rates" },
                              { value: "increase_conversions", label: "Increase conversions from email" },
                              { value: "grow_list", label: "Grow email subscriber list" },
                              { value: "automate_flows", label: "Set up email automation flows" },
                              { value: "strategy", label: "Develop overall email marketing strategy" },
                              { value: "templates", label: "Create professional email templates" },
                              { value: "segmentation", label: "Implement advanced segmentation" },
                              { value: "reengagement", label: "Re-engage inactive subscribers" },
                              { value: "other", label: "Other" }
                            ])
                        }
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[#0A2342]">Not provided</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <Label className="text-sm text-gray-500">Preferred Communication</Label>
                {formData.preferred_communication.length > 0 ? (
                  <ul className="list-disc pl-5 text-[#0A2342]">
                    {formData.preferred_communication.map(method => (
                      <li key={method}>
                        {getDisplayValue(method, [
                          { value: "email", label: "Email" },
                          { value: "phone", label: "Phone" },
                          { value: "video", label: "Video calls" },
                          { value: "messenger", label: "Messenger/Chat" },
                          { value: "project_management", label: "Project management tool" }
                        ])}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[#0A2342]">Not provided</p>
                )}
              </div>
              
              {formData.expectations && (
                <div className="md:col-span-2">
                  <Label className="text-sm text-gray-500">Your Expectations</Label>
                  <p className="text-[#0A2342] whitespace-pre-wrap">{formData.expectations}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Additional Information Section */}
          {(formData.previous_experience || formData.referral_source || formData.additional_information) && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-[#0E3366] border-b pb-1">Additional Information</h3>
              
              <div className="grid grid-cols-1 gap-4">
                {formData.previous_experience && (
                  <div>
                    <Label className="text-sm text-gray-500">Previous Experience</Label>
                    <p className="text-[#0A2342]">
                      {getDisplayValue(formData.previous_experience, [
                        { value: "no_experience", label: "No previous experience" },
                        { value: "some_experience", label: "Some experience" },
                        { value: "extensive_experience", label: "Extensive experience" },
                        { value: "currently_working", label: "Currently working with a provider" }
                      ])}
                    </p>
                  </div>
                )}
                
                {formData.referral_source && (
                  <div>
                    <Label className="text-sm text-gray-500">Where You Heard About Us</Label>
                    <p className="text-[#0A2342]">
                      {getDisplayValue(formData.referral_source, [
                        { value: "search", label: "Search Engine" },
                        { value: "social_media", label: "Social Media" },
                        { value: "referral", label: "Referral" },
                        { value: "blog", label: "Blog or Article" },
                        { value: "email", label: "Email" },
                        { value: "event", label: "Event or Conference" },
                        { value: "other", label: "Other" }
                      ])}
                    </p>
                  </div>
                )}
                
                {formData.additional_information && (
                  <div>
                    <Label className="text-sm text-gray-500">Additional Information</Label>
                    <p className="text-[#0A2342] whitespace-pre-wrap">{formData.additional_information}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewStep;
