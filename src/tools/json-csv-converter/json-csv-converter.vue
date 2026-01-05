<script setup lang="ts">
import JSON5 from 'json5';
import { convertCsvToJson, convertJsonToCsv } from './json-csv-converter.service';
import { withDefaultOnError } from '@/utils/defaults';
import type { UseValidationRule } from '@/composable/validation';

const { t } = useI18n();

const isJsonToCsv = ref(true);

function jsonToCsvTransformer(value: string) {
  return withDefaultOnError(() => {
    if (value === '') {
      return '';
    }
    const parsedJson = JSON5.parse(value);
    // 检查解析后的数据是否为数组，如果不是则转换为数组
    const arrayData = Array.isArray(parsedJson) ? parsedJson : [parsedJson];
    // 使用 arrayData 进行转换
    return convertJsonToCsv(JSON.stringify(arrayData));
  }, '');
}

function csvToJsonTransformer(value: string) {
  return withDefaultOnError(() => {
    if (value === '') {
      return '';
    }
    return convertCsvToJson(value);
  }, '');
}

function getTransformer() {
  return isJsonToCsv.value ? jsonToCsvTransformer : csvToJsonTransformer;
}

const jsonValidationRules: UseValidationRule<string>[] = [
  {
    validator: (v: string) => v === '' || JSON5.parse(v),
    message: t('tools.json-csv-converter.message.invalidJson'),
  },
];

const csvValidationRules: UseValidationRule<string>[] = [
  {
    validator: (v: string) => v === '' || isValidCsv(v),
    message: t('tools.json-csv-converter.message.invalidCsv'),
  },
];

function getValidationRules() {
  return isJsonToCsv.value ? jsonValidationRules : csvValidationRules;
}

function getInputLabel() {
  return isJsonToCsv.value ? t('tools.json-csv-converter.label.yourJson') : t('tools.json-csv-converter.label.yourCsv');
}

function getOutputLabel() {
  return isJsonToCsv.value
    ? t('tools.json-csv-converter.label.csvFromYourJson')
    : t('tools.json-csv-converter.label.jsonFromYourCsv');
}

function getPlaceholder() {
  return isJsonToCsv.value
    ? t('tools.json-csv-converter.placeholder.pasteJsonHere')
    : t('tools.json-csv-converter.placeholder.pasteCsvHere');
}

function isValidCsv(csv: string) {
  // Basic validation for CSV format
  try {
    // A valid CSV should have at least one line
    const lines = csv.split('\n');
    if (lines.length === 0) {
      return false;
    }
    // If there are multiple lines, the first line should contain headers
    return true;
  } catch {
    return false;
  }
}
</script>

<template>
  <c-card>
    <div class="converter-header" mb-4 flex items-center justify-between>
      <h2 class="converter-title" text-lg font-semibold>
        {{
          isJsonToCsv
            ? t('tools.json-csv-converter.conversionTitle.jsonToCsv')
            : t('tools.json-csv-converter.conversionTitle.csvToJson')
        }}
        {{ t('tools.json-csv-converter.conversionTitle.converter') }}
      </h2>
      <c-button
        :title="t('tools.json-csv-converter.tooltip.switchConversionDirection')"
        @click="isJsonToCsv = !isJsonToCsv"
      >
        {{
          isJsonToCsv ? t('tools.json-csv-converter.button.csvToJson') : t('tools.json-csv-converter.button.jsonToCsv')
        }}
      </c-button>
    </div>

    <format-transformer
      :transformer="getTransformer()"
      :input-validation-rules="getValidationRules()"
      :input-label="getInputLabel()"
      :input-placeholder="getPlaceholder()"
      :output-label="getOutputLabel()"
    />
  </c-card>
</template>
