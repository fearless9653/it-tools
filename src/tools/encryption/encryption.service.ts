import { AES, RC4, Rabbit, TripleDES, enc } from 'crypto-js';
import type {
  DecryptionInput,
  DecryptionOutput,
  EncryptionAlgo,
  EncryptionInput,
  EncryptionOutput,
} from './encryption.types';

export { encryptText, decryptText, getAvailableAlgorithms, isValidAlgorithm };

/**
 * Available encryption algorithms
 */
const algos: Record<EncryptionAlgo, any> = { AES, TripleDES, Rabbit, RC4 };

/**
 * Gets the available encryption algorithms
 */
function getAvailableAlgorithms(): EncryptionAlgo[] {
  return Object.keys(algos) as EncryptionAlgo[];
}

/**
 * Checks if the provided algorithm is valid
 */
function isValidAlgorithm(algo: string): algo is EncryptionAlgo {
  return algo in algos;
}

/**
 * Encrypts text using the specified algorithm and secret key
 */
function encryptText(input: EncryptionInput, algo: EncryptionAlgo, secret: string): EncryptionOutput {
  if (!isValidAlgorithm(algo)) {
    throw new Error(`Unsupported encryption algorithm: ${algo}`);
  }

  return algos[algo].encrypt(input, secret).toString();
}

/**
 * Decrypts text using the specified algorithm and secret key
 */
function decryptText(input: DecryptionInput, algo: EncryptionAlgo, secret: string): DecryptionOutput {
  if (!isValidAlgorithm(algo)) {
    throw new Error(`Unsupported decryption algorithm: ${algo}`);
  }

  return algos[algo].decrypt(input, secret).toString(enc.Utf8);
}
