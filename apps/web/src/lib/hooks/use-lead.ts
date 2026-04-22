import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { UpdateLeadData } from '@/lib/types';
import { leadsKeys } from './use-leads';

export const leadKeys = {
  detail: (id: string) => ['leads', 'detail', id] as const,
  comments: (id: string) => ['leads', 'comments', id] as const,
};

export function useLead(id: string) {
  return useQuery({
    queryKey: leadKeys.detail(id),
    queryFn: () => api.leads.get(id),
  });
}

export function useUpdateLead(id: string, onSuccess?: () => void) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateLeadData) => api.leads.update(id, data),
    onSuccess: (updated) => {
      qc.setQueryData(leadKeys.detail(id), updated);
      qc.invalidateQueries({ queryKey: leadsKeys.all });
      onSuccess?.();
    },
  });
}

export function useDeleteLead(id: string, onSuccess?: () => void) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => api.leads.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: leadsKeys.all });
      qc.removeQueries({ queryKey: leadKeys.detail(id) });
      onSuccess?.();
    },
  });
}

export function useComments(leadId: string) {
  return useQuery({
    queryKey: leadKeys.comments(leadId),
    queryFn: () => api.comments.list(leadId),
  });
}

export function useAddComment(leadId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (text: string) => api.comments.create(leadId, text),
    onSuccess: (created) => {
      qc.setQueryData(leadKeys.comments(leadId), (prev: typeof created[] = []) => [
        created,
        ...prev,
      ]);
    },
  });
}
