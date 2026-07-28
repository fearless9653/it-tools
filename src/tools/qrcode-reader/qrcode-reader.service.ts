import jsQR from 'jsqr';
import { ref } from 'vue';
import type { QRCodeReaderErrorCode, QRCodeReaderResult } from './qrcode-reader.types';

/**
 * Large pictures are downscaled before decoding: `getImageData` on a 12MP photo
 * is slow and jsQR does not gain accuracy from the extra pixels.
 */
const MAX_DIMENSION = 2000;

/**
 * SVG images have no intrinsic size in most browsers, so `naturalWidth` is 0.
 * Rasterize them at a size large enough to keep the modules distinguishable.
 */
const SVG_FALLBACK_SIZE = 1024;

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Unable to load the image'));
    image.src = url;
  });
}

function getImageDataFromImage(image: HTMLImageElement): ImageData {
  const naturalWidth = image.naturalWidth || SVG_FALLBACK_SIZE;
  const naturalHeight = image.naturalHeight || SVG_FALLBACK_SIZE;

  const scale = Math.min(1, MAX_DIMENSION / Math.max(naturalWidth, naturalHeight));
  const width = Math.max(1, Math.round(naturalWidth * scale));
  const height = Math.max(1, Math.round(naturalHeight * scale));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) {
    throw new Error('Unable to get a 2d canvas context');
  }

  // The generator can produce codes with a transparent background; without an
  // opaque fill those decode as black-on-black.
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, width, height);
  context.drawImage(image, 0, 0, width, height);

  return context.getImageData(0, 0, width, height);
}

async function getImageDataFromBlob(blob: Blob): Promise<ImageData> {
  const url = URL.createObjectURL(blob);

  try {
    return getImageDataFromImage(await loadImage(url));
  } finally {
    URL.revokeObjectURL(url);
  }
}

function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Unable to read the file'));
    reader.readAsDataURL(blob);
  });
}

export function decodeQRCodeFromImageData(imageData: ImageData): QRCodeReaderResult | null {
  const decoded = jsQR(imageData.data, imageData.width, imageData.height, {
    // Covers both regular and colour-inverted codes.
    inversionAttempts: 'attemptBoth',
  });

  if (!decoded) {
    return null;
  }

  return {
    text: decoded.data,
    version: decoded.version,
    width: imageData.width,
    height: imageData.height,
  };
}

/**
 * Decodes the first QR code found in an image blob, or null when there is none.
 */
export async function decodeQRCode(blob: Blob): Promise<QRCodeReaderResult | null> {
  return decodeQRCodeFromImageData(await getImageDataFromBlob(blob));
}

export function useQRCodeReader() {
  const imageSource = ref('');
  const result = ref<QRCodeReaderResult | null>(null);
  const error = ref<QRCodeReaderErrorCode | null>(null);
  const isDecoding = ref(false);

  function reset() {
    imageSource.value = '';
    result.value = null;
    error.value = null;
  }

  async function read(blob: Blob) {
    reset();

    if (!blob.type.startsWith('image/')) {
      error.value = 'invalidImage';
      return;
    }

    isDecoding.value = true;

    try {
      imageSource.value = await blobToDataURL(blob);

      const decoded = await decodeQRCode(blob);
      if (!decoded) {
        error.value = 'notFound';
        return;
      }

      result.value = decoded;
    } catch (_) {
      error.value = 'decodeFailed';
    } finally {
      isDecoding.value = false;
    }
  }

  return { imageSource, result, error, isDecoding, read, reset };
}
