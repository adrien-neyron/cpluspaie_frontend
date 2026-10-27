export type DeadlineKind = 'variables' | 'validation' | 'payment' | 'social' | 'other';
export type DeadlineStatus = 'todo' | 'in_progress' | 'done';
export type RequestStatus = 'new' | 'in_progress' | 'resolved' | 'closed';

export interface Company {
  id: string; name: string; siret: string | null; ccn: string | null; headcount: number | null;
  status: 'prospect' | 'active' | 'archived'; notes?: string | null;
  members_count?: number; overdue_count?: number; next_due?: string | null;
}
export interface Deadline {
  id: string; company_id: string; company_name?: string; kind: DeadlineKind; title: string;
  due_date: string; status: DeadlineStatus; notes: string | null;
}
export interface DocumentMeta {
  id: string; company_id: string | null; title: string; description: string | null; category: string | null;
  file_name: string; mime_type: string; size_bytes: number; published: boolean; created_at: string;
}
export interface RequestItem {
  id: string; name: string; email: string; phone?: string | null; message: string; status: RequestStatus;
  source?: string; admin_notes?: string | null; created_at: string;
}
export interface CalendarSettings {
  company_id: string; variables_day: number; validation_day: number; payment_day: number; social_day: number;
}
export interface CompanyDetail extends Company {
  members: { id: string; email: string; name: string | null }[];
  contacts: { id: string; full_name: string; job_title: string | null; email: string | null; phone: string | null }[];
  calendar_settings: CalendarSettings | null;
  invitations: { id: string; email: string; accepted_at: string | null; created_at: string }[];
}
export interface AppUserRow {
  id: string; email: string; name: string | null; role: 'Admin' | 'Client'; created_at: string;
  companies: { id: string; name: string }[];
}
