
interface SequenceRecommendationsProps {
  recommendations: string[];
  expectedLift: string;
}

const SequenceRecommendations = ({ recommendations, expectedLift }: SequenceRecommendationsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium">Expected Impact:</p>
        <p className="text-sm text-muted-foreground">{expectedLift}</p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Recommendations:</p>
        <ul className="space-y-1">
          {recommendations.map((rec, index) => (
            <li key={index} className="text-sm text-muted-foreground">
              • {rec}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SequenceRecommendations;
