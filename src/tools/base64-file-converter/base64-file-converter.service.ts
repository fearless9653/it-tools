import type { Base64FilePreviewParams } from './base64-file-converter.types';
import { getExtensionFromMimeType, getMimeTypeFromBase64, previewImageFromBase64 } from '@/composable/downloadBase64';
import { isValidBase64 } from '@/utils/base64';

export function useBase64FileConversion() {
  const isFileToBase64 = ref(true);

  function getSwitchButtonLabel(t: (key: string) => string) {
    return isFileToBase64.value
      ? t('tools.base64-file-converter.button.switchToDecode') // 当前是文件到Base64模式，按钮显示切换到Base64到文件
      : t('tools.base64-file-converter.button.switchToEncode'); // 当前是Base64到文件模式，按钮显示切换到文件到Base64
  }

  function getCardTitle(t: (key: string) => string) {
    return isFileToBase64.value
      ? t('tools.base64-file-converter.conversionTitle.fileToBase64')
      : t('tools.base64-file-converter.conversionTitle.base64ToFile');
  }

  return {
    isFileToBase64,
    getSwitchButtonLabel,
    getCardTitle,
  };
}

export function previewBase64Image({
  base64String,
  maxWidth = '100%',
  maxHeight = '400px',
}: Base64FilePreviewParams): boolean {
  try {
    if (!isValidBase64(base64String.trim())) {
      return false;
    }

    const image = previewImageFromBase64(base64String);
    image.style.maxWidth = maxWidth;
    image.style.maxHeight = maxHeight;
    const previewContainer = document.getElementById('previewContainer');
    if (previewContainer) {
      previewContainer.innerHTML = '';
      previewContainer.appendChild(image);
    }
    return true;
  } catch (_) {
    return false;
  }
}

export function validateBase64String(base64String: string): boolean {
  return isValidBase64(base64String.trim());
}

export function detectFileExtensionFromBase64(base64String: string): string | null {
  const { mimeType } = getMimeTypeFromBase64({ base64String });
  if (mimeType) {
    const extension = getExtensionFromMimeType(mimeType);
    return typeof extension === 'string' ? extension : null;
  }
  return null;
}
