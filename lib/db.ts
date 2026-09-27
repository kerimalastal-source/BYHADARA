import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
/**
 * Postgres connection string. Creating a Neon database from the Storage tab of the Vercel project
 * `byhadara` adds DATABASE_URL (and POSTGRES_URL) to the project.
 */
export const databaseUrl = () => process.env.DATABASE_URL || process.env.POSTGRES_URL || '';
let client: { url: string; sql: NeonQueryFunction<false, false> } | undefined;
/** Neon's HTTP client: one short request per query, suited to serverless functions. */
export function db() {
  const url = databaseUrl();
  if (!url) throw new Error('Database not configured.');
  if (client?.url !== url) client = { url, sql: neon(url) };
  return client.sql;
}
