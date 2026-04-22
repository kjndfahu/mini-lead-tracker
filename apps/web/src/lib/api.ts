import { axiosInstance } from './axios';

import type {
  Lead,
  LeadsResponse,
  LeadsQuery,
  CreateLeadData,
  UpdateLeadData,
  Comment,
} from './types';

export const api = {
  leads: {
    list: (query: LeadsQuery = {}) => {
      const params: Record<string, string> = {};
      Object.entries(query).forEach(([k, v]) => {
        if (v !== undefined && v !== '') params[k] = String(v);
      });
      return axiosInstance.get<LeadsResponse>('/leads', { params }).then((r) => r.data);
    },
    get: (id: string) =>
      axiosInstance.get<Lead>(`/leads/${id}`).then((r) => r.data),
    create: (data: CreateLeadData) =>
      axiosInstance.post<Lead>('/leads', data).then((r) => r.data),
    update: (id: string, data: UpdateLeadData) =>
      axiosInstance.patch<Lead>(`/leads/${id}`, data).then((r) => r.data),
    delete: (id: string) =>
      axiosInstance.delete(`/leads/${id}`).then(() => undefined),
  },
  comments: {
    list: (leadId: string) =>
      axiosInstance.get<Comment[]>(`/leads/${leadId}/comments`).then((r) => r.data),
    create: (leadId: string, text: string) =>
      axiosInstance
        .post<Comment>(`/leads/${leadId}/comments`, { text })
        .then((r) => r.data),
  },
};
