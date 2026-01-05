import cronstrue from 'cronstrue';
import { isValidCron } from 'cron-validator';
import type { CronHelper, CronstrueConfig } from './crontab-generator.types';

export { isCronValid, getCronString, getCronHelpers, getCronValidationRules };

/**
 * Validates a cron expression
 */
function isCronValid(v: string): boolean {
  return isValidCron(v, { allowBlankDay: true, alias: true, seconds: true });
}

/**
 * Gets the human-readable string for a cron expression
 */
function getCronString(cron: string, config: CronstrueConfig): string {
  if (isCronValid(cron)) {
    return cronstrue.toString(cron, config);
  }
  return ' ';
}

/**
 * Gets the cron expression helpers
 */
function getCronHelpers(): CronHelper[] {
  return [
    {
      symbol: '*',
      meaning: 'Any value',
      example: '* * * *',
      equivalent: 'Every minute',
    },
    {
      symbol: '-',
      meaning: 'Range of values',
      example: '1-10 * * *',
      equivalent: 'Minutes 1 through 10',
    },
    {
      symbol: ',',
      meaning: 'List of values',
      example: '1,10 * * *',
      equivalent: 'At minutes 1 and 10',
    },
    {
      symbol: '/',
      meaning: 'Step values',
      example: '*/10 * * *',
      equivalent: 'Every 10 minutes',
    },
    {
      symbol: '@yearly',
      meaning: 'Once every year at midnight of 1 January',
      example: '@yearly',
      equivalent: '0 0 1 1 *',
    },
    {
      symbol: '@annually',
      meaning: 'Same as @yearly',
      example: '@annually',
      equivalent: '0 0 1 1 *',
    },
    {
      symbol: '@monthly',
      meaning: 'Once a month at midnight on the first day',
      example: '@monthly',
      equivalent: '0 0 1 * *',
    },
    {
      symbol: '@weekly',
      meaning: 'Once a week at midnight on Sunday morning',
      example: '@weekly',
      equivalent: '0 0 * * 0',
    },
    {
      symbol: '@daily',
      meaning: 'Once a day at midnight',
      example: '@daily',
      equivalent: '0 0 * * *',
    },
    {
      symbol: '@midnight',
      meaning: 'Same as @daily',
      example: '@midnight',
      equivalent: '0 0 * * *',
    },
    {
      symbol: '@hourly',
      meaning: 'Once an hour at the beginning of the hour',
      example: '@hourly',
      equivalent: '0 * * * *',
    },
    {
      symbol: '@reboot',
      meaning: 'Run at startup',
      example: '',
      equivalent: '',
    },
  ];
}

/**
 * Gets the cron validation rules
 */
function getCronValidationRules(t: (key: string) => string) {
  return [
    {
      validator: (value: string) => isCronValid(value),
      message: t('tools.crontab-generator.message.invalidCron'),
    },
  ];
}
