
import { supabase } from "@/integrations/supabase/client";

export interface NotificationRequest {
  applicationId: string;
  status: 'submitted' | 'in_review' | 'approved' | 'rejected';
  applicantEmail: string;
  applicantName: string;
  reviewerNotes?: string;
}

export class EmailNotificationService {
  private static instance: EmailNotificationService;
  
  public static getInstance(): EmailNotificationService {
    if (!EmailNotificationService.instance) {
      EmailNotificationService.instance = new EmailNotificationService();
    }
    return EmailNotificationService.instance;
  }

  async sendApplicationNotification(request: NotificationRequest): Promise<boolean> {
    try {
      console.log('Sending application notification:', request);

      const { data, error } = await supabase.functions.invoke('send-application-notification', {
        body: request
      });

      if (error) {
        console.error('Error sending notification:', error);
        return false;
      }

      console.log('Notification sent successfully:', data);
      return true;
    } catch (error) {
      console.error('Failed to send notification:', error);
      return false;
    }
  }

  async sendWelcomeEmail(applicantEmail: string, applicantName: string): Promise<boolean> {
    return this.sendApplicationNotification({
      applicationId: '',
      status: 'approved',
      applicantEmail,
      applicantName
    });
  }

  async sendRejectionEmail(
    applicationId: string,
    applicantEmail: string, 
    applicantName: string, 
    reviewerNotes?: string
  ): Promise<boolean> {
    return this.sendApplicationNotification({
      applicationId,
      status: 'rejected',
      applicantEmail,
      applicantName,
      reviewerNotes
    });
  }

  async sendStatusUpdateEmail(
    applicationId: string,
    status: 'submitted' | 'in_review' | 'approved' | 'rejected',
    applicantEmail: string,
    applicantName: string,
    reviewerNotes?: string
  ): Promise<boolean> {
    return this.sendApplicationNotification({
      applicationId,
      status,
      applicantEmail,
      applicantName,
      reviewerNotes
    });
  }
}

export const emailNotificationService = EmailNotificationService.getInstance();
