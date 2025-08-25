import i18n from 'i18next';

type Unit = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';

const DIVISORS: Array<[Unit, number]> = [
  ['year', 365 * 24 * 60 * 60],
  ['month', 30 * 24 * 60 * 60],
  ['week', 7 * 24 * 60 * 60],
  ['day', 24 * 60 * 60],
  ['hour', 60 * 60],
  ['minute', 60],
  ['second', 1],
];

export function timeAgo(
  iso?: string,
  now: number = Date.now(),
): string | undefined {
  if (!iso) return undefined;
  const ts = new Date(iso).getTime();
  if (Number.isNaN(ts)) return undefined;

  const diffSeconds = Math.round((now - ts) / 1000); // negative => future
  const abs = Math.abs(diffSeconds);

  // “just now” guard (keeps UIs from flashing “0 seconds ago”)
  if (abs < 5) return i18n.t('common.relative.just_now');

  const [unit, secPerUnit] = DIVISORS.find(([, s]) => abs >= s) ?? [
    'second',
    1,
  ];
  const count = Math.max(1, Math.floor(abs / secPerUnit));
  const scope = diffSeconds >= 0 ? 'past' : 'future';

  // Prefer native Intl for perfect grammar where available
  if (typeof Intl !== 'undefined' && 'RelativeTimeFormat' in Intl) {
    const rtf = new Intl.RelativeTimeFormat(i18n.language || 'en', {
      numeric: 'auto',
    });
    // RTF expects negative for past (“… ago”), positive for future (“in …”)
    return rtf.format(diffSeconds >= 0 ? -count : count, unit);
  }

  // i18n fallback with pluralization
  // Uses keys like: common.relative.past.week_one / _other
  return i18n.t(`common.relative.${scope}.${unit}`, {count});
}
