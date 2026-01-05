export interface Base64FileConversionParams {
  isFileToBase64: boolean;
}

export interface Base64FilePreviewParams {
  base64String: string;
  maxWidth?: string;
  maxHeight?: string;
}

export interface Base64FileDownloadParams {
  base64String: string;
  fileName: string;
  fileExtension: string;
}
