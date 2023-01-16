import { Checkbox } from '@mui/material';

interface BooleanReadOwnProps {
  id: string;
  value: boolean;
}

export const BooleanRead = (props: BooleanReadOwnProps) => {
  const { id, value } = props;
  return <Checkbox id={id} checked={value} disabled={true} />;
};
