export type LeadStatus = 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'WON' | 'LOST';

export interface Lead {
  id: string;
  name: string;
  email: string | null;
  company: string | null;
  status: LeadStatus;
  value: number | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  text: string;
  leadId: string;
  createdAt: string;
}

export interface LeadsResponse {
  data: Lead[];
  total: number;
  page: number;
  limit: number;
}

export interface LeadsQuery {
  q?: string;
  status?: LeadStatus | '';
  sort?: 'createdAt' | 'updatedAt';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface CreateLeadData {
  name: string;
  email?: string;
  company?: string;
  status?: LeadStatus;
  value?: number;
  notes?: string;
}

export type UpdateLeadData = Partial<CreateLeadData>;
