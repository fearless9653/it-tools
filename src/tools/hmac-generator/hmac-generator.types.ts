export type Encoding = 'Hex' | 'Base64' | 'Base64url' | 'Bin';

export type AlgorithmName = 'MD5' | 'RIPEMD160' | 'SHA1' | 'SHA224' | 'SHA256' | 'SHA384' | 'SHA512' | 'SHA3';

export interface HmacGeneratorService {
  generateHmac(algo: AlgorithmName, plainText: string, secret: string, encoding: Encoding): string;
}
