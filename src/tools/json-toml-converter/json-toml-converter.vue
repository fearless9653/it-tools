<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import JSON5 from 'json5';
import { jsonTomlConverterService } from './json-toml-converter.service';
import { withDefaultOnError } from '@/utils/defaults';
import type { UseValidationRule } from '@/composable/validation';
import { isValidToml } from '@/utils/toml/toml.services';

const { t } = useI18n();

const isJsonToToml = ref(true);

function getTransformer() {
  return isJsonToToml.value
    ? (value: string) => jsonTomlConverterService.jsonToToml(value)
    : (value: string) => jsonTomlConverterService.tomlToJson(value);
}

const jsonRules: UseValidationRule<string>[] = [
  {
    validator: (v: string) => v === '' || withDefaultOnError(() => JSON5.parse(v), false),
    message: t('tools.json-toml-converter.message.invalidJson'),
  },
];

const tomlRules: UseValidationRule<string>[] = [
  {
    validator: isValidToml,
    message: t('tools.json-toml-converter.message.invalidToml'),
  },
];

function getValidationRules() {
  return isJsonToToml.value ? jsonRules : tomlRules;
}

function getInputLabel() {
  return isJsonToToml.value
    ? t('tools.json-toml-converter.label.yourJson')
    : t('tools.json-toml-converter.label.yourToml');
}

function getOutputLabel() {
  return isJsonToToml.value
    ? t('tools.json-toml-converter.label.tomlFromYourJson')
    : t('tools.json-toml-converter.label.jsonFromYourToml');
}

function getPlaceholder() {
  return isJsonToToml.value
    ? t('tools.json-toml-converter.placeholder.pasteJsonHere')
    : t('tools.json-toml-converter.placeholder.pasteTomlHere');
}

function getOutputLanguage() {
  return isJsonToToml.value ? 'toml' : 'json';
}
</script>

<template>
  <c-card>
    <div class="converter-header" mb-4 flex items-center justify-between>
      <h2 class="converter-title" text-lg font-semibold>
        {{
          isJsonToToml
            ? t('tools.json-toml-converter.conversionTitle.jsonToToml')
            : t('tools.json-toml-converter.conversionTitle.tomlToJson')
        }}
        {{ t('tools.json-toml-converter.conversionTitle.converter') }}
      </h2>
      <c-button
        :title="t('tools.json-toml-converter.tooltip.switchConversionDirection')"
        @click="isJsonToToml = !isJsonToToml"
      >
        {{
          isJsonToToml
            ? t('tools.json-toml-converter.button.tomlToJson')
            : t('tools.json-toml-converter.button.jsonToToml')
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
