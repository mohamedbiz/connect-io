
import { Badge } from "@/components/ui/badge";
import { SequenceStep } from "@/types/post-purchase-diagnostics";

interface SequenceStatusBadgesProps {
  status: SequenceStep['status'];
  impact: SequenceStep['impact'];
}

const SequenceStatusBadges = ({ status, impact }: SequenceStatusBadgesProps) => {
  const getStatusColor = (status: SequenceStep['status']) => {
    switch (status) {
      case 'advanced':
        return 'bg-green-500/10 text-green-500';
      case 'basic':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'missing':
        return 'bg-red-500/10 text-red-500';
      default:
        return '';
    }
  };

  const getImpactColor = (impact: SequenceStep['impact']) => {
    switch (impact) {
      case 'high':
        return 'bg-purple-500/10 text-purple-500';
      case 'medium':
        return 'bg-blue-500/10 text-blue-500';
      case 'low':
        return 'bg-slate-500/10 text-slate-500';
      default:
        return '';
    }
  };

  return (
    <div className="flex gap-2">
      <Badge variant="secondary" className={getStatusColor(status)}>
        {status}
      </Badge>
      <Badge variant="secondary" className={getImpactColor(impact)}>
        {impact} impact
      </Badge>
    </div>
  );
};

export default SequenceStatusBadges;
