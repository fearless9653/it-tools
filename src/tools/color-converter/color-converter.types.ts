import type { Colord } from 'colord';
import type { ValidationAttrs } from '@/composable/validation';

/**
 * Type of color format
 */
export type ColorFormatType = 'text' | 'color-picker';

/**
 * Configuration for a color format
 */
export interface ColorFormatConfig {
  label: string;
  parse?: (value: string) => Colord;
  format: (value: Colord) => string;
  placeholder?: string;
  invalidMessage?: string;
  type?: ColorFormatType;
}

/**
 * A complete color format object with validation and reactive value
 */
export interface ColorFormat {
  type: ColorFormatType;
  label: string;
  parse: (v: string) => Colord | undefined;
  format: (value: Colord) => string;
  placeholder?: string;
  value: Ref<string>;
  validation: {
    message: string;
    status: undefined | 'error';
    isValid: boolean;
    attrs: ValidationAttrs;
  };
}

/**
 * Supported color format keys
 */
export type ColorFormatKey = 'picker' | 'hex' | 'rgb' | 'hsl' | 'hwb' | 'lch' | 'cmyk' | 'name';
