import { formatNumber } from '../../globals/Formatters';
import { Locale } from '../../globals/Translations';

interface NumberReadOwnProps {
  id: string;
  value: number;
  lang: Locale;
}

export const NumberRead = (props: NumberReadOwnProps) => {
  const { id, value, lang } = props;
  return <div id={id}>{formatNumber(value, lang)}</div>;
};
