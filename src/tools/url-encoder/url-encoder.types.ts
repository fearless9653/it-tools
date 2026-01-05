export interface URLEncoderConfig {
  isEncodeToDecode: boolean;
}

export interface URLEncoderService {
  encodeTransformer: (value: string) => string;
  decodeTransformer: (value: string) => string;
  getTransformer: (isEncodeToDecode: boolean) => (value: string) => string;
  getValidationRules: (isEncodeToDecode: boolean) => Array<{ validator: (value: string) => boolean; message: string }>;
  getLabels: (isEncodeToDecode: boolean) => {
    input: string;
    output: string;
    placeholder: string;
  };
  getOutputLanguage: () => string;
}

export interface URLConversionResult {
  input: string;
  output: string;
}
