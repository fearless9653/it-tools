<script setup lang="ts">
import { generateHmac } from './hmac-generator.service';
import type { AlgorithmName, Encoding } from './hmac-generator.types';
import { useCopy } from '@/composable/copy';

const { t } = useI18n();

const plainText = ref('');
const secret = ref('');
const hashFunction = ref<AlgorithmName>('SHA256');
const encoding = ref<Encoding>('Hex');

const algos = {
  MD5: 'MD5',
  RIPEMD160: 'RIPEMD160',
  SHA1: 'SHA1',
  SHA3: 'SHA3',
  SHA224: 'SHA224',
  SHA256: 'SHA256',
  SHA384: 'SHA384',
  SHA512: 'SHA512',
} as const;

// 定义类型但不使用，添加注释说明其用途
// type AlgoKeys = keyof typeof algos;

const hmac = computed(() => generateHmac(hashFunction.value, plainText.value, secret.value, encoding.value));
const { copy } = useCopy({ source: hmac });
</script>

<template>
  <div flex flex-col gap-4>
    <c-input-text
      v-model:value="plainText"
      multiline
      raw-text
      :placeholder="t('tools.hmac-generator.placeholder.plainText')"
      rows="3"
      autosize
      autofocus
      :label="t('tools.hmac-generator.label.plainText')"
    />
    <c-input-text
      v-model:value="secret"
      raw-text
      :placeholder="t('tools.hmac-generator.placeholder.secretKey')"
      :label="t('tools.hmac-generator.label.secretKey')"
      clearable
    />

    <div flex gap-2>
      <c-select
        v-model:value="hashFunction"
        :label="t('tools.hmac-generator.label.hashingFunction')"
        flex-1
        :placeholder="t('tools.hmac-generator.placeholder.selectHashingFunction')"
        :options="Object.keys(algos).map(label => ({ label, value: label }))"
      />
      <c-select
        v-model:value="encoding"
        :label="t('tools.hmac-generator.label.outputEncoding')"
        flex-1
        :placeholder="t('tools.hmac-generator.placeholder.selectResultEncoding')"
        :options="[
          {
            label: 'Binary (base 2)',
            value: 'Bin',
          },
          {
            label: 'Hexadecimal (base 16)',
            value: 'Hex',
          },
          {
            label: 'Base64 (base 64)',
            value: 'Base64',
          },
          {
            label: 'Base64-url (base 64 with url safe chars)',
            value: 'Base64url',
          },
        ]"
      />
    </div>
    <input-copyable
      v-model:value="hmac"
      type="textarea"
      :placeholder="t('tools.hmac-generator.placeholder.resultHmac')"
      :label="t('tools.hmac-generator.label.hmacOfText')"
    />
    <div flex justify-center>
      <c-button @click="copy()"> {{ t('tools.hmac-generator.button.copyHmac') }} </c-button>
    </div>
  </div>
</template>
