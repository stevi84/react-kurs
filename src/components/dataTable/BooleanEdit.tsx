import { Checkbox } from '@mui/material';
import { FieldRenderProps } from 'react-final-form';

interface BooleanEditOwnProps {
  id: string;
}

export type BooleanEditProps = BooleanEditOwnProps & FieldRenderProps<boolean, HTMLElement, boolean>;

export const BooleanEdit = (props: BooleanEditProps) => {
  const { id, input } = props;
  return <Checkbox id={id} checked={input.checked} onChange={input.onChange} />;
};
