export type UUID = string;

export interface UserSummary {
  id: UUID;
  email?: string;
  full_name?: string;
}

export interface City {
  id: UUID;
  name: string;
  slug?: string;
}

export interface Program {
  id: UUID;
  name: string;
  slug?: string;
  description?: string;
  capacity?: number;
  city_id?: UUID | null;
}

export interface DocumentRecord {
  id: UUID;
  file_name: string;
  file_url?: string | null;
  document_type: string;
  status: string;
  created_at: string;
}

export interface Appointment {
  id: UUID;
  appointment_type: string;
  starts_at: string;
  ends_at: string;
  status: string;
  notes?: string;
}

export interface AuditLog {
  id: UUID;
  actor_user_id?: UUID | null;
  entity_type: string;
  entity_id?: UUID | null;
  action: string;
  details: Record<string, any>;
  created_at: string;
}

export interface ApplicationDTO {
  id: UUID;
  organization_id: UUID;
  program_id: UUID;
  program?: Program | null;
  city_id?: UUID | null;
  city?: City | null;
  applicant_user_id: UUID;
  applicant?: UserSummary | null;
  status: string;
  submitted_at?: string | null;
  review_started_at?: string | null;
  decision_at?: string | null;
  score?: number | null;
  notes?: string | null;
  metadata?: Record<string, any>;
  documents?: DocumentRecord[];
  appointments?: Appointment[];
  created_at: string;
  updated_at: string;
}
