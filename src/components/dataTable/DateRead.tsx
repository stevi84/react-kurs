import { formatDate } from '../../globals/Formatters';
import { Locale } from '../../globals/Translations';

interface DateReadOwnProps {
  id: string;
  value: string;
  lang: Locale;
}

export const DateRead = (props: DateReadOwnProps) => {
  const { id, value, lang } = props;
  return <div id={id}>{formatDate(value, lang)}</div>;
};
