import JSON5 from 'json5';
import type { ConversionDirection } from './json-csv-converter.types';

export function convertJsonToCsv(json: string): string {
  if (json === '') {
    return '';
  }

  try {
    const parsedJson = Array.isArray(JSON5.parse(json)) ? JSON5.parse(json) : [JSON5.parse(json)];
    return convertArrayToCsv({ array: parsedJson });
  } catch (error) {
    throw new Error('Invalid JSON provided');
  }
}

export function convertCsvToJson(csv: string): string {
  return convertCsvToJsonUsingService(csv);
}

// CSV to JSON conversion functions
function convertCsvToJsonUsingService(csv: string): string {
  if (!csv.trim()) {
    return '';
  }

  const lines = csv.split('\n');
  if (lines.length === 0) {
    return '[]';
  }

  const headers = parseLine(lines[0]);
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) {
      continue; // Skip empty lines
    }
    const currentLine = parseLine(lines[i]);
    const obj: Record<string, unknown> = {};

    headers.forEach((header, index) => {
      obj[header] = currentLine[index] !== undefined ? deserializeValue(currentLine[index]) : '';
    });

    result.push(obj);
  }

  return JSON.stringify(result, null, 2);
}

function parseLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Double quotes inside quotes represent a single quote
        current += '"';
        i++; // Skip the next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

function deserializeValue(value: string): unknown {
  if (value === 'null') {
    return null;
  }

  if (value === 'true' || value === 'false') {
    return value === 'true';
  }

  // Check if it's a number
  if (/^-?\d+$/.test(value)) {
    return Number.parseInt(value, 10);
  }

  if (/^-?\d*\.\d+$/.test(value)) {
    return Number.parseFloat(value);
  }

  // Handle escaped characters
  return value.replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\"/g, '"');
}

// JSON to CSV conversion functions
function getHeaders({ array }: { array: Record<string, unknown>[] }): string[] {
  const headers = new Set<string>();

  array.forEach(item => Object.keys(item).forEach(key => headers.add(key)));

  return Array.from(headers);
}

function serializeValue(value: unknown): string {
  if (value === null) {
    return 'null';
  }

  if (value === undefined) {
    return '';
  }

  const valueAsString = String(value).replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/"/g, '\\"');

  if (valueAsString.includes(',')) {
    return `"${valueAsString}"`;
  }

  return valueAsString;
}

function convertArrayToCsv({ array }: { array: Record<string, unknown>[] }): string {
  const headers = getHeaders({ array });

  const rows = array.map(item => headers.map(header => serializeValue(item[header])));

  return [headers.join(','), ...rows].join('\n');
}

export function executeConversion(value: string, direction: ConversionDirection): string {
  switch (direction) {
    case 'json-to-csv':
      return convertJsonToCsv(value);
    case 'csv-to-json':
      return convertCsvToJsonUsingService(value);
    default:
      throw new Error(`Unsupported conversion direction: ${direction}`);
  }
}
