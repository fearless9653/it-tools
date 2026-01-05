<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { createYamlValidationRules, getYamlFormatter } from './yaml-prettify.service';
import { withDefaultOnError } from '@/utils/defaults';
import { useValidation } from '@/composable/validation';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const { t } = useI18n();

const inputElement = ref<HTMLElement>();

const rawYaml = useStorage('yaml-prettify:raw-yaml', '');
const indentSize = useStorage('yaml-prettify:indent-size', 2);
const sortKeys = useStorage('yaml-prettify:sort-keys', false);

const cleanYaml = computed(() =>
  withDefaultOnError(() => getYamlFormatter(sortKeys.value, indentSize.value)(rawYaml.value), ''),
);

const rawYamlValidationRules = computed(() => createYamlValidationRules(t('tools.yaml-prettify.message.invalidYaml')));

const rawYamlValidation = useValidation({
  source: rawYaml,
  rules: rawYamlValidationRules.value,
});
</script>

<template>
  <div style="flex: 0 0 100%">
    <div style="margin: 0 auto; max-width: 600px" flex justify-center gap-3>
      <n-form-item :label="t('tools.yaml-prettify.label.sortKeys')" label-placement="left" label-width="100">
        <n-switch v-model:value="sortKeys" />
      </n-form-item>
      <n-form-item
        :label="t('tools.yaml-prettify.label.indentSize')"
        label-placement="left"
        label-width="100"
        :show-feedback="false"
      >
        <n-input-number v-model:value="indentSize" min="1" max="10" style="width: 100px" />
      </n-form-item>
    </div>
  </div>

  <n-form-item
    :label="t('tools.yaml-prettify.label.yourRawYaml')"
    :feedback="rawYamlValidation.message"
    :validation-status="rawYamlValidation.status"
  >
    <c-input-text
      ref="inputElement"
      v-model:value="rawYaml"
      :placeholder="t('tools.yaml-prettify.placeholder.pasteRawYaml')"
      rows="20"
      multiline
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      monospace
    />
  </n-form-item>
  <n-form-item :label="t('tools.yaml-prettify.label.prettifiedVersionOfYaml')">
    <TextareaCopyable :value="cleanYaml" language="yaml" :follow-height-of="inputElement" />
  </n-form-item>
</template>

<style lang="less" scoped>
.result-card {
  position: relative;
  .copy-button {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
