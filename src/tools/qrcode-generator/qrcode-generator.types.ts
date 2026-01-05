import type { QRCodeErrorCorrectionLevel } from 'qrcode';

export interface QRCodeOptions {
  text: string;
  foregroundColor: string;
  backgroundColor: string;
  errorCorrectionLevel: QRCodeErrorCorrectionLevel;
  width: number;
}

export interface QRCodeGeneratorService {
  generateQRCode: (options: QRCodeOptions) => Promise<string>;
}

export const errorCorrectionLevels: QRCodeErrorCorrectionLevel[] = ['low', 'medium', 'quartile', 'high'];
