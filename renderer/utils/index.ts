export * from './types';

export const initialsFun = (str) =>
  str
    .split(' ')
    .map((n) => n[0])
    .join('.');
