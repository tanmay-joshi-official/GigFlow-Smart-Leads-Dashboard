export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Sales User';
}

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
  source: 'Website' | 'Instagram' | 'Referral';
  website?: string;
  instagram?: string;
  referral?: string;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationData {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
}

export interface LeadsResponse {
  leads: Lead[];
  pagination: PaginationData;
}
