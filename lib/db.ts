import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
/**
 * Postgres connection string. Vercel's Neon integration names it `<prefix>_DATABASE_URL`: in the
 * project `byhadara` (database `neon-coquelicot-lighthouse`) the prefix is `STORAGE_URL`. Plain
 * DATABASE_URL and POSTGRES_URL work too.
 */
export const databaseVariables = ['DATABASE_URL', 'STORAGE_URL_DATABASE_URL', 'POSTGRES_URL'];
export const databaseUrl = () =>
  databaseVariables.map((name) => process.env[name]).find(Boolean) ?? '';
let client: { url: string; sql: NeonQueryFunction<false, false> } | undefined;
/** Neon's HTTP client: one short request per query, suited to serverless functions. */
export function db() {
  const url = databaseUrl();
  if (!url) throw new Error('Database not configured.');
  if (client?.url !== url) client = { url, sql: neon(url) };
  return client.sql;
}
