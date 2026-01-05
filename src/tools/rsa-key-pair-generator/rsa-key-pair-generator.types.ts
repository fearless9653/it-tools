export interface RSAKeyPairConfig {
  bits?: number;
}

export interface RSAKeyPair {
  publicKeyPem: string;
  privateKeyPem: string;
}

export interface RSAKeyPairService {
  generateKeyPair: (config: RSAKeyPairConfig) => Promise<RSAKeyPair>;
  downloadTextAsFile: (text: string, filename: string) => void;
  generateRawPairs: (config: RSAKeyPairConfig) => Promise<any>;
}

export interface DownloadKeysParams {
  publicKeyPem: string;
  privateKeyPem: string;
  publicKeyFilename?: string;
  privateKeyFilename?: string;
}
