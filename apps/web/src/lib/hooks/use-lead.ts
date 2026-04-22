import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/query-keys';
import type { UpdateLeadData } from '@/lib/types';

export function useLead(id: string) {
  return useQuery({
    queryKey: queryKeys.leads.detail(id),
    queryFn: () => api.leads.get(id),
  });
}

export function useUpdateLead(id: string, onSuccess?: () => void) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateLeadData) => api.leads.update(id, data),
    onSuccess: (updated) => {
      qc.setQueryData(queryKeys.leads.detail(id), updated);
      qc.invalidateQueries({ queryKey: queryKeys.leads.all });
      onSuccess?.();
    },
  });
}

export function useDeleteLead(id: string, onSuccess?: () => void) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => api.leads.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.leads.all });
      qc.removeQueries({ queryKey: queryKeys.leads.detail(id) });
      onSuccess?.();
    },
  });
}

export function useComments(leadId: string) {
  return useQuery({
    queryKey: queryKeys.leads.comments(leadId),
    queryFn: () => api.comments.list(leadId),
  });
}

export function useAddComment(leadId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (text: string) => api.comments.create(leadId, text),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.leads.comments(leadId) });
    },
  });
}
