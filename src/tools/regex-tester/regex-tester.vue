<script setup lang="ts">
import type { ShadowRootExpose } from 'vue-shadow-dom';
import { buildRegexFlags, generateSample, matchRegex, renderRegexVisualization } from './regex-tester.service';
import type { RegexMatchResult, RegexOptions } from './regex-tester.types';
import { useValidation } from '@/composable/validation';
import { useQueryParamOrStorage } from '@/composable/queryParams';

const { t } = useI18n();

const regex = useQueryParamOrStorage({ name: 'regex', storageName: 'regex-tester:regex', defaultValue: '' });
const text = ref('');
const global = ref(true);
const ignoreCase = ref(false);
const multiline = ref(false);
const dotAll = ref(true);
const unicode = ref(true);
const unicodeSets = ref(false);
const visualizerSVG = ref<ShadowRootExpose>();

const regexValidation = useValidation({
  source: regex,
  rules: [
    {
      message: t('tools.regex-tester.message.invalidRegex', ['{0}']),
      validator: value => new RegExp(value),
      getErrorMessage: value => {
        const _ = new RegExp(value);
        return '';
      },
    },
  ],
});

const options = computed<RegexOptions>(() => ({
  global: global.value,
  ignoreCase: ignoreCase.value,
  multiline: multiline.value,
  dotAll: dotAll.value,
  unicode: unicode.value,
  unicodeSets: unicodeSets.value,
}));

const results = computed<RegexMatchResult[]>(() => {
  const flags = buildRegexFlags(options.value);

  try {
    return matchRegex(regex.value, text.value, flags);
  } catch (_) {
    return [];
  }
});

const sample = computed(() => {
  return generateSample(regex.value);
});

watchEffect(async () => {
  const regexValue = regex.value;
  // shadow root is required:
  // @regexper/render append a <defs><style> that broke svg transparency of icons in the whole site
  const visualizer = visualizerSVG.value?.shadow_root;
  if (visualizer) {
    await renderRegexVisualization(regexValue, visualizer);
  }
});
</script>

<template>
  <div max-w-600px>
    <c-card :title="t('tools.regex-tester.cardTitle.regex')" mb-1>
      <c-input-text
        v-model:value="regex"
        :label="t('tools.regex-tester.label.regexToTest')"
        :placeholder="t('tools.regex-tester.placeholder.putTheRegexToTest')"
        multiline
        rows="3"
        :validation="regexValidation"
      />
      <router-link target="_blank" to="/regex-memo" mb-1 mt-1>
        {{ t('tools.regex-tester.link.seeCheatsheet') }}
      </router-link>
      <n-space>
        <n-checkbox v-model:checked="global">
          <span :title="t('tools.regex-tester.tooltip.globalSearch')">
            {{ t('tools.regex-tester.checkbox.globalSearch', ['g']) }}
          </span>
        </n-checkbox>
        <n-checkbox v-model:checked="ignoreCase">
          <span :title="t('tools.regex-tester.tooltip.caseInsensitiveSearch')">
            {{ t('tools.regex-tester.checkbox.caseInsensitiveSearch', ['i']) }}
          </span>
        </n-checkbox>
        <n-checkbox v-model:checked="multiline">
          <span :title="t('tools.regex-tester.tooltip.allowsCaretAndDollar')">
            {{ t('tools.regex-tester.checkbox.multiline', ['m']) }}
          </span>
        </n-checkbox>
        <n-checkbox v-model:checked="dotAll">
          <span :title="t('tools.regex-tester.tooltip.allowsDotToMatch')">
            {{ t('tools.regex-tester.checkbox.singleline', ['s']) }}
          </span>
        </n-checkbox>
        <n-checkbox v-model:checked="unicode">
          <span :title="t('tools.regex-tester.tooltip.unicodeTreatPattern')">
            {{ t('tools.regex-tester.checkbox.unicode', ['u']) }}
          </span>
        </n-checkbox>
        <n-checkbox v-model:checked="unicodeSets">
          <span :title="t('tools.regex-tester.tooltip.upgradeToUMode')">
            {{ t('tools.regex-tester.checkbox.unicodeSets', ['v']) }}
          </span>
        </n-checkbox>
      </n-space>

      <n-divider />

      <c-input-text
        v-model:value="text"
        :label="t('tools.regex-tester.label.textToMatch')"
        :placeholder="t('tools.regex-tester.placeholder.putTheTextToMatch')"
        multiline
        rows="5"
      />
    </c-card>

    <c-card :title="t('tools.regex-tester.cardTitle.matches')" mb-1 mt-3>
      <n-table v-if="results?.length > 0">
        <thead>
          <tr>
            <th scope="col">{{ t('tools.regex-tester.table.indexInText') }}</th>
            <th scope="col">{{ t('tools.regex-tester.table.value') }}</th>
            <th scope="col">{{ t('tools.regex-tester.table.captures') }}</th>
            <th scope="col">{{ t('tools.regex-tester.table.groups') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="match of results" :key="match.index">
            <td>{{ match.index }}</td>
            <td>{{ match.value }}</td>
            <td>
              <ul>
                <li v-for="capture in match.captures" :key="capture.name">
                  "{{ capture.name }}" = {{ capture.value }} [{{ capture.start }} - {{ capture.end }}]
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li v-for="group in match.groups" :key="group.name">
                  "{{ group.name }}" = {{ group.value }} [{{ group.start }} - {{ group.end }}]
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </n-table>
      <c-alert v-else> {{ t('tools.regex-tester.alert.noMatch') }} </c-alert>
    </c-card>

    <c-card :title="t('tools.regex-tester.cardTitle.sampleMatchingText')" mt-3>
      <pre style="white-space: pre-wrap; word-break: break-all">{{ sample }}</pre>
    </c-card>

    <c-card :title="t('tools.regex-tester.cardTitle.regexDiagram')" style="overflow-x: scroll" mt-3>
      <shadow-root ref="visualizerSVG"> &#xa0; </shadow-root>
    </c-card>
  </div>
</template>
