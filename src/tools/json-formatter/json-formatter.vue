<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { jsonFormatterService } from './json-formatter.service';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const { t, locale } = useI18n();

// 输入JSON内容
const inputJson = ref('');
const inputElement = ref<HTMLElement>();

// 输出JSON内容
const outputJson = ref('');

// 执行特定操作
function executeOperation(operation: 'compress' | 'escape' | 'unescape' | 'beautify') {
  // 将转换结果放入输出框，而不是修改输入框
  outputJson.value = jsonFormatterService.processJson(operation, inputJson.value);
}

// 执行特定操作 - Unicode转中文
function uniToChinese() {
  outputJson.value = jsonFormatterService.uniToChinese(inputJson.value);
}

// 执行特定操作 - 中文转Unicode
function chineseToUni() {
  outputJson.value = jsonFormatterService.chineseToUni(inputJson.value);
}

// 执行特定操作 - 中文符号转英文符号
function cnPunctToEn() {
  outputJson.value = jsonFormatterService.cnPunctToEn(inputJson.value);
}

// 检查是否为中文环境
const isChineseLocale = computed(() => locale.value === 'zh');
</script>

<template>
  <div style="flex: 0 0 100%">
    <div style="max-width: 1200px" mx-auto mb-5 flex flex-wrap gap-2>
      <c-button flex-1 type="primary" @click="executeOperation('compress')">
        {{ t('tools.json-formatter.button.compress') }}
      </c-button>
      <c-button flex-1 type="primary" @click="executeOperation('beautify')">
        {{ t('tools.json-formatter.button.beautify') }}
      </c-button>
      <c-button flex-1 @click="executeOperation('escape')">
        {{ t('tools.json-formatter.button.escape') }}
      </c-button>
      <c-button flex-1 @click="executeOperation('unescape')">
        {{ t('tools.json-formatter.button.unescape') }}
      </c-button>
      <c-button v-if="isChineseLocale" flex-1 @click="uniToChinese">
        {{ t('tools.json-formatter.button.unicodeToChinese') }}
      </c-button>
      <c-button v-if="isChineseLocale" flex-1 @click="chineseToUni">
        {{ t('tools.json-formatter.button.chineseToUnicode') }}
      </c-button>
      <c-button v-if="isChineseLocale" flex-1 @click="cnPunctToEn">
        {{ t('tools.json-formatter.button.chinesePunctuationToEnglish') }}
      </c-button>
    </div>
  </div>

  <n-form-item :label="t('tools.json-formatter.label.inputJson')">
    <c-input-text
      ref="inputElement"
      v-model:value="inputJson"
      :placeholder="t('tools.json-formatter.placeholder.pasteJson')"
      rows="20"
      multiline
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      monospace
    />
  </n-form-item>
  <n-form-item :label="t('tools.json-formatter.label.outputJson')">
    <TextareaCopyable :value="outputJson" language="json" :follow-height-of="inputElement" />
  </n-form-item>
</template>
