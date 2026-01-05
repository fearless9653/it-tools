<script setup lang="ts">
import { useBase64 } from '@vueuse/core';
import type { Ref } from 'vue';
import {
  detectFileExtensionFromBase64,
  previewBase64Image,
  useBase64FileConversion,
  validateBase64String,
} from './base64-file-converter.service';
import { useCopy } from '@/composable/copy';
import { useDownloadFileFromBase64Refs } from '@/composable/downloadBase64';
import { useValidation } from '@/composable/validation';

const { t } = useI18n();

const { isFileToBase64, getSwitchButtonLabel, getCardTitle } = useBase64FileConversion();
const fileName = ref('file');
const fileExtension = ref('');
const base64Input = ref('');
const { download } = useDownloadFileFromBase64Refs({
  source: base64Input,
  filename: fileName,
  extension: fileExtension,
});
const base64InputValidation = useValidation({
  source: base64Input,
  rules: [
    {
      message: t('tools.base64-file-converter.message.invalidBase64'),
      validator: value => validateBase64String(value),
    },
  ],
});

watch(base64Input, (newValue, _) => {
  const detectedExtension = detectFileExtensionFromBase64(newValue);
  if (detectedExtension) {
    fileExtension.value = detectedExtension || fileExtension.value;
  }
});

function previewImage() {
  if (!base64InputValidation.isValid) {
    return;
  }
  previewBase64Image({ base64String: base64Input.value });
}

function downloadFile() {
  if (!base64InputValidation.isValid) {
    return;
  }

  try {
    download();
  } catch (_) {
    //
  }
}

const fileInput = ref() as Ref<File>;
const { base64: fileBase64 } = useBase64(fileInput);
const { copy: copyFileBase64 } = useCopy({
  source: fileBase64,
  text: t('tools.base64-file-converter.message.base64Copied'),
});

async function onUpload(file: File) {
  if (file) {
    fileInput.value = file;
  }
}

// ... existing code ...
</script>

<template>
  <c-card>
    <div class="converter-header" mb-4 flex items-center justify-between>
      <h2 class="converter-title" text-lg font-semibold>
        {{ getCardTitle(t) }}
      </h2>
      <c-button
        :title="t('tools.base64-file-converter.tooltip.switchConversionDirection')"
        @click="isFileToBase64 = !isFileToBase64"
      >
        {{ getSwitchButtonLabel(t) }}
      </c-button>
    </div>

    <template v-if="isFileToBase64">
      <c-file-upload :title="t('tools.base64-file-converter.tooltip.dragAndDropFile')" @file-upload="onUpload" />
      <c-input-text
        :value="fileBase64"
        multiline
        readonly
        :placeholder="t('tools.base64-file-converter.placeholder.fileInBase64Here')"
        rows="5"
        my-2
      />

      <div flex justify-center>
        <c-button @click="copyFileBase64()"> {{ t('tools.base64-file-converter.button.copy') }} </c-button>
      </div>
    </template>

    <template v-else>
      <n-grid cols="3" x-gap="12">
        <n-gi span="2">
          <c-input-text
            v-model:value="fileName"
            :label="t('tools.base64-file-converter.label.fileName')"
            :placeholder="t('tools.base64-file-converter.placeholder.downloadFilename')"
            mb-2
          />
        </n-gi>
        <n-gi>
          <c-input-text
            v-model:value="fileExtension"
            :label="t('tools.base64-file-converter.label.extension')"
            :placeholder="t('tools.base64-file-converter.placeholder.extension')"
            mb-2
          />
        </n-gi>
      </n-grid>
      <c-input-text
        v-model:value="base64Input"
        multiline
        :placeholder="t('tools.base64-file-converter.placeholder.putBase64StringHere')"
        rows="5"
        :validation="base64InputValidation"
        mb-2
      />

      <div flex justify-center py-2>
        <div id="previewContainer" />
      </div>

      <div flex justify-center gap-3>
        <c-button :disabled="base64Input === '' || !base64InputValidation.isValid" @click="previewImage()">
          {{ t('tools.base64-file-converter.button.previewImage') }}
        </c-button>
        <c-button :disabled="base64Input === '' || !base64InputValidation.isValid" @click="downloadFile()">
          {{ t('tools.base64-file-converter.button.downloadFile') }}
        </c-button>
      </div>
    </template>
  </c-card>
</template>

<style lang="less" scoped>
::v-deep(.n-upload-trigger) {
  width: 100%;
}
</style>
