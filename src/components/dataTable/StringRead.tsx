interface StringReadOwnProps {
  id: string;
  value: string;
}

export const StringRead = (props: StringReadOwnProps) => {
  const { id, value } = props;
  return <div id={id}>{value}</div>;
};
