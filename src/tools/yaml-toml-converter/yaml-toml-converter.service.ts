import { parse as parseToml, stringify as stringifyToml } from 'iarna-toml-esm';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';
import type { ConversionTransformer, YamlTomlValidationRule } from './yaml-toml-converter.types';
import { withDefaultOnError } from '@/utils/defaults';
import { isValidToml } from '@/utils/toml/toml.services';
import { isNotThrowing } from '@/utils/boolean';

export function tomlToYamlTransformer(value: string): string {
  return value.trim() === '' ? '' : withDefaultOnError(() => stringifyYaml(parseToml(value)), '');
}

export function yamlToTomlTransformer(value: string): string {
  return value.trim() === ''
    ? ''
    : withDefaultOnError(() => {
        const parsedYaml = parseYaml(value);
        const convertedToml = [stringifyToml(parsedYaml)].flat().join('\n').trim();
        return convertedToml;
      }, '');
}

export function isValidYaml(yaml: string): boolean {
  return isNotThrowing(() => parseYaml(yaml));
}

export function getTransformer(isYamlToToml: boolean): ConversionTransformer {
  return isYamlToToml ? yamlToTomlTransformer : tomlToYamlTransformer;
}

export function createTomlValidationRules(invalidTomlMessage: string): YamlTomlValidationRule[] {
  return [
    {
      validator: isValidToml,
      message: invalidTomlMessage,
    },
  ];
}

export function createYamlValidationRules(invalidYamlMessage: string): YamlTomlValidationRule[] {
  return [
    {
      validator: isValidYaml,
      message: invalidYamlMessage,
    },
  ];
}

export function getValidationRules(
  isYamlToToml: boolean,
  tomlMessage: string,
  yamlMessage: string,
): YamlTomlValidationRule[] {
  return isYamlToToml ? createYamlValidationRules(yamlMessage) : createTomlValidationRules(tomlMessage);
}
