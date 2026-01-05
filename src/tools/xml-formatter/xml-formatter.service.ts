import xmlFormat from 'xml-formatter';
import type { XmlFormatOptions } from './xml-formatter.types';
import { withDefaultOnError } from '@/utils/defaults';

function cleanRawXml(rawXml: string): string {
  return rawXml.trim();
}

export function formatXml(rawXml: string, options?: XmlFormatOptions): string {
  return withDefaultOnError(() => xmlFormat(cleanRawXml(rawXml), options) ?? '', '');
}

export function isValidXML(rawXml: string): boolean {
  const cleanedRawXml = cleanRawXml(rawXml);

  if (cleanedRawXml === '') {
    return true;
  }

  try {
    xmlFormat(cleanedRawXml);
    return true;
  } catch (e) {
    return false;
  }
}

export function createXmlValidationRules(invalidXmlMessage: string) {
  return [
    {
      validator: isValidXML,
      message: invalidXmlMessage,
    },
  ];
}

export function getXmlTransformer(indentSize: number, collapseContent: boolean) {
  return (value: string) => {
    return formatXml(value, {
      indentation: ' '.repeat(indentSize),
      collapseContent,
      lineSeparator: '\n',
    });
  };
}
