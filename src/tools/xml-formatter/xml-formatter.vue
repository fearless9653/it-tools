<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { createXmlValidationRules, getXmlTransformer } from './xml-formatter.service';

const { t } = useI18n();

const defaultValue = '<hello><world>foo</world><world>bar</world></hello>';
const indentSize = useStorage('xml-formatter:indent-size', 2);
const collapseContent = useStorage('xml-formatter:collapse-content', true);

const transformer = computed(() => getXmlTransformer(indentSize.value, collapseContent.value));

const rules = computed(() => createXmlValidationRules(t('tools.xml-formatter.message.invalidXml')));
</script>

<template>
  <div important:flex-full important:flex-shrink-0 important:flex-grow-0>
    <div flex justify-center>
      <n-form-item :label="t('tools.xml-formatter.label.collapseContent')" label-placement="left">
        <n-switch v-model:value="collapseContent" />
      </n-form-item>
      <n-form-item
        :label="t('tools.xml-formatter.label.indentSize')"
        label-placement="left"
        label-width="100"
        :show-feedback="false"
      >
        <n-input-number v-model:value="indentSize" min="0" max="10" w-100px />
      </n-form-item>
    </div>
  </div>

  <format-transformer
    :input-label="t('tools.xml-formatter.label.yourXml')"
    :input-placeholder="t('tools.xml-formatter.placeholder.pasteXmlHere')"
    :output-label="t('tools.xml-formatter.label.formattedXml')"
    output-language="xml"
    :input-validation-rules="rules"
    :transformer="transformer"
    :input-default="defaultValue"
  />
</template>
