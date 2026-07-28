export type QRCodeReaderErrorCode = 'invalidImage' | 'notFound' | 'decodeFailed';

export interface QRCodeReaderResult {
  text: string;
  version: number;
  width: number;
  height: number;
}

export interface QRCodeReaderService {
  decodeQRCode: (blob: Blob) => Promise<QRCodeReaderResult | null>;
}
