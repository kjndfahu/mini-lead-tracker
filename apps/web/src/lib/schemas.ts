import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z
    .string()
    .email('Invalid email address')
    .or(z.literal(''))
    .optional(),
  company: z.string().max(100, 'Company name is too long').optional(),
  status: z.enum(['NEW', 'CONTACTED', 'IN_PROGRESS', 'WON', 'LOST']),
  value: z
    .number()
    .min(0, 'Value must be positive')
    .optional(),
  notes: z.string().max(1000, 'Notes are too long').optional(),
});

export type LeadFormValues = z.infer<typeof leadSchema>;
