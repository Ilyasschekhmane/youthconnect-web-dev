'use client';

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { uploadDocumentAction } from '@/features/applications/mutations';
import { Button } from '@/components/button';
import { Card, CardContent } from '@/components/card';
import { Upload, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

interface DocumentUploaderProps {
  applicationId: string;
  userId: string;
  documentType: string;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  maxSizeMB?: number;
}

export function DocumentUploader({
  applicationId,
  userId,
  documentType,
  onSuccess,
  onError,
  maxSizeMB = 10,
}: DocumentUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSizeBytes) {
      const error = `File size exceeds ${maxSizeMB}MB limit`;
      setError(error);
      setUploadedFile(null);
      onError?.(error);
      return;
    }

    // Validate file type (basic check)
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      const error = 'Invalid file type. Allowed: PDF, JPG, PNG, DOC, DOCX';
      setError(error);
      setUploadedFile(null);
      onError?.(error);
      return;
    }

    setUploadedFile({ name: file.name, size: file.size });
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError('No file selected');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      // Read file as data URL for upload
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          // For now, mock upload - in production, upload to Supabase Storage first
          // const fileUrl = await uploadToSupabaseStorage(file);
          const fileUrl = `/documents/${applicationId}/${file.name}`;

          // Call server action to create document record
          await uploadDocumentAction(applicationId, userId, documentType, file.name, fileUrl, file.type);

          setSuccess(`✓ ${file.name} uploaded successfully`);
          setUploadedFile(null);
          setUploading(false);
          fileInputRef.current!.value = '';
          onSuccess?.({ fileName: file.name, fileUrl });
        } catch (err: any) {
          const errorMsg = err.message || 'Upload failed';
          setError(errorMsg);
          onError?.(errorMsg);
          setUploading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      const errorMsg = err.message || 'Upload failed';
      setError(errorMsg);
      onError?.(errorMsg);
      setUploading(false);
    }
  };

  return (
    <Card className="border-dashed">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-4">
            <label htmlFor="file-input" className="flex-1">
              <div className="rounded-lg border-2 border-dashed border-slate-600 p-6 hover:border-cyan-500 transition cursor-pointer">
                <div className="flex flex-col items-center text-center">
                  <Upload className="h-8 w-8 text-slate-400 mb-2" />
                  <p className="text-sm font-medium text-slate-300">
                    {uploadedFile ? uploadedFile.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">PDF, JPG, PNG, DOC up to {maxSizeMB}MB</p>
                  {uploadedFile && (
                    <p className="text-xs text-slate-400 mt-2">
                      {(uploadedFile.size / 1024).toFixed(2)} KB
                    </p>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="file-input"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={uploading}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
              </div>
            </label>
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-lg bg-rose-500/10 p-3 border border-rose-500/20">
              <AlertCircle className="h-4 w-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-rose-300">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-start gap-2 rounded-lg bg-emerald-500/10 p-3 border border-emerald-500/20">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-emerald-300">{success}</p>
            </div>
          )}

          {uploadedFile && !uploading && !success && (
            <div className="flex gap-2">
              <Button type="submit" className="flex-1" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Upload {documentType}
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => {
                  setUploadedFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
              >
                Cancel
              </Button>
            </div>
          )}

          {uploading && (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin">
                <Upload className="h-5 w-5 text-cyan-400" />
              </div>
              <p className="text-sm text-slate-400 ml-2">Uploading...</p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
