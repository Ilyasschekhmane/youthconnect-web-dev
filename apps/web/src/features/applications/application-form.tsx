'use client';

import { useState } from 'react';
import { submitApplication } from '@/lib/db/mutations';
import { Button } from '@/components/button';
import {
  FormField,
  FormLabel,
  FormInput,
  FormTextarea,
  FormError,
  FormHelper,
} from '@/components/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';

interface ApplicationFormProps {
  applicationId: string;
  programName: string;
  onSuccess?: () => void;
}

export function ApplicationForm({
  applicationId,
  programName,
  onSuccess,
}: ApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    businessName: '',
    businessDescription: '',
    targetMarket: '',
    yearsOfExperience: '',
    motivation: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await submitApplication(applicationId, formData);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Application for {programName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <FormError>{error}</FormError>}

          <FormField>
            <FormLabel htmlFor="businessName" required>
              Business Name
            </FormLabel>
            <FormInput
              id="businessName"
              type="text"
              required
              value={formData.businessName}
              onChange={(e) =>
                setFormData({ ...formData, businessName: e.target.value })
              }
              placeholder="e.g., TechSolutions Morocco"
            />
            <FormHelper>
              The official name of your business or startup
            </FormHelper>
          </FormField>

          <FormField>
            <FormLabel htmlFor="businessDescription" required>
              Business Description
            </FormLabel>
            <FormTextarea
              id="businessDescription"
              required
              rows={4}
              value={formData.businessDescription}
              onChange={(e) =>
                setFormData({ ...formData, businessDescription: e.target.value })
              }
              placeholder="Describe your business idea, products/services, and unique value proposition"
            />
            <FormHelper>
              Tell us about your business and what makes it unique
            </FormHelper>
          </FormField>

          <FormField>
            <FormLabel htmlFor="targetMarket" required>
              Target Market
            </FormLabel>
            <FormInput
              id="targetMarket"
              type="text"
              required
              value={formData.targetMarket}
              onChange={(e) =>
                setFormData({ ...formData, targetMarket: e.target.value })
              }
              placeholder="e.g., SMEs in Morocco, Youth aged 18-35"
            />
            <FormHelper>
              Who are your ideal customers?
            </FormHelper>
          </FormField>

          <FormField>
            <FormLabel htmlFor="yearsOfExperience" required>
              Years of Experience
            </FormLabel>
            <FormInput
              id="yearsOfExperience"
              type="number"
              min="0"
              max="50"
              required
              value={formData.yearsOfExperience}
              onChange={(e) =>
                setFormData({ ...formData, yearsOfExperience: e.target.value })
              }
              placeholder="0"
            />
            <FormHelper>
              How many years of relevant experience do you have?
            </FormHelper>
          </FormField>

          <FormField>
            <FormLabel htmlFor="motivation" required>
              Motivation
            </FormLabel>
            <FormTextarea
              id="motivation"
              required
              rows={4}
              value={formData.motivation}
              onChange={(e) =>
                setFormData({ ...formData, motivation: e.target.value })
              }
              placeholder="Why do you want to join this program? What are your goals?"
            />
            <FormHelper>
              Tell us why you&apos;re applying and what you hope to achieve
            </FormHelper>
          </FormField>

          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
