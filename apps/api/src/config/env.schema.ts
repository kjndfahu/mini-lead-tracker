import { z } from 'zod';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

const portSchema = z.coerce.number().int().min(1).max(65535);

export const envSchema = z.object({
  NODE_ENV: z
    .enum([Environment.Development, Environment.Production, Environment.Test])
    .default(Environment.Development),
  PORT: portSchema.default(3001),
  DATABASE_URL: z.string().url().startsWith('postgresql://'),
});

export type EnvConfig = z.infer<typeof envSchema>;
