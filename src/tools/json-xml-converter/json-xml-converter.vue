<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { jsonXmlConverterService } from './json-xml-converter.service';
import type { UseValidationRule } from '@/composable/validation';

const { t } = useI18n();

const isJsonToXml = ref(true);

function getTransformer() {
  return isJsonToXml.value
    ? (value: string) => jsonXmlConverterService.jsonToXml(value)
    : (value: string) => jsonXmlConverterService.xmlToJson(value);
}

const jsonRules: UseValidationRule<string>[] = [
  {
    validator: (v: string) => v === '' || jsonXmlConverterService.isValidJson(v),
    message: t('tools.json-xml-converter.message.invalidJson'),
  },
];

const xmlRules: UseValidationRule<string>[] = [
  {
    validator: (v: string) => jsonXmlConverterService.isValidXml(v),
    message: t('tools.json-xml-converter.message.invalidXml'),
  },
];

function getValidationRules() {
  return isJsonToXml.value ? jsonRules : xmlRules;
}

function getInputLabel() {
  return isJsonToXml.value
    ? t('tools.json-xml-converter.label.yourJsonContent')
    : t('tools.json-xml-converter.label.yourXmlContent');
}

function getOutputLabel() {
  return isJsonToXml.value
    ? t('tools.json-xml-converter.label.convertedXml')
    : t('tools.json-xml-converter.label.convertedJson');
}

function getPlaceholder() {
  return isJsonToXml.value
    ? t('tools.json-xml-converter.placeholder.pasteJsonContent')
    : t('tools.json-xml-converter.placeholder.pasteXmlContent');
}

function getOutputLanguage() {
  return isJsonToXml.value ? 'xml' : 'json';
}
</script>

<template>
  <c-card>
    <div class="converter-header" mb-4 flex items-center justify-between>
      <h2 class="converter-title" text-lg font-semibold>
        {{
          isJsonToXml
            ? t('tools.json-xml-converter.conversionTitle.jsonToXml')
            : t('tools.json-xml-converter.conversionTitle.xmlToJson')
        }}
        {{ t('tools.json-xml-converter.conversionTitle.converter') }}
      </h2>
      <c-button
        :title="t('tools.json-xml-converter.tooltip.switchConversionDirection')"
        @click="isJsonToXml = !isJsonToXml"
      >
        {{
          isJsonToXml ? t('tools.json-xml-converter.button.xmlToJson') : t('tools.json-xml-converter.button.jsonToXml')
        }}
      </c-button>
    </div>

    <format-transformer
      :transformer="getTransformer()"
      :input-validation-rules="getValidationRules()"
      :input-label="getInputLabel()"
      :input-placeholder="getPlaceholder()"
      :output-language="getOutputLanguage()"
      :output-label="getOutputLabel()"
    />
  </c-card>
</template>
