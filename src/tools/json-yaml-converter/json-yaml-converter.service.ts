import { parse as parseYaml, stringify } from 'yaml';
import JSON5 from 'json5';
import { withDefaultOnError } from '@/utils/defaults';

/**
 * JSON-YAML 转换服务，提供JSON和YAML之间的相互转换功能
 */
export const jsonYamlConverterService = {
  /**
   * JSON 转 YAML
   * @param jsonString - 输入的JSON字符串
   * @returns 转换后的YAML字符串
   */
  jsonToYaml: (jsonString: string): string => {
    return withDefaultOnError(() => stringify(JSON5.parse(jsonString)), '');
  },

  /**
   * YAML 转 JSON
   * @param yamlString - 输入的YAML字符串
   * @returns 转换后的JSON字符串
   */
  yamlToJson: (yamlString: string): string => {
    return withDefaultOnError(() => {
      const obj = parseYaml(yamlString, { merge: true });
      return obj ? JSON.stringify(obj, null, 3) : '';
    }, '');
  },

  /**
   * 验证JSON字符串是否有效
   * @param jsonString - 待验证的JSON字符串
   * @returns 验证结果
   */
  isValidJson: (jsonString: string): boolean => {
    try {
      stringify(JSON5.parse(jsonString));
      return true;
    } catch {
      return false;
    }
  },

  /**
   * 验证YAML字符串是否有效
   * @param yamlString - 待验证的YAML字符串
   * @returns 验证结果
   */
  isValidYaml: (yamlString: string): boolean => {
    try {
      parseYaml(yamlString);
      return true;
    } catch {
      return false;
    }
  },
};
