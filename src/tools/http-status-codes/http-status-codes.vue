<script setup lang="ts">
import { codesByCategories } from './http-status-codes.constants';
import { useFuzzySearch } from '@/composable/fuzzySearch';

const { t, locale } = useI18n();

const search = ref('');

// 根据当前语言环境获取状态码数据
const currentLocale = computed(() => locale.value);

const statusCodesWithLocale = computed(() => {
  return codesByCategories.map(({ category, codes }) => ({
    category: category[currentLocale.value as 'en' | 'zh'],
    codes: codes.map(({ code, name, description, type }) => ({
      code,
      name: name[currentLocale.value as 'en' | 'zh'],
      description: description[currentLocale.value as 'en' | 'zh'],
      type,
    })),
  }));
});

const { searchResult } = useFuzzySearch({
  search,
  data: statusCodesWithLocale.value.flatMap(({ codes, category }) => codes.map(code => ({ ...code, category }))),
  options: {
    keys: [{ name: 'code', weight: 3 }, { name: 'name', weight: 2 }, 'description', 'category'],
  },
});

const codesByCategoryFiltered = computed(() => {
  if (!search.value) {
    return statusCodesWithLocale.value;
  }

  return [{ category: t('tools.http-status-codes.searchResults'), codes: searchResult.value }];
});
</script>

<template>
  <div>
    <c-input-text
      v-model:value="search"
      :placeholder="t('tools.http-status-codes.searchPlaceholder')"
      autofocus
      raw-text
      mb-10
    />

    <div v-for="{ codes, category } of codesByCategoryFiltered" :key="category" mb-8>
      <div mb-2 text-xl>
        {{ category }}
      </div>

      <c-card v-for="{ code, description, name, type } of codes" :key="code" mb-2>
        <div text-lg font-bold>{{ code }} {{ name }}</div>
        <div op-70>{{ description }} {{ type !== 'HTTP' ? `For ${type}.` : '' }}</div>
      </c-card>
    </div>
  </div>
</template>
