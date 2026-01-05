<script setup lang="ts">
import { getLabels, getOutputLanguage, getTransformer, getValidationRules } from './url-encoder.service';

const { t } = useI18n();

const isEncodeToDecode = ref(true);

function getInputLabel() {
  const labels = getLabels(isEncodeToDecode.value, t);
  return labels.input;
}

function getOutputLabel() {
  const labels = getLabels(isEncodeToDecode.value, t);
  return labels.output;
}

function getPlaceholder() {
  const labels = getLabels(isEncodeToDecode.value, t);
  return labels.placeholder;
}

function getOutputLanguageValue() {
  return getOutputLanguage();
}
</script>

<template>
  <c-card>
    <div class="converter-header" mb-4 flex items-center justify-between>
      <h2 class="converter-title" text-lg font-semibold>
        {{
          isEncodeToDecode
            ? t('tools.url-encoder.conversionTitle.encode')
            : t('tools.url-encoder.conversionTitle.decode')
        }}
      </h2>
      <c-button
        :title="t('tools.url-encoder.tooltip.switchConversionDirection')"
        @click="isEncodeToDecode = !isEncodeToDecode"
      >
        {{ isEncodeToDecode ? t('tools.url-encoder.button.decode') : t('tools.url-encoder.button.encode') }}
      </c-button>
    </div>

    <format-transformer
      :transformer="getTransformer(isEncodeToDecode)"
      :input-validation-rules="getValidationRules(isEncodeToDecode, t)"
      :input-label="getInputLabel()"
      :input-placeholder="getPlaceholder()"
      :output-language="getOutputLanguageValue()"
      :output-label="getOutputLabel()"
    />
  </c-card>
</template>
