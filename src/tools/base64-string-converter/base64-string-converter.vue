<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import {
  base64ToTextTransformer,
  createBase64ValidationRules,
  textToBase64Transformer,
} from './base64-string-converter.service';
import { useCopy } from '@/composable/copy';

const { t } = useI18n();

const isTextToBase64 = ref(true);
const encodeUrlSafe = useStorage('base64-string-converter--encode-url-safe', false);
const decodeUrlSafe = useStorage('base64-string-converter--decode-url-safe', false);

const textInput = ref('');
const base64Input = ref('');

// 使用服务函数来计算输出值
const base64Output = computed(() => textToBase64Transformer(textInput.value, { makeUrlSafe: encodeUrlSafe.value }));
const textOutput = computed(() => base64ToTextTransformer(base64Input.value, { makeUrlSafe: decodeUrlSafe.value }));

// 创建复制功能
const { copy: copyTextBase64 } = useCopy({
  source: base64Output,
  text: t('tools.base64-string-converter.message.base64Copied'),
});

const { copy: copyText } = useCopy({
  source: textOutput,
  text: t('tools.base64-string-converter.message.stringCopied'),
});

// 创建验证规则
const b64ValidationRules = createBase64ValidationRules(
  decodeUrlSafe,
  t('tools.base64-string-converter.message.invalidBase64'),
);
const b64ValidationWatch = [decodeUrlSafe];

function getValidationRules() {
  return isTextToBase64.value ? [] : b64ValidationRules;
}

function getInputLabel() {
  return isTextToBase64.value
    ? t('tools.base64-string-converter.label.stringToEncode')
    : t('tools.base64-string-converter.label.base64StringToDecode');
}

function getOutputLabel() {
  return isTextToBase64.value
    ? t('tools.base64-string-converter.label.base64OfString')
    : t('tools.base64-string-converter.label.decodedString');
}

function getPlaceholder() {
  return isTextToBase64.value
    ? t('tools.base64-string-converter.placeholder.putStringHere')
    : t('tools.base64-string-converter.placeholder.yourBase64String');
}

function getOutputPlaceholder() {
  return isTextToBase64.value
    ? t('tools.base64-string-converter.placeholder.base64EncodingHere')
    : t('tools.base64-string-converter.placeholder.decodedStringHere');
}

function getCopyButtonText() {
  return isTextToBase64.value
    ? t('tools.base64-string-converter.button.copyBase64')
    : t('tools.base64-string-converter.button.copyDecodedString');
}

function getSwitchButtonLabel() {
  return isTextToBase64.value
    ? t('tools.base64-string-converter.button.switchToDecode') // 当前是编码模式，按钮显示切换到解码
    : t('tools.base64-string-converter.button.switchToEncode'); // 当前是解码模式，按钮显示切换到编码
}

// 为输入框创建计算属性和更新函数
const inputValue = computed({
  get() {
    return isTextToBase64.value ? textInput.value : base64Input.value;
  },
  set(value) {
    if (isTextToBase64.value) {
      textInput.value = value;
    } else {
      base64Input.value = value;
    }
  },
});
</script>

<template>
  <c-card>
    <div class="converter-header" mb-4 flex items-center justify-between>
      <h2 class="converter-title" text-lg font-semibold>
        {{
          isTextToBase64
            ? t('tools.base64-string-converter.conversionTitle.textToBase64')
            : t('tools.base64-string-converter.conversionTitle.base64ToText')
        }}
      </h2>
      <c-button
        :title="t('tools.base64-string-converter.tooltip.switchConversionDirection')"
        @click="isTextToBase64 = !isTextToBase64"
      >
        {{ getSwitchButtonLabel() }}
      </c-button>
    </div>

    <n-form-item
      v-if="isTextToBase64"
      :label="t('tools.base64-string-converter.label.encodeUrlSafe')"
      label-placement="left"
    >
      <n-switch v-model:value="encodeUrlSafe" />
    </n-form-item>

    <n-form-item v-else :label="t('tools.base64-string-converter.label.decodeUrlSafe')" label-placement="left">
      <n-switch v-model:value="decodeUrlSafe" />
    </n-form-item>

    <c-input-text
      v-model:value="inputValue"
      multiline
      :placeholder="getPlaceholder()"
      rows="5"
      :label="getInputLabel()"
      :validation-rules="getValidationRules()"
      :validation-watch="b64ValidationWatch"
      raw-text
      mb-5
    />

    <c-input-text
      :value="isTextToBase64 ? base64Output : textOutput"
      :label="getOutputLabel()"
      :placeholder="getOutputPlaceholder()"
      multiline
      readonly
      rows="5"
      mb-5
    />

    <div flex justify-center>
      <c-button @click="isTextToBase64 ? copyTextBase64() : copyText()"> {{ getCopyButtonText() }} </c-button>
    </div>
  </c-card>
</template>
