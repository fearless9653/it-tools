import { MessageType, composerize } from 'composerize-ts';
import type { DockerComposeYaml, DockerConversionResult, DockerRunCommand } from './docker-to-compose.types';
import { withDefaultOnError } from '@/utils/defaults';
import { textToBase64 } from '@/utils/base64';

export {
  convertDockerRunToCompose,
  extractDockerComposeYaml,
  extractNotImplementedMessages,
  extractNotComposableMessages,
  extractErrorMessages,
  generateDockerComposeBase64,
  processDockerRunCommand,
};

/**
 * Converts a docker run command to docker-compose yaml
 */
function convertDockerRunToCompose(dockerRun: string): DockerConversionResult {
  return withDefaultOnError(() => composerize(dockerRun.trim()), { yaml: '', messages: [] });
}

/**
 * Extracts the docker-compose yaml from the conversion result
 */
function extractDockerComposeYaml(conversionResult: DockerConversionResult): DockerComposeYaml {
  return conversionResult.yaml;
}

/**
 * Extracts not implemented messages from the conversion result
 */
function extractNotImplementedMessages(conversionResult: DockerConversionResult): string[] {
  return conversionResult.messages.filter(msg => msg.type === MessageType.notImplemented).map(msg => msg.value);
}

/**
 * Extracts not composable messages from the conversion result
 */
function extractNotComposableMessages(conversionResult: DockerConversionResult): string[] {
  return conversionResult.messages.filter(msg => msg.type === MessageType.notTranslatable).map(msg => msg.value);
}

/**
 * Extracts error messages from the conversion result
 */
function extractErrorMessages(conversionResult: DockerConversionResult): string[] {
  return conversionResult.messages.filter(msg => msg.type === MessageType.errorDuringConversion).map(msg => msg.value);
}

/**
 * Generates a base64 encoded data URL for the docker-compose yaml
 */
function generateDockerComposeBase64(yaml: string): string {
  return `data:application/yaml;base64,${textToBase64(yaml)}`;
}

/**
 * Processes a docker run command and returns all necessary data for the UI
 */
function processDockerRunCommand(dockerRun: DockerRunCommand): {
  dockerCompose: DockerComposeYaml;
  notImplemented: string[];
  notComposable: string[];
  errors: string[];
  dockerComposeBase64: string;
} {
  const conversionResult = convertDockerRunToCompose(dockerRun);
  const dockerCompose = extractDockerComposeYaml(conversionResult);
  const notImplemented = extractNotImplementedMessages(conversionResult);
  const notComposable = extractNotComposableMessages(conversionResult);
  const errors = extractErrorMessages(conversionResult);
  const dockerComposeBase64 = generateDockerComposeBase64(dockerCompose);

  return {
    dockerCompose,
    notImplemented,
    notComposable,
    errors,
    dockerComposeBase64,
  };
}
