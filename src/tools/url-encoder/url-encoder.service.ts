import { withDefaultOnError } from '@/utils/defaults';
import { isNotThrowing } from '@/utils/boolean';

export function encodeTransformer(value: string): string {
  return withDefaultOnError(() => encodeURIComponent(value), '');
}

export function decodeTransformer(value: string): string {
  return withDefaultOnError(() => decodeURIComponent(value), '');
}

export function getTransformer(isEncodeToDecode: boolean): (value: string) => string {
  return isEncodeToDecode ? encodeTransformer : decodeTransformer;
}

export function getValidationRules(
  isEncodeToDecode: boolean,
  t: (key: string) => string,
): Array<{ validator: (value: string) => boolean; message: string }> {
  const encodeRules = [
    {
      validator: (value: string) => isNotThrowing(() => encodeURIComponent(value)),
      message: t('tools.url-encoder.message.impossibleToParse'),
    },
  ];

  const decodeRules = [
    {
      validator: (value: string) => isNotThrowing(() => decodeURIComponent(value)),
      message: t('tools.url-encoder.message.impossibleToParse'),
    },
  ];

  return isEncodeToDecode ? encodeRules : decodeRules;
}

export function getLabels(
  isEncodeToDecode: boolean,
  t: (key: string) => string,
): {
  input: string;
  output: string;
  placeholder: string;
} {
  const inputLabel = isEncodeToDecode
    ? t('tools.url-encoder.label.yourString')
    : t('tools.url-encoder.label.yourEncodedString');
  const outputLabel = isEncodeToDecode
    ? t('tools.url-encoder.label.yourStringEncoded')
    : t('tools.url-encoder.label.yourStringDecoded');
  const placeholder = isEncodeToDecode
    ? t('tools.url-encoder.placeholder.stringToEncode')
    : t('tools.url-encoder.placeholder.stringToDecode');

  return {
    input: inputLabel,
    output: outputLabel,
    placeholder,
  };
}

export function getOutputLanguage(): string {
  return 'text';
}
