
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Clipboard, XCircle } from "lucide-react";

type StatusBadgeProps = {
  status: string;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  switch (status) {
    case 'submitted':
      return (
        <Badge variant="outline" className="flex gap-1 items-center">
          <Clock className="h-3 w-3" />
          Submitted
        </Badge>
      );
    case 'in_review':
      return (
        <Badge variant="secondary" className="flex gap-1 items-center">
          <Clipboard className="h-3 w-3" />
          In Review
        </Badge>
      );
    case 'approved':
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex gap-1 items-center">
          <CheckCircle className="h-3 w-3" />
          Approved
        </Badge>
      );
    case 'rejected':
      return (
        <Badge variant="destructive" className="flex gap-1 items-center">
          <XCircle className="h-3 w-3" />
          Rejected
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default StatusBadge;
