<script setup lang="ts">
import { colord, extend } from 'colord';
import cmykPlugin from 'colord/plugins/cmyk';
import hwbPlugin from 'colord/plugins/hwb';
import namesPlugin from 'colord/plugins/names';
import lchPlugin from 'colord/plugins/lch';
import { initializeColorFormats, updateColorValue } from './color-converter.service';

const { t } = useI18n();

extend([cmykPlugin, hwbPlugin, namesPlugin, lchPlugin]);

const formats = initializeColorFormats(t);

updateColorValue(formats, colord('#50c878'));
</script>

<template>
  <c-card>
    <template v-for="({ label, parse, placeholder, validation, type }, key) in formats" :key="key">
      <input-copyable
        v-if="type === 'text'"
        v-model:value="formats[key].value.value"
        :test-id="`input-${key}`"
        :label="`${label}:`"
        label-position="left"
        label-width="100px"
        label-align="right"
        :placeholder="placeholder"
        :validation="validation"
        raw-text
        clearable
        mt-2
        @update:value="(v: string) => updateColorValue(formats, parse(v), key)"
      />

      <n-form-item
        v-else-if="type === 'color-picker'"
        :label="`${label}:`"
        label-width="100"
        label-placement="left"
        :show-feedback="false"
      >
        <n-color-picker
          v-model:value="formats[key].value.value"
          placement="bottom-end"
          @update:value="(v: string) => updateColorValue(formats, parse(v), key)"
        />
      </n-form-item>
    </template>
  </c-card>
</template>
