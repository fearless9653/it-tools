import { format as formatSQL } from 'sql-formatter';
import type { SQLPrettifyConfig } from './sql-prettify.types';

export { formatSQL as formatSQLQuery };

/**
 * Formats SQL query with given configuration
 * @param sql - The SQL query to format
 * @param config - The formatting configuration
 * @returns The formatted SQL query
 */
export function formatSQLQueryWithConfig(sql: string, config: SQLPrettifyConfig): string {
  return formatSQL(sql, config);
}
