
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  Users,
  Star,
  Award
} from "lucide-react";

interface ApplicationMetricsProps {
  applications: any[];
}

const ApplicationMetrics = ({ applications }: ApplicationMetricsProps) => {
  const metrics = {
    total: applications.length,
    submitted: applications.filter(app => app.status === 'submitted').length,
    inReview: applications.filter(app => app.status === 'in_review').length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
    autoApproved: applications.filter(app => app.auto_approved).length,
    averageScore: applications.length > 0 
      ? Math.round(applications.reduce((sum, app) => sum + (app.automated_score || 0), 0) / applications.length)
      : 0,
    premiumTier: applications.filter(app => app.approval_tier === 'premium').length,
    verifiedTier: applications.filter(app => app.approval_tier === 'verified').length,
  };

  const approvalRate = metrics.total > 0 
    ? Math.round((metrics.approved / metrics.total) * 100)
    : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.total}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          <Clock className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{metrics.submitted}</div>
          <p className="text-xs text-muted-foreground">Need attention</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">In Review</CardTitle>
          <Users className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{metrics.inReview}</div>
          <p className="text-xs text-muted-foreground">Being processed</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Approved</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{metrics.approved}</div>
          <p className="text-xs text-muted-foreground">
            {metrics.autoApproved} auto-approved
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{approvalRate}%</div>
          <p className="text-xs text-muted-foreground">
            {metrics.rejected} rejected
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
          <Star className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.averageScore}</div>
          <div className="flex gap-1 mt-1">
            <Badge variant="outline" className="text-xs">
              <Award className="h-3 w-3 mr-1" />
              {metrics.premiumTier} Premium
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationMetrics;
