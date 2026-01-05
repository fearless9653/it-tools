import type { MessageType } from 'composerize-ts';

/**
 * Type for docker run command
 */
export type DockerRunCommand = string;

/**
 * Type for docker compose yaml content
 */
export type DockerComposeYaml = string;

/**
 * Type for conversion message
 */
export interface ConversionMessage {
  type: MessageType;
  value: string;
}

/**
 * Type for docker conversion result
 */
export interface DockerConversionResult {
  yaml: string;
  messages: ConversionMessage[];
}
