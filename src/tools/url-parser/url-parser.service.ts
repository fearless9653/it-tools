import type { URLParseProperties } from './url-parser.types';

export interface URLValidationRule {
  message: string;
  validator: (value: string) => boolean;
}

export function parseUrl(url: string) {
  try {
    const urlObj = new URL(url);
    return urlObj;
  } catch {
    return undefined;
  }
}

export function safeParseUrl(url: string) {
  try {
    const urlObj = new URL(url);
    return urlObj;
  } catch {
    return undefined;
  }
}

export function getUrlProperties(): URLParseProperties[] {
  return [
    { title: 'tools.url-parser.property.protocol', key: 'protocol' },
    { title: 'tools.url-parser.property.username', key: 'username' },
    { title: 'tools.url-parser.property.password', key: 'password' },
    { title: 'tools.url-parser.property.hostname', key: 'hostname' },
    { title: 'tools.url-parser.property.port', key: 'port' },
    { title: 'tools.url-parser.property.path', key: 'pathname' },
    { title: 'tools.url-parser.property.params', key: 'search' },
  ];
}

export function getUrlSearchParams(url: URL | undefined) {
  if (!url) {
    return [];
  }
  return Array.from(url.searchParams.entries());
}

export function createUrlValidationRules(invalidUrlMessage: string) {
  return [
    {
      message: invalidUrlMessage,
      validator: (value: string) => {
        if (!value) {
          return true;
        }
        try {
          const urlObj = new URL(value);
          return urlObj instanceof URL;
        } catch {
          return false;
        }
      },
    },
  ];
}
