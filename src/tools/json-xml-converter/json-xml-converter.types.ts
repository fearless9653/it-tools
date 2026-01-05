export interface JsonXmlConverterService {
  jsonToXml: (jsonString: string) => string;
  xmlToJson: (xmlString: string) => string;
}

export type ConversionDirection = 'jsonToXml' | 'xmlToJson';
