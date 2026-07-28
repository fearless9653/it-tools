<script setup lang="ts">
import { useQRCodeReader } from './qrcode-reader.service';
import { useCopy } from '@/composable/copy';

const { t } = useI18n();

const { imageSource, result, error, isDecoding, read, reset } = useQRCodeReader();

const decodedText = computed(() => result.value?.text ?? '');
const { copy } = useCopy({ source: decodedText, text: t('tools.qrcode-reader.message.textCopied') });

function onUpload(file: File) {
  read(file);
}

function onPaste(event: ClipboardEvent) {
  const file = Array.from(event.clipboardData?.items ?? [])
    .find(item => item.kind === 'file' && item.type.startsWith('image/'))
    ?.getAsFile();

  if (file) {
    event.preventDefault();
    read(file);
  }
}

onMounted(() => window.addEventListener('paste', onPaste));
onBeforeUnmount(() => window.removeEventListener('paste', onPaste));
</script>

<template>
  <c-card>
    <c-file-upload
      accept="image/*"
      :title="t('tools.qrcode-reader.tooltip.dragAndDropImage')"
      @file-upload="onUpload"
    />

    <div mt-2 text-center text-13px op-60>
      {{ t('tools.qrcode-reader.text.pasteHint') }}
    </div>

    <n-spin :show="isDecoding" mt-4>
      <n-grid v-if="imageSource" x-gap="12" y-gap="12" cols="1 600:3">
        <n-gi>
          <div flex flex-col items-center gap-3>
            <n-image :src="imageSource" width="200" />
            <c-button @click="reset">
              {{ t('tools.qrcode-reader.button.clear') }}
            </c-button>
          </div>
        </n-gi>
        <n-gi span="2">
          <template v-if="result">
            <c-input-text
              :value="result.text"
              :label="t('tools.qrcode-reader.label.decodedText')"
              rows="5"
              readonly
              autosize
              multiline
              mb-3
            />

            <div mb-3 text-13px op-60>
              {{
                t('tools.qrcode-reader.text.details', {
                  version: result.version,
                  width: result.width,
                  height: result.height,
                })
              }}
            </div>

            <div flex justify-center>
              <c-button @click="copy()">
                {{ t('tools.qrcode-reader.button.copy') }}
              </c-button>
            </div>
          </template>

          <c-alert v-else-if="error" :title="t('tools.qrcode-reader.error.title')">
            {{ t(`tools.qrcode-reader.error.${error}`) }}
          </c-alert>
        </n-gi>
      </n-grid>

      <c-alert v-else-if="error" :title="t('tools.qrcode-reader.error.title')" mt-4>
        {{ t(`tools.qrcode-reader.error.${error}`) }}
      </c-alert>
    </n-spin>
  </c-card>
</template>
