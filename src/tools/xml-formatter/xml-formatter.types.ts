import type { XMLFormatterOptions } from 'xml-formatter';

export interface XmlFormatOptions extends XMLFormatterOptions {
  indentation?: string;
  collapseContent?: boolean;
  lineSeparator?: string;
}

export interface XmlValidationRule {
  validator: (value: string) => boolean;
  message: string;
}
