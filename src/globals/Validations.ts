import { isValid, parseISO } from 'date-fns';

export const isEmptyString = (value: string): boolean => !(value && value.trim());

export const isIsoDate = (value: string = ''): boolean => isValid(parseISO(value));

export const isInteger = (value: number): boolean => Number.isInteger(value);

export const isNumber = (value: number): boolean => !isNaN(value);
