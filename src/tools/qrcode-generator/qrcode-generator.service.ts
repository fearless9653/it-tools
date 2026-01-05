import { type MaybeRef, get } from '@vueuse/core';
import QRCode, { type QRCodeErrorCorrectionLevel, type QRCodeToDataURLOptions } from 'qrcode';
import { isRef, ref, watch } from 'vue';

export function useQRCode({
  text,
  color: { background, foreground },
  errorCorrectionLevel,
  options,
}: {
  text: MaybeRef<string>;
  color: { foreground: MaybeRef<string>; background: MaybeRef<string> };
  errorCorrectionLevel?: MaybeRef<QRCodeErrorCorrectionLevel>;
  options?: QRCodeToDataURLOptions;
}) {
  const qrcode = ref('');

  watch(
    [text, background, foreground, errorCorrectionLevel].filter(isRef),
    async () => {
      if (get(text)) {
        qrcode.value = await QRCode.toDataURL(get(text).trim(), {
          color: {
            dark: get(foreground),
            light: get(background),
            ...options?.color,
          },
          errorCorrectionLevel: get(errorCorrectionLevel) ?? 'M',
          ...options,
        });
      }
    },
    { immediate: true },
  );

  return { qrcode };
}

/**
 * Generates a QR code as a data URL
 */
export async function generateQRCode(
  text: string,
  foregroundColor: string = '#000000ff',
  backgroundColor: string = '#ffffffff',
  errorCorrectionLevel: QRCodeErrorCorrectionLevel = 'M',
  width: number = 1024,
): Promise<string> {
  if (!text?.trim()) {
    return '';
  }

  return await QRCode.toDataURL(text.trim(), {
    color: {
      dark: foregroundColor,
      light: backgroundColor,
    },
    errorCorrectionLevel,
    width,
  });
}
