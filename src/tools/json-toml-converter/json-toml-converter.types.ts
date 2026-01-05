export interface JsonTomlConverterService {
  jsonToToml: (jsonString: string) => string;
  tomlToJson: (tomlString: string) => string;
}

export type ConversionDirection = 'jsonToToml' | 'tomlToJson';
