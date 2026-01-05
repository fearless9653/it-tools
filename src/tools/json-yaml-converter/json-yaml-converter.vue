<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { jsonYamlConverterService } from './json-yaml-converter.service';
import type { UseValidationRule } from '@/composable/validation';

const { t } = useI18n();

const isJsonToYaml = ref(true);

function getTransformer() {
  return isJsonToYaml.value
    ? (value: string) => jsonYamlConverterService.jsonToYaml(value)
    : (value: string) => jsonYamlConverterService.yamlToJson(value);
}

const jsonRules: UseValidationRule<string>[] = [
  {
    validator: (value: string) => value === '' || jsonYamlConverterService.isValidJson(value),
    message: t('tools.json-yaml-converter.message.invalidJson'),
  },
];

const yamlRules: UseValidationRule<string>[] = [
  {
    validator: (value: string) => jsonYamlConverterService.isValidYaml(value),
    message: t('tools.json-yaml-converter.message.invalidYaml'),
  },
];

function getValidationRules() {
  return isJsonToYaml.value ? jsonRules : yamlRules;
}

function getInputLabel() {
  return isJsonToYaml.value
    ? t('tools.json-yaml-converter.label.yourJson')
    : t('tools.json-yaml-converter.label.yourYaml');
}

function getOutputLabel() {
  return isJsonToYaml.value
    ? t('tools.json-yaml-converter.label.yamlFromYourJson')
    : t('tools.json-yaml-converter.label.jsonFromYourYaml');
}

function getPlaceholder() {
  return isJsonToYaml.value
    ? t('tools.json-yaml-converter.placeholder.pasteJsonHere')
    : t('tools.json-yaml-converter.placeholder.pasteYamlHere');
}

function getOutputLanguage() {
  return isJsonToYaml.value ? 'yaml' : 'json';
}
</script>

<template>
  <c-card>
    <div class="converter-header" mb-4 flex items-center justify-between>
      <h2 class="converter-title" text-lg font-semibold>
        {{
          isJsonToYaml
            ? t('tools.json-yaml-converter.conversionTitle.jsonToYaml')
            : t('tools.json-yaml-converter.conversionTitle.yamlToJson')
        }}
        {{ t('tools.json-yaml-converter.conversionTitle.converter') }}
      </h2>
      <c-button
        :title="t('tools.json-yaml-converter.tooltip.switchConversionDirection')"
        @click="isJsonToYaml = !isJsonToYaml"
      >
        {{
          isJsonToYaml
            ? t('tools.json-yaml-converter.button.yamlToJson')
            : t('tools.json-yaml-converter.button.jsonToYaml')
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
