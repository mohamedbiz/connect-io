
import { ChartContainer } from "@/components/ui/chart";

interface FormAnalysisChartProps {
  form: {
    currentRate: number;
    industryAverage: number;
    potentialRate: number;
  };
}

const FormAnalysisChart = ({ form }: FormAnalysisChartProps) => {
  const chartConfig = {
    current: {
      color: "#94a3b8",
      label: "Current Rate",
    },
    industry: {
      color: "#d1d5db",
      label: "Industry Average",
    },
    potential: {
      color: "#8b5cf6",
      label: "Potential Rate",
    },
  };

  return (
    <ChartContainer config={chartConfig}>
      <div className="w-full aspect-[3/1]">
        <div className="flex items-end justify-around h-full gap-4 pb-2">
          <div className="space-y-2 text-center">
            <div 
              className="w-16 bg-slate-200" 
              style={{
                height: `${(form.currentRate / form.potentialRate) * 100}%`,
                minHeight: "20px"
              }}
            />
            <span className="text-sm font-medium">Current</span>
            <span className="block text-sm text-muted-foreground">
              {form.currentRate}%
            </span>
          </div>
          <div className="space-y-2 text-center">
            <div 
              className="w-16 bg-gray-300" 
              style={{
                height: `${(form.industryAverage / form.potentialRate) * 100}%`,
                minHeight: "20px"
              }}
            />
            <span className="text-sm font-medium">Industry</span>
            <span className="block text-sm text-muted-foreground">
              {form.industryAverage}%
            </span>
          </div>
          <div className="space-y-2 text-center">
            <div 
              className="w-16 bg-primary" 
              style={{
                height: "100%",
                minHeight: "20px"
              }}
            />
            <span className="text-sm font-medium">Potential</span>
            <span className="block text-sm text-muted-foreground">
              {form.potentialRate}%
            </span>
          </div>
        </div>
      </div>
    </ChartContainer>
  );
};

export default FormAnalysisChart;
