<script setup lang="ts">
import { decryptText, encryptText, getAvailableAlgorithms } from './encryption.service';
import type { EncryptionAlgo } from './encryption.types';
import { computedCatch } from '@/composable/computed/catchedComputed';

const { t } = useI18n();

const algos = getAvailableAlgorithms().reduce(
  (acc, algo) => {
    acc[algo] = algo;
    return acc;
  },
  {} as Record<EncryptionAlgo, EncryptionAlgo>,
);

const cypherInput = ref('Lorem ipsum dolor sit amet');
const cypherAlgo = ref<EncryptionAlgo>('AES');
const cypherSecret = ref('my secret key');
const cypherOutput = computed(() => encryptText(cypherInput.value, cypherAlgo.value, cypherSecret.value));

const decryptInput = ref('U2FsdGVkX1/EC3+6P5dbbkZ3e1kQ5o2yzuU0NHTjmrKnLBEwreV489Kr0DIB+uBs');
const decryptAlgo = ref<EncryptionAlgo>('AES');
const decryptSecret = ref('my secret key');
const [decryptOutput, decryptError] = computedCatch(
  () => decryptText(decryptInput.value, decryptAlgo.value, decryptSecret.value),
  {
    defaultValue: '',
    defaultErrorMessage: t('tools.encryption.message.unableToDecrypt'),
  },
);
</script>

<template>
  <c-card :title="t('tools.encryption.cardTitle.encrypt')">
    <div flex gap-3>
      <c-input-text
        v-model:value="cypherInput"
        :label="t('tools.encryption.label.yourText')"
        :placeholder="t('tools.encryption.placeholder.stringToCypher')"
        rows="4"
        multiline
        raw-text
        monospace
        autosize
        flex-1
      />
      <div flex flex-1 flex-col gap-2>
        <c-input-text
          v-model:value="cypherSecret"
          :label="t('tools.encryption.label.yourSecretKey')"
          clearable
          raw-text
        />

        <c-select
          v-model:value="cypherAlgo"
          :label="t('tools.encryption.label.encryptionAlgorithm')"
          :options="Object.keys(algos).map(label => ({ label, value: label }))"
        />
      </div>
    </div>
    <c-input-text
      :label="t('tools.encryption.label.yourTextEncrypted')"
      :value="cypherOutput"
      rows="3"
      :placeholder="t('tools.encryption.placeholder.yourStringHash')"
      multiline
      monospace
      readonly
      autosize
      mt-5
    />
  </c-card>
  <c-card :title="t('tools.encryption.cardTitle.decrypt')">
    <div flex gap-3>
      <c-input-text
        v-model:value="decryptInput"
        :label="t('tools.encryption.label.yourEncryptedText')"
        :placeholder="t('tools.encryption.placeholder.stringToCypher')"
        rows="4"
        multiline
        raw-text
        monospace
        autosize
        flex-1
      />
      <div flex flex-1 flex-col gap-2>
        <c-input-text
          v-model:value="decryptSecret"
          :label="t('tools.encryption.label.yourSecretKey')"
          clearable
          raw-text
        />

        <c-select
          v-model:value="decryptAlgo"
          :label="t('tools.encryption.label.encryptionAlgorithm')"
          :options="Object.keys(algos).map(label => ({ label, value: label }))"
        />
      </div>
    </div>
    <c-alert v-if="decryptError" type="warning" mt-12 :title="t('tools.encryption.message.errorWhileDecrypting')">
      {{ decryptError }}
    </c-alert>
    <c-input-text
      v-else
      :label="t('tools.encryption.label.yourDecryptedText')"
      :value="decryptOutput"
      :placeholder="t('tools.encryption.placeholder.yourStringHash')"
      rows="3"
      multiline
      monospace
      readonly
      autosize
      mt-5
    />
  </c-card>
</template>
