
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reviewerNotes: string;
  setReviewerNotes: (notes: string) => void;
  technicalScore: number;
  setTechnicalScore: (score: number) => void;
  onUpdateStatus: (status: 'in_review' | 'approved' | 'rejected') => void;
  isUpdating: boolean;
}

const ReviewDialog = ({
  open,
  onOpenChange,
  reviewerNotes,
  setReviewerNotes,
  technicalScore,
  setTechnicalScore,
  onUpdateStatus,
  isUpdating
}: ReviewDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Review Provider Application</DialogTitle>
          <DialogDescription>
            Review the application details and update the status
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div>
            <h4 className="font-medium mb-2">Technical Assessment Score</h4>
            <input 
              type="number" 
              min="0" 
              max="100" 
              value={technicalScore}
              onChange={(e) => setTechnicalScore(Number(e.target.value))}
              className="w-full p-2 border rounded-md"
            />
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Reviewer Notes</h4>
            <Textarea
              placeholder="Add your review notes here..."
              value={reviewerNotes}
              onChange={(e) => setReviewerNotes(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
        </div>
        
        <DialogFooter className="flex justify-between sm:justify-between">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button 
              variant="secondary"
              onClick={() => onUpdateStatus('in_review')}
              disabled={isUpdating}
            >
              <Clock className="mr-2 h-4 w-4" />
              Mark In Review
            </Button>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="destructive"
              onClick={() => onUpdateStatus('rejected')}
              disabled={isUpdating}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button 
              variant="default"
              onClick={() => onUpdateStatus('approved')}
              disabled={isUpdating}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
