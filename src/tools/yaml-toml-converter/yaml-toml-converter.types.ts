import type { UseValidationRule } from '@/composable/validation';

export interface YamlTomlConversionOptions {
  isYamlToToml: boolean;
}

export interface YamlTomlValidationRule extends UseValidationRule<string> {
  validator: (value: string) => boolean;
  message: string;
}

export type ConversionTransformer = (value: string) => string;
