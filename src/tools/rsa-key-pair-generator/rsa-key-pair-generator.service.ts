import { pki } from 'node-forge';
import workerScript from 'node-forge/dist/prime.worker.min?url';
import type { DownloadKeysParams, RSAKeyPair, RSAKeyPairConfig } from './rsa-key-pair-generator.types';

function generateRawPairs({ bits = 2048 }: RSAKeyPairConfig = {}) {
  return new Promise<pki.rsa.KeyPair>((resolve, reject) =>
    pki.rsa.generateKeyPair({ bits, workerScript }, (err, keyPair) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(keyPair);
    }),
  );
}

export async function generateKeyPair(config: RSAKeyPairConfig = {}): Promise<RSAKeyPair> {
  const { privateKey, publicKey } = await generateRawPairs(config);

  return {
    publicKeyPem: pki.publicKeyToPem(publicKey),
    privateKeyPem: pki.privateKeyToPem(privateKey),
  };
}

/**
 * Download text content as a file
 * @param text - The text content to download
 * @param filename - The name of the file to download
 */
export function downloadTextAsFile(text: string, filename: string): void {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  // Clean up
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Download both public and private keys
 * @param params - The parameters for downloading keys
 */
export function downloadKeys(params: DownloadKeysParams): void {
  const {
    publicKeyPem,
    privateKeyPem,
    publicKeyFilename = `rsa-public-key-${getCompactDateTime()}.pem`,
    privateKeyFilename = `rsa-private-key-${getCompactDateTime()}.pem`,
  } = params;

  // Download public key
  downloadTextAsFile(publicKeyPem, publicKeyFilename);

  // Download private key
  downloadTextAsFile(privateKeyPem, privateKeyFilename);
}

/**
 * Get compact date time string
 */
export function getCompactDateTime(): string {
  const now = new Date();
  return now
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '')
    .slice(0, 14);
}
