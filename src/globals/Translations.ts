import { Locale as DateFnsLocale } from 'date-fns';
import { de, enUS } from 'date-fns/locale';

export enum Locale {
  de = 'de',
  en = 'en',
}

export const defaultLocale: Locale = Locale.de;

type Translations<T = any> = { [K in Locale]: T };

export const translations: Translations<{ translation: any }> = {
  de: {
    translation: {
      cancel: 'Abbrechen',
      completed: 'Abgeschlossen',
      create: 'Neu',
      dateFormat: 'dd.MM.yyyy',
      dateTimeFormat: 'dd.MM.yyyy HH:mm:ss',
      de: 'Deutsch',
      delete: 'Löschen',
      description: 'Beschreibung',
      dialog_delete_text: 'Eintrag löschen?',
      dueDate: 'Fälligkeitsdatum',
      edit: 'Bearbeiten',
      en: 'Englisch',
      error_date: 'Kein gültiges Datum.',
      error_empty: 'Darf nicht leer sein.',
      error_integer: 'Keine ganze Zahl.',
      error_mail: 'Keine gültige Email-Adresse.',
      error_number: 'Keine Zahl.',
      error_postcode: 'Keine gültige Postleitzahl.',
      error_telephone: 'Keine gültige Telefonnummer.',
      id: 'ID',
      language: 'Sprache',
      message_create: 'neu erstellt.',
      message_delete: 'gelöscht.',
      message_read: 'gelesen.',
      message_update: 'aktualisiert.',
      owner: 'Ersteller',
      reading: 'Laden',
      reload: 'Neu Laden',
      save: 'Speichern',
      submitting: 'Schreiben',
      todo: 'Todo',
      tooltip_action_inactive: 'Andere Aktionen abschließen.',
      tooltip_invalid: 'Einige Felder enthalten ungültige Daten.',
      tooltip_no_changes: 'Keine Änderungen vorhanden.',
      tooltip_reading: 'Es werden gerade Daten gelesen.',
      tooltip_submitting: 'Es wird gerade gespeichert.',
      was: 'wurde',
      wasNot: 'wurde nicht erfolgreich',
    },
  },
  en: {
    translation: {
      cancel: 'Cancel',
      completed: 'Completed',
      create: 'Create',
      dateFormat: 'MM/dd/yyyy',
      dateTimeFormat: 'MM/dd/yyyy hh:mm:ss a',
      de: 'German',
      delete: 'Delete',
      description: 'Description',
      dialog_delete_text: 'Delete entry?',
      dueDate: 'Due date',
      edit: 'Edit',
      en: 'English',
      error_date: 'No valid date.',
      error_empty: 'Must not be empty.',
      error_integer: 'No whole number.',
      error_mail: 'No valid email address.',
      error_number: 'No number.',
      error_postcode: 'No valid post code.',
      error_telephone: 'No valid telephone number.',
      id: 'ID',
      language: 'Language',
      message_create: 'created.',
      message_delete: 'deleted.',
      message_read: 'read.',
      message_update: 'updated.',
      owner: 'Owner',
      reading: 'Reading',
      reload: 'Reload',
      save: 'Save',
      submitting: 'Submitting',
      todo: 'Todo',
      tooltip_action_inactive: 'Finish other actions.',
      tooltip_invalid: 'Some fields contain invalid data.',
      tooltip_no_changes: 'No changes present.',
      tooltip_reading: 'Reading data.',
      tooltip_submitting: 'Submitting data.',
      was: 'was',
      wasNot: 'could not be',
    },
  },
};

export const t = (key: string, lang: Locale = defaultLocale, placeholders: any = {}): string => {
  let trans: string = (translations[lang] && translations[lang].translation[key]) || key;
  for (const phKey in placeholders) {
    if (placeholders.hasOwnProperty(phKey)) {
      trans = trans.replace(new RegExp(`{${phKey}}`, 'g'), placeholders[phKey]);
    }
  }
  return trans;
};

export const createMessage = (
  action: 'create' | 'read' | 'update' | 'delete',
  element: string,
  success: boolean,
): string => {
  const elementString: string = t(element);
  const successString: string = success ? t('was') : t('wasNot');
  const actionString: string = t(`message_${action}`);
  return `${elementString} ${successString} ${actionString}`;
};

export const dateFnsLocale: Translations<DateFnsLocale> = {
  de: de,
  en: enUS,
};

const numberStringRegexp: Translations<RegExp> = {
  de: /^[+-]?\d+(,\d+)?$/,
  en: /^[+-]?\d+(\.\d+)?$/,
};

const numberStringConvertFct: Translations<(value: string) => string> = {
  de: (value: string): string => value.replace(/,/g, '.'),
  en: (value: string): string => value,
};

export const numberStringValidate = (value: string, lang: Locale): boolean => numberStringRegexp[lang].test(value);

export const numberStringConvert = (value: string, lang: Locale): string => numberStringConvertFct[lang](value);
