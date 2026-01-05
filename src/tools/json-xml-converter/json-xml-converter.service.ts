import convert from 'xml-js';
import JSON5 from 'json5';
import { isValidXML } from '../xml-formatter/xml-formatter.service';
import { withDefaultOnError } from '@/utils/defaults';

/**
 * JSON-XML 转换服务，提供JSON和XML之间的相互转换功能
 */
export const jsonXmlConverterService = {
  /**
   * JSON 转 XML
   * @param jsonString - 输入的JSON字符串
   * @returns 转换后的XML字符串
   */
  jsonToXml: (jsonString: string): string => {
    return withDefaultOnError(() => {
      return convert.js2xml(JSON5.parse(jsonString), { compact: true });
    }, '');
  },

  /**
   * XML 转 JSON
   * @param xmlString - 输入的XML字符串
   * @returns 转换后的JSON字符串
   */
  xmlToJson: (xmlString: string): string => {
    return withDefaultOnError(() => {
      return JSON.stringify(convert.xml2js(xmlString, { compact: true }), null, 2);
    }, '');
  },

  /**
   * 验证JSON字符串是否有效
   * @param jsonString - 待验证的JSON字符串
   * @returns 验证结果
   */
  isValidJson: (jsonString: string): boolean => {
    try {
      JSON5.parse(jsonString);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * 验证XML字符串是否有效
   * @param xmlString - 待验证的XML字符串
   * @returns 验证结果
   */
  isValidXml: (xmlString: string): boolean => {
    return isValidXML(xmlString);
  },
};
