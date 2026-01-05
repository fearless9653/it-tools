export interface Base64ConversionOptions {
  makeUrlSafe?: boolean;
}

export interface Base64ValidationRule {
  message: string;
  validator: (value: string) => boolean;
}
