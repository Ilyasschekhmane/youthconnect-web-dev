'use client';

import { useState } from 'react';
import { approveApplication, rejectApplication } from '@/lib/db/mutations';
import { Button } from '@/components/button';
import {
  FormField,
  FormLabel,
  FormTextarea,
  FormError,
} from '@/components/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { CheckCircle, XCircle } from 'lucide-react';

interface ApplicationReviewProps {
  applicationId: string;
  applicantName: string;
  programName: string;
  submittedAt: string;
  currentNotes?: string;
  onSuccess?: () => void;
}

export function ApplicationReview({
  applicationId,
  applicantName,
  programName,
  submittedAt,
  currentNotes,
  onSuccess,
}: ApplicationReviewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState(currentNotes || '');
  const [reviewAction, setReviewAction] = useState<'approve' | 'reject' | null>(null);

  const handleApprove = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      await approveApplication(applicationId, notes);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to approve application');
    } finally {
      setIsSubmitting(false);
      setReviewAction(null);
    }
  };

  const handleReject = async () => {
    if (!notes.trim()) {
      setError('Please provide a reason for rejection');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await rejectApplication(applicationId, notes);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reject application');
    } finally {
      setIsSubmitting(false);
      setReviewAction(null);
    }
  };

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>Review Application</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-slate-800/50 p-4 space-y-2">
          <div>
            <p className="text-xs text-slate-400">APPLICANT</p>
            <p className="text-white font-semibold">{applicantName}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">PROGRAM</p>
            <p className="text-white font-semibold">{programName}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">SUBMITTED</p>
            <p className="text-white font-semibold">
              {new Date(submittedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {error && <FormError>{error}</FormError>}

        <FormField>
          <FormLabel htmlFor="reviewNotes">
            {reviewAction === 'reject' ? 'Rejection Reason *' : 'Review Notes'}
          </FormLabel>
          <FormTextarea
            id="reviewNotes"
            rows={5}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={
              reviewAction === 'reject'
                ? 'Explain why the application was rejected...'
                : 'Add your review notes here...'
            }
            disabled={isSubmitting}
          />
        </FormField>

        {reviewAction === null ? (
          <div className="flex gap-2">
            <Button
              type="button"
              variant="success"
              onClick={() => setReviewAction('approve')}
              className="flex-1 flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              <CheckCircle className="h-4 w-4" />
              Approve Application
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={() => setReviewAction('reject')}
              className="flex-1 flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              <XCircle className="h-4 w-4" />
              Reject Application
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setReviewAction(null);
                setError(null);
              }}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant={reviewAction === 'approve' ? 'success' : 'danger'}
              onClick={reviewAction === 'approve' ? handleApprove : handleReject}
              isLoading={isSubmitting}
              className="flex-1"
            >
              {reviewAction === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
