export type Encoding = 'Hex' | 'Base64' | 'Base64url' | 'Bin';

export type AlgorithmName = 'MD5' | 'SHA1' | 'SHA256' | 'SHA224' | 'SHA512' | 'SHA384' | 'SHA3' | 'RIPEMD160';

export interface HashTextService {
  convertHexToBin(hex: string): string;
  hashText(algo: AlgorithmName, value: string, encoding: Encoding): string;
}
