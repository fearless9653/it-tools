<script setup lang="ts">
import { processDockerRunCommand } from './docker-to-compose.service';
import type { DockerRunCommand } from './docker-to-compose.types';
import { useDownloadFileFromBase64 } from '@/composable/downloadBase64';

const { t } = useI18n();

const dockerRun = ref<DockerRunCommand>(
  'docker run -p 80:80 -v /var/run/docker.sock:/tmp/docker.sock:ro --restart always --log-opt max-size=1g nginx',
);

const conversionData = computed(() => processDockerRunCommand(dockerRun.value));

const dockerCompose = computed(() => conversionData.value.dockerCompose);
const notImplemented = computed(() => conversionData.value.notImplemented);
const notComposable = computed(() => conversionData.value.notComposable);
const errors = computed(() => conversionData.value.errors);
const dockerComposeBase64 = computed(() => conversionData.value.dockerComposeBase64);

const { download } = useDownloadFileFromBase64({ source: dockerComposeBase64, filename: 'docker-compose.yml' });
</script>

<template>
  <div>
    <c-input-text
      v-model:value="dockerRun"
      :label="t('tools.docker-to-compose.label.dockerRunCommand')"
      style="font-family: monospace"
      multiline
      raw-text
      monospace
      :placeholder="t('tools.docker-to-compose.placeholder.dockerRunCommand')"
      rows="3"
    />

    <n-divider />

    <TextareaCopyable :value="dockerCompose" language="yaml" />

    <div mt-5 flex justify-center>
      <c-button :disabled="dockerCompose === ''" secondary @click="download">
        {{ t('tools.docker-to-compose.button.download') }}
      </c-button>
    </div>

    <div v-if="notComposable.length > 0">
      <n-alert :title="t('tools.docker-to-compose.alert.notTranslatableTitle')" type="info" mt-5>
        <ul>
          <li v-for="(message, index) of notComposable" :key="index">
            {{ message }}
          </li>
        </ul>
      </n-alert>
    </div>

    <div v-if="notImplemented.length > 0">
      <n-alert :title="t('tools.docker-to-compose.alert.notImplementedTitle')" type="warning" mt-5>
        <ul>
          <li v-for="(message, index) of notImplemented" :key="index">
            {{ message }}
          </li>
        </ul>
      </n-alert>
    </div>

    <div v-if="errors.length > 0">
      <n-alert :title="t('tools.docker-to-compose.alert.errorsTitle')" type="error" mt-5>
        <ul>
          <li v-for="(message, index) of errors" :key="index">
            {{ message }}
          </li>
        </ul>
      </n-alert>
    </div>
  </div>
</template>
