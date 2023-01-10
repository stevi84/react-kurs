import { TextField } from '@mui/material';
import { FieldRenderProps } from 'react-final-form';

interface StringEditOwnProps {
  id: string;
  placeholder?: string;
}

export type StringEditProps = StringEditOwnProps & FieldRenderProps<string, HTMLElement, string>;

export const StringEdit = (props: StringEditProps) => {
  const {
    id,
    placeholder = '',
    input,
    meta: { error },
  } = props;
  return (
    <TextField
      id={id}
      value={input.value}
      onChange={input.onChange}
      label={placeholder}
      error={!!error}
      helperText={error}
    />
  );
};
