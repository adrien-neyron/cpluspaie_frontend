export interface User {
  sub: string;
  email: string;
  email_verified: boolean;
  name?: string;
  nickname?: string;
  picture?: string;
  updated_at: string;
  'https://api.yourapp.com/roles': UserRole[];
  'https://api.yourapp.com/email': string;
}

export type UserRole = 'Admin' | 'Client';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userRole: UserRole | null;
  isAdmin: boolean;
  isClient: boolean;
}