import { type Ref, computed } from 'vue';
import type { Base64ConversionOptions } from './base64-string-converter.types';
import { base64ToText, isValidBase64, textToBase64 } from '@/utils/base64';
import { withDefaultOnError } from '@/utils/defaults';

export function textToBase64Transformer(value: string, options: Base64ConversionOptions = {}) {
  return textToBase64(value, options);
}

export function base64ToTextTransformer(value: string, options: Base64ConversionOptions = {}) {
  return withDefaultOnError(() => base64ToText(value.trim(), options), '');
}

export function createBase64ValidationRules(decodeUrlSafe: Ref<boolean>, invalidBase64Message: string) {
  return [
    {
      message: invalidBase64Message,
      validator: (value: string) => {
        return isValidBase64(value.trim(), { makeUrlSafe: decodeUrlSafe.value });
      },
    },
  ];
}

export function getBase64Output(input: Ref<string>, encodeUrlSafe: Ref<boolean>) {
  return computed(() => textToBase64(input.value, { makeUrlSafe: encodeUrlSafe.value }));
}

export function getTextOutput(input: Ref<string>, decodeUrlSafe: Ref<boolean>) {
  return computed(() => base64ToTextTransformer(input.value, { makeUrlSafe: decodeUrlSafe.value }));
}
