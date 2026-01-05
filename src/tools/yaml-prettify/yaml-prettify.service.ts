import { get } from '@vueuse/core';
import yaml from 'yaml';
import type { FormatYamlOptions } from './yaml-prettify.types';

export function formatYaml({ rawYaml, sortKeys = false, indentSize = 2 }: FormatYamlOptions): string {
  const parsedYaml = yaml.parse(get(rawYaml));

  const formattedYAML = yaml.stringify(parsedYaml, {
    sortMapEntries: get(sortKeys),
    indent: get(indentSize),
  });

  return formattedYAML;
}

export function isValidYaml(yamlString: string): boolean {
  if (yamlString === '') {
    return true;
  }

  try {
    yaml.parse(yamlString);
    return true;
  } catch {
    return false;
  }
}

export function createYamlValidationRules(invalidYamlMessage: string) {
  return [
    {
      validator: (v: string) => v === '' || isValidYaml(v),
      message: invalidYamlMessage,
    },
  ];
}

export function getYamlFormatter(sortKeys: boolean, indentSize: number) {
  return (rawYaml: string) => {
    return formatYaml({
      rawYaml,
      sortKeys,
      indentSize,
    });
  };
}
