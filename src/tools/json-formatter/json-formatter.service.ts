import JSON5 from 'json5';
import type { JsonProcessType } from './json-formatter.types';

/**
 * JSON格式化服务，提供各种JSON处理功能
 */
export const jsonFormatterService = {
  /**
   * JSON压缩：移除换行符和多余空格
   */
  compressJSON: (text: string): string => {
    return text.split('\n').join(' ').split('\r').join(' ').replace(/\s+/g, ' ').trim();
  },

  /**
   * JSON转义：在双引号前添加转义符
   */
  escapeJSON: (text: string): string => {
    return text.replace(/"/g, '\\"');
  },

  /**
   * JSON去除转义
   */
  unescapeJSON: (text: string): string => {
    return text.replace(/\\"/g, '"');
  },

  /**
   * JSON美化：格式化JSON，使其更易读
   */
  beautifyJSON: (text: string): string => {
    try {
      // 尝试解析输入的JSON字符串
      const parsed = JSON5.parse(text);
      // 使用2个空格缩进美化输出
      return JSON.stringify(parsed, null, 2);
    } catch (error: any) {
      // 如果解析失败，返回原始文本
      console.error('JSON格式有误', error);
      return text;
    }
  },

  /**
   * Unicode转中文
   */
  uniToChinese: (text: string): string => {
    try {
      return unescape(text.replace(/\\u/g, '%u'));
    } catch (error: any) {
      console.error('Unicode格式有误', error);
      return text;
    }
  },

  /**
   * 中文转Unicode
   */
  chineseToUni: (text: string): string => {
    try {
      return escape(text).replace(/%u/g, '\\u');
    } catch (error: any) {
      console.error('编码格式有误', error);
      return text;
    }
  },

  /**
   * 中文符号转英文符号
   */
  cnPunctToEn: (text: string): string => {
    // 定义中文符号到英文符号的映射
    const punctuationMap: Record<string, string> = {
      '，': ',',
      '。': '.',
      '；': ';',
      '：': ':',
      '？': '?',
      '！': '!',
      '“': '"',
      '”': '"',
      '‘': "'",
      '’': "'",
      '（': '(',
      '）': ')',
      '【': '[',
      '】': ']',
      '《': '<',
      '》': '>',
      '、': '|',
      '　': ' ', // 全角空格转半角空格
    };

    let result = text;
    // 替换所有中文符号
    for (const [ch, en] of Object.entries(punctuationMap)) {
      result = result.replace(new RegExp(ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), en);
    }

    return result;
  },

  /**
   * 统一的JSON处理函数
   */
  processJson: (type: JsonProcessType, text: string): string => {
    const processors: Record<JsonProcessType, (text: string) => string> = {
      compress: jsonFormatterService.compressJSON,
      escape: jsonFormatterService.escapeJSON,
      unescape: jsonFormatterService.unescapeJSON,
      beautify: jsonFormatterService.beautifyJSON,
    };

    const processor = processors[type];
    if (processor) {
      try {
        return processor(text);
      } catch (error) {
        console.error(`Error processing JSON: ${error}`);
        return text;
      }
    }
    return text;
  },
};
