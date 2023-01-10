import { TextField } from '@mui/material';
import { useState } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { formatNumber, parseNumber } from '../../globals/Formatters';
import { Locale } from '../../globals/Translations';

interface NumberEditOwnProps {
  id: string;
  lang: Locale;
  placeholder?: string;
}

export type NumberEditProps = NumberEditOwnProps & FieldRenderProps<string, HTMLElement, number>;

export const NumberEdit = (props: NumberEditProps) => {
  const {
    id,
    lang,
    placeholder = '',
    input,
    meta: { error },
  } = props;
  const [stateValue, setStateValue] = useState<string>(formatNumber(input.value, lang));

  // konvertiert zwischen number (für Store) und string (für Komponente)
  const format = (value: number): string =>
    typeof value === 'string' ? value : isNaN(value) ? stateValue : formatNumber(value, lang);
  const parse = (value: string): number => parseNumber(value, lang);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStateValue(event.target.value);
    input.onChange(parse(event.target.value));
  };

  return (
    <TextField
      id={id}
      value={format(input.value)}
      onChange={onChange}
      label={placeholder}
      error={!!error}
      helperText={error}
    />
  );
};
