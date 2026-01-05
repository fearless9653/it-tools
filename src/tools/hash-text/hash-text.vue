<script setup lang="ts">
import InputCopyable from '../../components/InputCopyable.vue';
import { hashText } from './hash-text.service';
import type { AlgorithmName, Encoding } from './hash-text.types';
import { useQueryParam } from '@/composable/queryParams';

const { t } = useI18n();

const algoNames: AlgorithmName[] = ['MD5', 'SHA1', 'SHA256', 'SHA224', 'SHA512', 'SHA384', 'SHA3', 'RIPEMD160'];
const encoding = useQueryParam<Encoding>({ defaultValue: 'Hex', name: 'encoding' });
const clearText = ref('');
</script>

<template>
  <div>
    <c-card>
      <c-input-text
        v-model:value="clearText"
        multiline
        raw-text
        :placeholder="t('tools.hash-text.placeholder.yourStringToHash')"
        rows="3"
        autosize
        autofocus
        :label="t('tools.hash-text.label.yourTextToHash')"
      />

      <n-divider />

      <c-select
        v-model:value="encoding"
        mb-4
        :label="t('tools.hash-text.label.digestEncoding')"
        :options="[
          {
            label: t('tools.hash-text.option.binary'),
            value: 'Bin',
          },
          {
            label: t('tools.hash-text.option.hexadecimal'),
            value: 'Hex',
          },
          {
            label: t('tools.hash-text.option.base64'),
            value: 'Base64',
          },
          {
            label: t('tools.hash-text.option.base64url'),
            value: 'Base64url',
          },
        ]"
      />

      <div v-for="algo in algoNames" :key="algo" style="margin: 5px 0">
        <n-input-group>
          <n-input-group-label style="flex: 0 0 120px">
            {{ algo }}
          </n-input-group-label>
          <InputCopyable :value="hashText(algo, clearText, encoding)" readonly />
        </n-input-group>
      </div>
    </c-card>
  </div>
</template>
