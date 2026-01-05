import type { FormatOptionsWithLanguage } from 'sql-formatter';

export interface SQLPrettifyConfig extends FormatOptionsWithLanguage {
  keywordCase: 'upper' | 'lower' | 'preserve';
  useTabs: boolean;
  language: string;
  indentStyle: 'standard' | 'tabularLeft' | 'tabularRight';
  tabulateAlias: boolean;
}

export interface SQLPrettifyService {
  formatSQL: (sql: string, config: SQLPrettifyConfig) => string;
}
