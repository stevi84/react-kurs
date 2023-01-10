import { FieldValidator } from 'final-form';
import { isEmptyString, isInteger, isIsoDate, isNumber } from './Validations';
import { i18n } from '../i18n';

export const formIsNotEmptyString: FieldValidator<string> = (value: string): string | null | undefined =>
  isEmptyString(value) ? i18n.t('error_empty') : undefined;

export const formIsIsoDate: FieldValidator<string> = (value: string): string | null | undefined =>
  isIsoDate(value) ? undefined : i18n.t('error_date');

export const formIsInteger: FieldValidator<number> = (value: number): string | null | undefined =>
  isInteger(value) ? undefined : i18n.t('error_integer');

export const formIsNumber: FieldValidator<number> = (value: number): string | null | undefined =>
  isNumber(value) ? undefined : i18n.t('error_number');
