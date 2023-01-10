import { IconButton, TextField } from '@mui/material';
import { format as dateFnsFormat, formatISO, isValid, parse as dateFnsParse, parseISO } from 'date-fns';
import { ChangeEventHandler, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { FieldRenderProps } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { usePopper } from 'react-popper';
import { dateFnsLocale, Locale } from '../../globals/Translations';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface DateEditOwnProps {
  id: string;
  lang: Locale;
}

export type DateEditProps = DateEditOwnProps & FieldRenderProps<Date, HTMLElement, string>;

export const DateEdit = (props: DateEditProps) => {
  const {
    id,
    lang,
    input,
    meta: { error },
  } = props;
  const { t } = useTranslation();
  const dateFormat = t('dateFormat');

  // konvertiert zwischen ISO8601-String (für Store) und Date (für Picker)
  const formatStore = (date: Date | undefined): string => (isValid(date) ? formatISO(date as Date) : '');
  const parseStore = (str: string): Date | undefined => {
    const date: Date = parseISO(str);
    return isValid(date) ? date : undefined;
  };
  // konvertiert zwischen Date (für Picker) und DD.MM.YYYY-String (für Input)
  const formatInput = (date: Date | undefined, format: string): string =>
    isValid(date) ? dateFnsFormat(date as Date, format) : '';
  const parseInput = (str: string, format: string): Date | undefined => {
    const date: Date = dateFnsParse(str, format, new Date());
    return isValid(date) ? date : undefined;
  };

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.currentTarget.value);
    const date = parseInput(e.currentTarget.value, dateFormat);
    setPickerValue(isValid(date) ? date : undefined);
    input.onChange(formatStore(date));
  };

  const onPickerChange = (date: Date | undefined) => {
    setPickerValue(date as Date);
    if (date) {
      setInputValue(formatInput(date, dateFormat));
      closePopper();
    } else {
      setInputValue('');
    }
    input.onChange(formatStore(date));
  };

  const [pickerValue, setPickerValue] = useState<Date | undefined>(parseStore(input.value));
  const [inputValue, setInputValue] = useState<string>(formatInput(parseStore(input.value), dateFormat));
  const [isPopperOpen, setIsPopperOpen] = useState<boolean>(false);

  // Popper-Steuerung
  const popperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const popper = usePopper(popperRef.current, popperElement, { placement: 'bottom-start' });
  const openPopper = () => setIsPopperOpen(true);
  const closePopper = () => {
    setIsPopperOpen(false);
    buttonRef?.current?.focus();
  };

  return (
    <div>
      <div ref={popperRef}>
        <TextField
          id={id}
          value={inputValue}
          onChange={onInputChange}
          label={dateFormat}
          error={!!error}
          helperText={error}
        />
        <IconButton color="primary" ref={buttonRef} onClick={openPopper}>
          <CalendarMonthIcon />
        </IconButton>
      </div>
      {isPopperOpen && (
        <div
          style={popper.styles.popper}
          className="dialog-sheet"
          {...popper.attributes.popper}
          ref={setPopperElement}
          role="dialog"
        >
          <DayPicker
            showOutsideDays
            showWeekNumber
            locale={dateFnsLocale[lang]}
            mode="single"
            defaultMonth={pickerValue}
            selected={pickerValue}
            onSelect={onPickerChange}
          />
        </div>
      )}
    </div>
  );
};
