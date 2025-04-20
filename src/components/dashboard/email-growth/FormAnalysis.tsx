
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormAnalysisChart from "./FormAnalysisChart";
import ImprovementRecommendations from "./ImprovementRecommendations";
import { SignupFormMetric } from "@/types/email-diagnostics";

interface FormAnalysisProps {
  forms: SignupFormMetric[];
  selectedForm: string;
  onFormChange: (formId: string) => void;
}

const FormAnalysis = ({ forms, selectedForm, onFormChange }: FormAnalysisProps) => {
  const selectedFormData = forms.find(form => form.id === selectedForm) || forms[0];

  const getBadgeVariant = (score: number) => {
    if (score > 70) return "default";
    if (score > 50) return "secondary";
    return "destructive";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Form-by-Form Analysis</CardTitle>
        <CardDescription>
          Detailed conversion metrics for each signup form on your site
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={selectedForm} onValueChange={onFormChange}>
          <TabsList className="mb-6">
            {forms.map(form => (
              <TabsTrigger key={form.id} value={form.id}>
                {form.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {forms.map(form => (
            <TabsContent key={form.id} value={form.id}>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{form.name}</h3>
                  <Badge variant={getBadgeVariant(form.score)}>
                    Score: {form.score}/100
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{form.description}</p>
                
                <FormAnalysisChart form={form} />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FormAnalysis;
