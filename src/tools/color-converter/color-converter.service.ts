import { type Colord, colord } from 'colord';
import type { ColorFormat, ColorFormatType } from './color-converter.types';
import { withDefaultOnError } from '@/utils/defaults';
import { useValidation } from '@/composable/validation';

export { removeAlphaChannelWhenOpaque, buildColorFormat, updateColorValue, initializeColorFormats };

/**
 * Removes alpha channel when it's opaque (ff)
 */
function removeAlphaChannelWhenOpaque(hexColor: string) {
  return hexColor.replace(/^(#(?:[0-9a-f]{3}){1,2})ff$/i, '$1');
}

/**
 * Builds a color format configuration object
 */
function buildColorFormat({
  label,
  parse = value => colord(value),
  format,
  placeholder,
  invalidMessage = `Invalid ${label.toLowerCase()} format.`,
  type = 'text',
}: {
  label: string;
  parse?: (value: string) => Colord;
  format: (value: Colord) => string;
  placeholder?: string;
  invalidMessage?: string;
  type?: ColorFormatType;
}) {
  const value = ref('');

  return {
    type,
    label,
    parse: (v: string) => withDefaultOnError(() => parse(v), undefined),
    format,
    placeholder,
    value,
    validation: useValidation({
      source: value,
      rules: [
        {
          message: invalidMessage,
          validator: v =>
            withDefaultOnError(() => {
              if (v === '') {
                return true;
              }

              return parse(v).isValid();
            }, false),
        },
      ],
    }),
  };
}

/**
 * Updates all color format values based on a new color value
 */
function updateColorValue(formats: Record<string, ColorFormat>, value: Colord | undefined, omitLabel?: string) {
  if (value === undefined) {
    return;
  }

  if (!value.isValid()) {
    return;
  }

  Object.entries(formats).forEach(([key, format]) => {
    if (key !== omitLabel) {
      format.value.value = format.format(value);
    }
  });
}

/**
 * Initializes all color format configurations
 */
function initializeColorFormats(t: (key: string) => string): Record<string, ColorFormat> {
  const formats: Record<string, ColorFormat> = {
    picker: buildColorFormat({
      label: t('tools.color-converter.format.colorPicker'),
      format: (v: Colord) => v.toHex(),
      type: 'color-picker',
    }),
    hex: buildColorFormat({
      label: t('tools.color-converter.format.hex'),
      format: (v: Colord) => v.toHex(),
      placeholder: t('tools.color-converter.placeholder.hex'),
    }),
    rgb: buildColorFormat({
      label: t('tools.color-converter.format.rgb'),
      format: (v: Colord) => v.toRgbString(),
      placeholder: t('tools.color-converter.placeholder.rgb'),
    }),
    hsl: buildColorFormat({
      label: t('tools.color-converter.format.hsl'),
      format: (v: Colord) => v.toHslString(),
      placeholder: t('tools.color-converter.placeholder.hsl'),
    }),
    hwb: buildColorFormat({
      label: t('tools.color-converter.format.hwb'),
      format: (v: Colord) => v.toHwbString(),
      placeholder: t('tools.color-converter.placeholder.hwb'),
    }),
    lch: buildColorFormat({
      label: t('tools.color-converter.format.lch'),
      format: (v: Colord) => v.toLchString(),
      placeholder: t('tools.color-converter.placeholder.lch'),
    }),
    cmyk: buildColorFormat({
      label: t('tools.color-converter.format.cmyk'),
      format: (v: Colord) => v.toCmykString(),
      placeholder: t('tools.color-converter.placeholder.cmyk'),
    }),
    name: buildColorFormat({
      label: t('tools.color-converter.format.name'),
      format: (v: Colord) => v.toName({ closest: true }) ?? 'Unknown',
      placeholder: t('tools.color-converter.placeholder.name'),
    }),
  };

  return formats;
}
