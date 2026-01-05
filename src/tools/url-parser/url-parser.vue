<script setup lang="ts">
import InputCopyable from '../../components/InputCopyable.vue';
import { createUrlValidationRules, getUrlProperties, getUrlSearchParams, safeParseUrl } from './url-parser.service';

const { t } = useI18n();

const urlToParse = ref('https://me:pwd@itools.surfto.top:3000/url-parser?key1=value&key2=value2#the-hash');

const urlParsed = computed(() => safeParseUrl(urlToParse.value));
const urlValidationRules = computed(() => createUrlValidationRules(t('tools.url-parser.message.invalidUrl')));

const properties = computed(() => getUrlProperties());
const searchParams = computed(() => getUrlSearchParams(urlParsed.value));
</script>

<template>
  <c-card>
    <c-input-text
      v-model:value="urlToParse"
      :label="t('tools.url-parser.label.yourUrlToParse')"
      :placeholder="t('tools.url-parser.placeholder.yourUrlToParse')"
      raw-text
      :validation-rules="urlValidationRules"
    />

    <n-divider />

    <InputCopyable
      v-for="{ title, key } in properties"
      :key="key"
      :label="t(title)"
      :value="(urlParsed?.[key] as string) ?? ''"
      readonly
      label-position="left"
      label-width="110px"
      mb-2
      :placeholder="t('tools.url-parser.placeholder.emptyValue')"
    />

    <div v-for="[k, v] in searchParams" :key="k" mb-2 w-full flex>
      <div style="flex: 1 0 110px">
        <icon-mdi-arrow-right-bottom />
      </div>

      <InputCopyable :value="k" readonly />
      <InputCopyable :value="v" readonly />
    </div>
  </c-card>
</template>

<style lang="less" scoped>
.n-input-group-label {
  text-align: right;
}
.n-input-group {
  margin: 2px 0;
}
</style>
