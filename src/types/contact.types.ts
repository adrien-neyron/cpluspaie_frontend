export interface Contact {
  id: string;
  user_id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: ContactStatus;
  created_at: string;
  updated_at: string;
  user_email?: string;
  user_name?: string;
}

export type ContactStatus = 'new' | 'in_progress' | 'resolved' | 'closed';

export interface CreateContactDTO {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactStats {
  total: number;
  new: number;
  in_progress: number;
  resolved: number;
  this_week: number;
}