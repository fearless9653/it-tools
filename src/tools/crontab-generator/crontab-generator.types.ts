/**
 * Configuration for cronstrue
 */
export interface CronstrueConfig {
  verbose: boolean;
  dayOfWeekStartIndexZero: boolean;
  use24HourTimeFormat: boolean;
  throwExceptionOnParseError: boolean;
}

/**
 * Helper information for cron expressions
 */
export interface CronHelper {
  symbol: string;
  meaning: string;
  example: string;
  equivalent: string;
}
