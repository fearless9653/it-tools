import type { BaseConversionParams } from './base-converter.types';

export function convertBase({ value, fromBase, toBase }: BaseConversionParams) {
  const range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split('');
  const fromRange = range.slice(0, fromBase);
  const toRange = range.slice(0, toBase);
  let decValue = value
    .split('')
    .reverse()
    .reduce((carry: bigint, digit: string, index: number) => {
      if (!fromRange.includes(digit)) {
        throw new Error(`Invalid digit "${digit}" for base ${fromBase}.`);
      }
      return (carry += BigInt(fromRange.indexOf(digit)) * BigInt(fromBase) ** BigInt(index));
    }, 0n);
  let newValue = '';
  while (decValue > 0) {
    newValue = toRange[Number(decValue % BigInt(toBase))] + newValue;
    decValue = (decValue - (decValue % BigInt(toBase))) / BigInt(toBase);
  }
  return newValue || '0';
}
