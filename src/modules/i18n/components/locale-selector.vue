<script setup lang="ts">
const { locale } = useI18n();

const localesLong: Record<string, string> = {
  zh: '中文',
  en: 'English',
};

// 定义语言选项顺序，将中文设为第一个选项
const localeOptions = computed(() => [
  { label: localesLong.zh, value: 'zh' },
  { label: localesLong.en, value: 'en' },
]);
</script>

<template>
  <c-select v-model:value="locale" :options="localeOptions" placeholder="Select a language" w-100px />
</template>
