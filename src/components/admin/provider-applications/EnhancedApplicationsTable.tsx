
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Eye, ClipboardCheck, MoreHorizontal } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "./StatusBadge";
import ApplicationScoringCard from "./ApplicationScoringCard";
import ApplicationDetailsModal from "./ApplicationDetailsModal";

interface EnhancedApplicationsTableProps {
  applications: any[];
  onReviewClick: (applicationId: string) => void;
}

const EnhancedApplicationsTable = ({ 
  applications, 
  onReviewClick 
}: EnhancedApplicationsTableProps) => {
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  
  const handleViewDetails = (application: any) => {
    setSelectedApplication(application);
    setDetailsModalOpen(true);
  };

  const handleReviewFromModal = () => {
    setDetailsModalOpen(false);
    if (selectedApplication) {
      onReviewClick(selectedApplication.id);
    }
  };
  
  if (applications.length === 0) {
    return (
      <Card className="text-center py-6">
        <CardContent>
          <p className="text-muted-foreground">No applications in this category</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
          <CardDescription>
            Review and manage provider applications with enhanced scoring details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => {
                const applicantName = 
                  (app.profiles?.first_name && app.profiles?.last_name) 
                    ? `${app.profiles.first_name} ${app.profiles.last_name}` 
                    : (app.profiles?.email || "Unknown");
                    
                const data = app.application_data || {};
                const expertiseAreas = data.expertise_areas || [];
                  
                return (
                  <TableRow key={app.id}>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <img 
                            src={app.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(applicantName)}`} 
                            alt={applicantName} 
                          />
                        </Avatar>
                        <div>
                          <div className="font-medium">{applicantName}</div>
                          <div className="text-sm text-muted-foreground">{app.profiles?.email}</div>
                          <div className="text-sm text-muted-foreground">{data.location}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {app.automated_score ? (
                        <div className="space-y-1">
                          <div className="font-semibold text-sm">
                            {app.automated_score}/100
                          </div>
                          {app.approval_tier && (
                            <Badge variant="outline" className="text-xs">
                              {app.approval_tier}
                            </Badge>
                          )}
                          {app.auto_approved && (
                            <Badge className="text-xs bg-green-100 text-green-800">
                              Auto
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">Not scored</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="text-sm">
                          <span className="font-medium">EM:</span> {data.years_email_marketing || 'N/A'}yr
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">eComm:</span> {data.years_ecommerce || 'N/A'}yr
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {expertiseAreas.slice(0, 2).map((area: string, i: number) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {area}
                            </Badge>
                          ))}
                          {expertiseAreas.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{expertiseAreas.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {formatDistanceToNow(new Date(app.submitted_at), { addSuffix: true })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={app.status} />
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(app)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onReviewClick(app.id)}>
                            <ClipboardCheck className="h-4 w-4 mr-2" />
                            Review & Update
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ApplicationDetailsModal
        application={selectedApplication}
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        onReviewClick={handleReviewFromModal}
      />
    </>
  );
};

export default EnhancedApplicationsTable;
