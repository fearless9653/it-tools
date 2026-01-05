<script setup lang="ts">
import { ref } from 'vue';
import { getTransformer, getValidationRules } from './yaml-toml-converter.service';

const { t } = useI18n();

const isYamlToToml = ref(true);

const transformer = computed(() => getTransformer(isYamlToToml.value));

const validationRules = computed(() =>
  getValidationRules(
    isYamlToToml.value,
    t('tools.yaml-toml-converter.message.invalidToml'),
    t('tools.yaml-toml-converter.message.invalidYaml'),
  ),
);

function getInputLabel() {
  return isYamlToToml.value
    ? t('tools.yaml-toml-converter.label.yourYaml')
    : t('tools.yaml-toml-converter.label.yourToml');
}

function getOutputLabel() {
  return isYamlToToml.value
    ? t('tools.yaml-toml-converter.label.tomlFromYourYaml')
    : t('tools.yaml-toml-converter.label.yamlFromYourToml');
}

function getPlaceholder() {
  return isYamlToToml.value
    ? t('tools.yaml-toml-converter.placeholder.pasteYamlHere')
    : t('tools.yaml-toml-converter.placeholder.pasteTomlHere');
}

function getOutputLanguage() {
  return isYamlToToml.value ? 'toml' : 'yaml';
}
</script>

<template>
  <c-card>
    <div class="converter-header" mb-4 flex items-center justify-between>
      <h2 class="converter-title" text-lg font-semibold>
        {{
          isYamlToToml
            ? t('tools.yaml-toml-converter.conversionTitle.yamlToToml')
            : t('tools.yaml-toml-converter.conversionTitle.tomlToYaml')
        }}
        {{ t('tools.yaml-toml-converter.conversionTitle.converter') }}
      </h2>
      <c-button
        :title="t('tools.yaml-toml-converter.tooltip.switchConversionDirection')"
        @click="isYamlToToml = !isYamlToToml"
      >
        {{
          isYamlToToml
            ? t('tools.yaml-toml-converter.button.tomlToYaml')
            : t('tools.yaml-toml-converter.button.yamlToToml')
        }}
      </c-button>
    </div>

    <format-transformer
      :transformer="transformer"
      :input-validation-rules="validationRules"
      :input-label="getInputLabel()"
      :input-placeholder="getPlaceholder()"
      :output-language="getOutputLanguage()"
      :output-label="getOutputLabel()"
    />
  </c-card>
</template>
