import type { LeadStatus } from './types';

export const STATUS_LABELS: Record<LeadStatus, string> = {
  NEW: 'New',
  CONTACTED: 'Contacted',
  IN_PROGRESS: 'In Progress',
  WON: 'Won',
  LOST: 'Lost',
};

export const STATUS_COLORS: Record<LeadStatus, string> = {
  NEW: 'bg-blue-100 text-blue-700',
  CONTACTED: 'bg-yellow-100 text-yellow-700',
  IN_PROGRESS: 'bg-purple-100 text-purple-700',
  WON: 'bg-green-100 text-green-700',
  LOST: 'bg-red-100 text-red-700',
};

export const ALL_STATUSES: LeadStatus[] = [
  'NEW',
  'CONTACTED',
  'IN_PROGRESS',
  'WON',
  'LOST',
];
