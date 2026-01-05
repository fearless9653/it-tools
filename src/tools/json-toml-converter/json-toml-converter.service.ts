import { parse as parseToml, stringify as stringifyToml } from 'iarna-toml-esm';
import JSON5 from 'json5';
import { withDefaultOnError } from '@/utils/defaults';

/**
 * JSON-TOML 转换服务，提供JSON和TOML之间的相互转换功能
 */
export const jsonTomlConverterService = {
  /**
   * JSON 转 TOML
   * @param jsonString - 输入的JSON字符串
   * @returns 转换后的TOML字符串
   */
  jsonToToml: (jsonString: string): string => {
    return jsonString.trim() === ''
      ? ''
      : withDefaultOnError(() => {
          const parsedJson = JSON5.parse(jsonString);
          const convertedToml = [stringifyToml(parsedJson)].flat().join('\n').trim();
          return convertedToml;
        }, '');
  },

  /**
   * TOML 转 JSON
   * @param tomlString - 输入的TOML字符串
   * @returns 转换后的JSON字符串
   */
  tomlToJson: (tomlString: string): string => {
    return tomlString === ''
      ? ''
      : withDefaultOnError(() => {
          const parsedToml = parseToml(tomlString);
          return JSON.stringify(parsedToml, null, 3);
        }, '');
  },
};
