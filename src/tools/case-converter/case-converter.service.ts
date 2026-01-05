import {
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  headerCase,
  noCase,
  paramCase,
  pascalCase,
  pathCase,
  sentenceCase,
  snakeCase,
} from 'change-case';
import type { CaseFormat, CaseFormatItem } from './case-converter.types';

const baseConfig = {
  stripRegexp: /[^A-Za-zÀ-ÖØ-öø-ÿ]+/gi,
};

/**
 * Converts input text to all available case formats
 */
export function convertToAllCases(input: string): CaseFormatItem[] {
  return [
    {
      labelKey: 'lowercase',
      value: input.toLocaleLowerCase(),
    },
    {
      labelKey: 'uppercase',
      value: input.toLocaleUpperCase(),
    },
    {
      labelKey: 'camelcase',
      value: camelCase(input, baseConfig),
    },
    {
      labelKey: 'capitalcase',
      value: capitalCase(input, baseConfig),
    },
    {
      labelKey: 'constantcase',
      value: constantCase(input, baseConfig),
    },
    {
      labelKey: 'dotcase',
      value: dotCase(input, baseConfig),
    },
    {
      labelKey: 'headercase',
      value: headerCase(input, baseConfig),
    },
    {
      labelKey: 'nocase',
      value: noCase(input, baseConfig),
    },
    {
      labelKey: 'paramcase',
      value: paramCase(input, baseConfig),
    },
    {
      labelKey: 'pascalcase',
      value: pascalCase(input, baseConfig),
    },
    {
      labelKey: 'pathcase',
      value: pathCase(input, baseConfig),
    },
    {
      labelKey: 'sentencecase',
      value: sentenceCase(input, baseConfig),
    },
    {
      labelKey: 'snakecase',
      value: snakeCase(input, baseConfig),
    },
    {
      labelKey: 'mockingcase',
      value: input
        .split('')
        .map((char, index) => (index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()))
        .join(''),
    },
  ];
}

/**
 * Get a specific case format for the input text
 */
export function getCaseFormat(input: string, format: CaseFormat): string {
  switch (format) {
    case 'lowercase':
      return input.toLocaleLowerCase();
    case 'uppercase':
      return input.toLocaleUpperCase();
    case 'camelcase':
      return camelCase(input, baseConfig);
    case 'capitalcase':
      return capitalCase(input, baseConfig);
    case 'constantcase':
      return constantCase(input, baseConfig);
    case 'dotcase':
      return dotCase(input, baseConfig);
    case 'headercase':
      return headerCase(input, baseConfig);
    case 'nocase':
      return noCase(input, baseConfig);
    case 'paramcase':
      return paramCase(input, baseConfig);
    case 'pascalcase':
      return pascalCase(input, baseConfig);
    case 'pathcase':
      return pathCase(input, baseConfig);
    case 'sentencecase':
      return sentenceCase(input, baseConfig);
    case 'snakecase':
      return snakeCase(input, baseConfig);
    case 'mockingcase':
      return input
        .split('')
        .map((char, index) => (index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()))
        .join('');
    default:
      return input;
  }
}
