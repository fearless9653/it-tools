export type JsonProcessType = 'compress' | 'escape' | 'unescape' | 'beautify';

export interface JsonFormatterService {
  compressJSON: (text: string) => string;
  escapeJSON: (text: string) => string;
  unescapeJSON: (text: string) => string;
  beautifyJSON: (text: string) => string;
  uniToChinese: (text: string) => string;
  chineseToUni: (text: string) => string;
  cnPunctToEn: (text: string) => string;
  processJson: (type: JsonProcessType, text: string) => string;
}
