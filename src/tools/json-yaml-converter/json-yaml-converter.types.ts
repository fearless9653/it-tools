export interface JsonYamlConverterService {
  jsonToYaml: (jsonString: string) => string;
  yamlToJson: (yamlString: string) => string;
  isValidJson: (jsonString: string) => boolean;
  isValidYaml: (yamlString: string) => boolean;
}

export type ConversionDirection = 'jsonToYaml' | 'yamlToJson';
