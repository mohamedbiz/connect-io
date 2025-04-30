
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "./StatusBadge";

interface ApplicationsTableProps {
  applications: any[];
  onReviewClick: (applicationId: string) => void;
}

const ApplicationsTable = ({ applications, onReviewClick }: ApplicationsTableProps) => {
  const [viewJson, setViewJson] = useState<string | null>(null);
  
  const handleViewJson = (data: any) => {
    setViewJson(JSON.stringify(data, null, 2));
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
    <Card>
      <CardHeader>
        <CardTitle>Applications</CardTitle>
        <CardDescription>
          Review and manage provider applications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Experience</TableHead>
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
                  
              const experienceYears = app.application_data?.years_experience || "N/A";
              const expertiseAreas = app.application_data?.expertise_areas || [];
                
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
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(app.submitted_at), { addSuffix: true })}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span>{experienceYears} years</span>
                      <div className="flex flex-wrap gap-1">
                        {expertiseAreas.slice(0, 2).map((area: string, i: number) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                        {expertiseAreas.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{expertiseAreas.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={app.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewJson(app.application_data)}
                      >
                        <Clipboard className="h-4 w-4 mr-1" />
                        Data
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => onReviewClick(app.id)}
                      >
                        <ClipboardCheck className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        
        {/* JSON Viewer Dialog */}
        <Dialog open={viewJson !== null} onOpenChange={(open) => !open && setViewJson(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Application Data</DialogTitle>
            </DialogHeader>
            <pre className="bg-slate-50 p-4 rounded-md overflow-auto text-sm">
              {viewJson}
            </pre>
            <Button onClick={() => setViewJson(null)}>Close</Button>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ApplicationsTable;
