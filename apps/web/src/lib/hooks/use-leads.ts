import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/query-keys';
import type { LeadsQuery, CreateLeadData } from '@/lib/types';

export function useLeads(query: LeadsQuery) {
  return useQuery({
    queryKey: queryKeys.leads.list(query),
    queryFn: () => api.leads.list(query),
  });
}

export function useCreateLead(onSuccess?: () => void) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateLeadData) => api.leads.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.leads.all });
      onSuccess?.();
    },
  });
}
