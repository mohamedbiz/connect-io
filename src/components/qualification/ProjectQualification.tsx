
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { QualificationFormData } from "@/types/qualification";

interface ProjectQualificationProps {
  formData: QualificationFormData;
  updateFormData: (field: keyof QualificationFormData, value: string | number | boolean | null) => void;
}

const ProjectQualification = ({ formData, updateFormData }: ProjectQualificationProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-[#0A2342]">Project Qualification</h3>
      <p className="text-sm text-[#0E3366]">
        Please provide details about your project requirements and expectations.
      </p>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="project-scope">Project Scope Description</Label>
          <Textarea
            id="project-scope"
            placeholder="Describe your email marketing goals, specific challenges, and expected outcomes..."
            value={formData.project_scope || ""}
            onChange={e => updateFormData("project_scope", e.target.value)}
            rows={5}
          />
          <p className="text-xs text-[#0E3366]/80">
            Clear scope definition helps providers understand your project parameters
          </p>
        </div>

        <div className="flex items-start space-x-3 pt-2">
          <Checkbox
            id="accepts-timeframe"
            checked={formData.accepts_timeframe}
            onCheckedChange={(checked) => updateFormData("accepts_timeframe", checked === true)}
          />
          <div className="space-y-1">
            <Label htmlFor="accepts-timeframe" className="font-normal">
              I understand that implementation typically requires a 30-day window
            </Label>
            <p className="text-xs text-[#0E3366]/80">
              Quality email marketing implementation requires time for setup, testing, and optimization
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 pt-2">
          <Checkbox
            id="is-decision-maker"
            checked={formData.is_decision_maker}
            onCheckedChange={(checked) => updateFormData("is_decision_maker", checked === true)}
          />
          <div className="space-y-1">
            <Label htmlFor="is-decision-maker" className="font-normal">
              I am a business owner or decision maker with authority to approve projects
            </Label>
            <p className="text-xs text-[#0E3366]/80">
              Direct communication with decision makers ensures smoother project execution
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 pt-2">
          <Checkbox
            id="accepts-performance-based"
            checked={formData.accepts_performance_based}
            onCheckedChange={(checked) => updateFormData("accepts_performance_based", checked === true)}
          />
          <div className="space-y-1">
            <Label htmlFor="accepts-performance-based" className="font-normal">
              I'm open to compensation structures that include performance-based components
            </Label>
            <p className="text-xs text-[#0E3366]/80">
              This can align provider incentives with your business success
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 pt-2">
          <Checkbox
            id="allows-portfolio-use"
            checked={formData.allows_portfolio_use}
            onCheckedChange={(checked) => updateFormData("allows_portfolio_use", checked === true)}
          />
          <div className="space-y-1">
            <Label htmlFor="allows-portfolio-use" className="font-normal">
              If the project is successful, I'm willing to consider having it used as a case study
            </Label>
            <p className="text-xs text-[#0E3366]/80">
              Successful projects can be valuable portfolio pieces for both parties
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectQualification;
