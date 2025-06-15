
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Mail, Send, Clock, CheckCircle, XCircle, Settings } from "lucide-react";
import { emailNotificationService } from "@/services/emailNotificationService";
import { toast } from "sonner";

interface NotificationSettingsProps {
  applications: any[];
}

const NotificationSettings = ({ applications }: NotificationSettingsProps) => {
  const [isAutoNotificationEnabled, setIsAutoNotificationEnabled] = useState(true);
  const [isSendingTest, setIsSendingTest] = useState(false);

  const notificationStats = {
    total: applications.length,
    sent: applications.filter(app => app.notification_sent).length,
    pending: applications.filter(app => !app.notification_sent && app.status !== 'submitted').length,
    autoEnabled: isAutoNotificationEnabled
  };

  const handleTestEmail = async () => {
    setIsSendingTest(true);
    try {
      const success = await emailNotificationService.sendApplicationNotification({
        applicationId: 'test-id',
        status: 'approved',
        applicantEmail: 'test@example.com',
        applicantName: 'Test User'
      });

      if (success) {
        toast.success('Test email sent successfully!');
      } else {
        toast.error('Failed to send test email');
      }
    } catch (error) {
      toast.error('Error sending test email');
    } finally {
      setIsSendingTest(false);
    }
  };

  const handleResendNotifications = async () => {
    const pendingApplications = applications.filter(app => 
      !app.notification_sent && app.status !== 'submitted'
    );

    for (const app of pendingApplications) {
      try {
        const profile = app.profiles;
        if (profile?.email) {
          await emailNotificationService.sendStatusUpdateEmail(
            app.id,
            app.status,
            profile.email,
            `${profile.first_name} ${profile.last_name}`,
            app.reviewer_notes
          );
        }
      } catch (error) {
        console.error(`Failed to resend notification for application ${app.id}:`, error);
      }
    }

    toast.success(`Resent notifications for ${pendingApplications.length} applications`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Email Notification Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Notification Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{notificationStats.total}</div>
            <div className="text-sm text-muted-foreground">Total Applications</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{notificationStats.sent}</div>
            <div className="text-sm text-muted-foreground">Notifications Sent</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{notificationStats.pending}</div>
            <div className="text-sm text-muted-foreground">Pending Notifications</div>
          </div>
          <div className="text-center">
            <Badge variant={notificationStats.autoEnabled ? "default" : "secondary"} className="text-xs">
              {notificationStats.autoEnabled ? "Auto ON" : "Auto OFF"}
            </Badge>
            <div className="text-sm text-muted-foreground mt-1">Auto Notifications</div>
          </div>
        </div>

        <Separator />

        {/* Settings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-medium">Automatic Notifications</div>
              <div className="text-sm text-muted-foreground">
                Send emails automatically when application status changes
              </div>
            </div>
            <Switch
              checked={isAutoNotificationEnabled}
              onCheckedChange={setIsAutoNotificationEnabled}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={handleTestEmail}
              disabled={isSendingTest}
              className="flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              {isSendingTest ? 'Sending...' : 'Send Test Email'}
            </Button>

            {notificationStats.pending > 0 && (
              <Button
                variant="secondary"
                onClick={handleResendNotifications}
                className="flex items-center gap-2"
              >
                <Clock className="h-4 w-4" />
                Resend Pending ({notificationStats.pending})
              </Button>
            )}
          </div>
        </div>

        <Separator />

        {/* Email Templates Info */}
        <div className="space-y-3">
          <div className="font-medium flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Email Templates
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              <span>Application Received</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-500" />
              <span>Under Review</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Application Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-500" />
              <span>Application Rejected</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
