import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { LeadsQuery, CreateLeadData } from '@/lib/types';

export const leadsKeys = {
  all: ['leads'] as const,
  list: (query: LeadsQuery) => ['leads', 'list', query] as const,
};

export function useLeads(query: LeadsQuery) {
  return useQuery({
    queryKey: leadsKeys.list(query),
    queryFn: () => api.leads.list(query),
  });
}

export function useCreateLead(onSuccess?: () => void) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateLeadData) => api.leads.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: leadsKeys.all });
      onSuccess?.();
    },
  });
}
