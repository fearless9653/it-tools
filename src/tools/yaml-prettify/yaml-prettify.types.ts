import type { MaybeRef } from '@vueuse/core';

export interface FormatYamlOptions {
  rawYaml: MaybeRef<string>;
  sortKeys?: MaybeRef<boolean>;
  indentSize?: MaybeRef<number>;
}

export interface YamlValidationRule {
  validator: (value: string) => boolean;
  message: string;
}
