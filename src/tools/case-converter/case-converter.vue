<script setup lang="ts">
import InputCopyable from '../../components/InputCopyable.vue';
import { convertToAllCases } from './case-converter.service';

const { t } = useI18n();

const input = ref('lorem ipsum dolor sit amet');

const formats = computed(() => {
  const results = convertToAllCases(input.value);
  return results.map(item => ({
    label: t(`tools.case-converter.format.${item.labelKey}`),
    value: item.value,
  }));
});

const inputLabelAlignmentConfig = {
  labelPosition: 'left' as const,
  labelWidth: '120px',
  labelAlign: 'right' as const,
};
</script>

<template>
  <c-card>
    <c-input-text
      v-model:value="input"
      :label="t('tools.case-converter.label.yourString')"
      :placeholder="t('tools.case-converter.placeholder.yourString')"
      raw-text
      v-bind="inputLabelAlignmentConfig"
    />

    <div my-16px divider />

    <InputCopyable
      v-for="format in formats"
      :key="format.label"
      :value="format.value"
      :label="format.label"
      v-bind="inputLabelAlignmentConfig"
      mb-1
    />
  </c-card>
</template>
