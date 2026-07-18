'use client';

import { useState } from 'react';
import { uploadDocument } from '@/lib/db/mutations';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { Button } from '@/components/button';
import { FormField, FormLabel, FormSelect, FormError } from '@/components/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { Upload, X, CheckCircle } from 'lucide-react';

interface DocumentUploadProps {
  applicationId: string;
  userId: string;
  organizationId: string;
  onSuccess?: () => void;
}

const DOCUMENT_TYPES = [
  { value: 'business_plan', label: 'Business Plan' },
  { value: 'identification', label: 'Identification Document' },
  { value: 'financial_statements', label: 'Financial Statements' },
  { value: 'business_license', label: 'Business License' },
  { value: 'cv', label: 'Curriculum Vitae' },
  { value: 'supporting_documents', label: 'Supporting Documents' },
];

interface UploadedDocument {
  id: string;
  fileName: string;
  documentType: string;
  status: string;
}

export function DocumentUpload({
  applicationId,
  userId,
  organizationId,
  onSuccess,
}: DocumentUploadProps) {
  const [documentType, setDocumentType] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!documentType) {
      setError('Please select a document type');
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const supabase = createSupabaseBrowserClient();

      // Upload file to Supabase Storage
      const fileName = `${applicationId}/${Date.now()}_${file.name}`;
      const { data, error: uploadError } = await supabase.storage
        .from('applications')
        .upload(fileName, file);

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      // Get public URL
      const { data: publicUrl } = supabase.storage
        .from('applications')
        .getPublicUrl(fileName);

      // Save document record in database
      const document = await uploadDocument(
        applicationId,
        userId,
        documentType,
        file.name,
        publicUrl.publicUrl,
        file.type
      );

      setUploadedDocuments([
        ...uploadedDocuments,
        {
          id: document.id,
          fileName: document.file_name,
          documentType,
          status: 'uploaded',
        },
      ]);

      onSuccess?.();
      setDocumentType('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload document');
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  const removeDocument = (id: string) => {
    setUploadedDocuments(uploadedDocuments.filter((doc) => doc.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Documents</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && <FormError>{error}</FormError>}

        <FormField>
          <FormLabel htmlFor="documentType">Document Type</FormLabel>
          <FormSelect
            id="documentType"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            disabled={isUploading}
          >
            <option value="">Select a document type</option>
            {DOCUMENT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </FormSelect>
        </FormField>

        <label
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-600 px-6 py-8 hover:border-cyan-400 hover:bg-slate-800/50 transition"
        >
          <Upload className="h-6 w-6 text-slate-400" />
          <span className="text-sm text-slate-400">
            {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
          </span>
          <input
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            disabled={isUploading || !documentType}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
          />
        </label>

        {uploadedDocuments.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-white">Uploaded Documents</h4>
            {uploadedDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between rounded-lg bg-slate-800 p-3"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{doc.fileName}</p>
                    <p className="text-xs text-slate-400">
                      {DOCUMENT_TYPES.find((t) => t.value === doc.documentType)?.label}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeDocument(doc.id)}
                  className="rounded p-1 hover:bg-slate-700 transition"
                >
                  <X className="h-4 w-4 text-slate-400" />
                </button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
