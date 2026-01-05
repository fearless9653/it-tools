import {
  HmacMD5,
  HmacRIPEMD160,
  HmacSHA1,
  HmacSHA224,
  HmacSHA256,
  HmacSHA3,
  HmacSHA384,
  HmacSHA512,
  enc,
} from 'crypto-js';
import { convertHexToBin } from '../hash-text/hash-text.service';
import type { AlgorithmName, Encoding } from './hmac-generator.types';

const algos = {
  MD5: HmacMD5,
  RIPEMD160: HmacRIPEMD160,
  SHA1: HmacSHA1,
  SHA3: HmacSHA3,
  SHA224: HmacSHA224,
  SHA256: HmacSHA256,
  SHA384: HmacSHA384,
  SHA512: HmacSHA512,
} as const;

export function generateHmac(algo: AlgorithmName, plainText: string, secret: string, encoding: Encoding) {
  const algoFunction = algos[algo];
  const words = algoFunction(plainText, secret);

  if (encoding === 'Bin') {
    return convertHexToBin(words.toString(enc.Hex));
  }

  return words.toString(enc[encoding]);
}
