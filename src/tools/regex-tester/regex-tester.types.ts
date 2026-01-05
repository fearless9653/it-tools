export interface RegExpGroupIndices {
  [name: string]: [number, number];
}

export interface RegExpIndices extends Array<[number, number]> {
  groups: RegExpGroupIndices;
}

export interface RegExpExecArrayWithIndices extends RegExpExecArray {
  indices: RegExpIndices;
}

export interface GroupCapture {
  name: string;
  value: string;
  start: number;
  end: number;
}

export interface RegexMatchResult {
  index: number;
  value: string;
  captures: GroupCapture[];
  groups: GroupCapture[];
}

export interface RegexOptions {
  global: boolean;
  ignoreCase: boolean;
  multiline: boolean;
  dotAll: boolean;
  unicode: boolean;
  unicodeSets: boolean;
}

export interface RegexTesterService {
  matchRegex: (regex: string, text: string, flags: string) => RegexMatchResult[];
  generateSample: (regex: string) => string;
}
