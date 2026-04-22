import type { LeadsQuery } from './types';

export enum QueryEntity {
  Leads = 'leads',
}

export enum LeadQueryType {
  List = 'list',
  Detail = 'detail',
  Comments = 'comments',
}

export const queryKeys = {
  leads: {
    all: [QueryEntity.Leads] as const,
    list: (query: LeadsQuery) => [QueryEntity.Leads, LeadQueryType.List, query] as const,
    detail: (id: string) => [QueryEntity.Leads, LeadQueryType.Detail, id] as const,
    comments: (id: string) => [QueryEntity.Leads, LeadQueryType.Comments, id] as const,
  },
};
