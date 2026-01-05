export interface JsonCsvConverterService {
  convertJsonToCsv(json: string): string;
  convertCsvToJson(csv: string): string;
}

export interface JsonToCsvService {
  getHeaders(array: Record<string, unknown>[]): string[];
  convertArrayToCsv(array: Record<string, unknown>[]): string;
}

export interface CsvToJsonService {
  convertCsvToJson(csv: string): string;
}

export type ConversionDirection = 'json-to-csv' | 'csv-to-json';
