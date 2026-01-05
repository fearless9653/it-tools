import { tool as base64FileConverter } from './base64-file-converter';
import { tool as base64StringConverter } from './base64-string-converter';

import { tool as jsonXmlConverter } from './json-xml-converter';
import { tool as regexTester } from './regex-tester';
import { tool as regexMemo } from './regex-memo';

import { tool as textDiff } from './text-diff';
import { tool as emojiPicker } from './emoji-picker';
import { tool as jsonTomlConverter } from './json-toml-converter';
import { tool as yamlTomlConverter } from './yaml-toml-converter';
import { tool as jsonToCsvConverter } from './json-csv-converter';

import { tool as jsonDiff } from './json-diff';
import { tool as httpStatusCodes } from './http-status-codes';
import { tool as jsonYamlConverter } from './json-yaml-converter';

import { tool as dockerToCompose } from './docker-to-compose';
import { tool as rsaKeyPairGenerator } from './rsa-key-pair-generator';
import { tool as jsonFormatter } from './json-formatter';

import { tool as caseConverter } from './case-converter';
import { tool as chmodCalculator } from './chmod-calculator';

import { tool as colorConverter } from './color-converter';
import { tool as crontabGenerator } from './crontab-generator';
import { tool as dateTimeConverter } from './date-converter';
import { tool as cypher } from './encryption';

import { tool as gitMemo } from './git-memo';
import { tool as hashText } from './hash-text';
import { tool as hmacGenerator } from './hmac-generator';
import { tool as baseConverter } from './base-converter';

import { tool as qrCodeGenerator } from './qrcode-generator';

import { tool as sqlPrettify } from './sql-prettify';

import type { ToolCategory } from './tools.types';
import { tool as urlEncoder } from './url-encoder';
import { tool as urlParser } from './url-parser';

import { tool as xmlFormatter } from './xml-formatter';
import { tool as yamlPrettify } from './yaml-prettify';

export const toolsByCategory: ToolCategory[] = [
  {
    name: 'Development',
    components: [
      jsonFormatter,
      jsonDiff,
      textDiff,
      sqlPrettify,
      yamlPrettify,
      xmlFormatter,
      regexTester,
      chmodCalculator,
      crontabGenerator,
      dockerToCompose,
    ],
  },
  {
    name: 'Converter',
    components: [
      jsonYamlConverter,
      jsonTomlConverter,
      jsonXmlConverter,
      jsonToCsvConverter,
      yamlTomlConverter,
      dateTimeConverter,
      baseConverter,
      caseConverter,
    ],
  },
  {
    name: 'Crypto',
    components: [rsaKeyPairGenerator, base64StringConverter, base64FileConverter, hashText, cypher, hmacGenerator],
  },
  {
    name: 'Web',
    components: [urlEncoder, urlParser],
  },
  {
    name: 'Memo',
    components: [httpStatusCodes, gitMemo, regexMemo, emojiPicker],
  },
  {
    name: 'Others',
    components: [qrCodeGenerator, colorConverter],
  },
];

export const tools = toolsByCategory.flatMap(({ components }) => components);
export const toolsWithCategory = toolsByCategory.flatMap(({ components, name }) =>
  components.map(tool => ({ category: name, ...tool })),
);
