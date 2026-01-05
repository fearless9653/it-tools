/**
 * Available case formats
 */
export type CaseFormat =
  | 'lowercase'
  | 'uppercase'
  | 'camelcase'
  | 'capitalcase'
  | 'constantcase'
  | 'dotcase'
  | 'headercase'
  | 'nocase'
  | 'paramcase'
  | 'pascalcase'
  | 'pathcase'
  | 'sentencecase'
  | 'snakecase'
  | 'mockingcase';

/**
 * Case format item with label key and value
 */
export interface CaseFormatItem {
  labelKey: CaseFormat;
  value: string;
}
