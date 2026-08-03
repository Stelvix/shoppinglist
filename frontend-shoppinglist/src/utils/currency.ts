export interface CurrencyMeta {
  symbol: string
  flag: string
  label: string
}

const FLAG = (code: string) => `https://flagcdn.com/w40/${code}.png`

export const CURRENCY_META: Record<string, CurrencyMeta> = {
  EUR: { symbol: '€', flag: FLAG('eu'), label: 'Euro (Zone euro)' },
  USD: { symbol: '$', flag: FLAG('us'), label: 'Dollar américain' },
  XOF: { symbol: 'FCFA', flag: FLAG('bj'), label: 'Franc CFA (UEMOA)' },
  XAF: { symbol: 'FCFA', flag: FLAG('cm'), label: 'Franc CFA (CEMAC)' },
  GHS: { symbol: 'GH₵', flag: FLAG('gh'), label: 'Cédi ghanéen' },
  NGN: { symbol: '₦', flag: FLAG('ng'), label: 'Naira nigérian' },
  GMD: { symbol: 'D', flag: FLAG('gm'), label: 'Dalasi gambien' },
  SLL: { symbol: 'Le', flag: FLAG('sl'), label: 'Leone sierra-léonais' },
  GNF: { symbol: 'FG', flag: FLAG('gn'), label: 'Franc guinéen' },
  GBP: { symbol: '£', flag: FLAG('gb'), label: 'Livre sterling' },
  JPY: { symbol: '¥', flag: FLAG('jp'), label: 'Yen japonais' },
  CAD: { symbol: 'C$', flag: FLAG('ca'), label: 'Dollar canadien' },
  AUD: { symbol: 'A$', flag: FLAG('au'), label: 'Dollar australien' },
  CHF: { symbol: 'CHF', flag: FLAG('ch'), label: 'Franc suisse' },
  CNY: { symbol: '¥', flag: FLAG('cn'), label: 'Yuan chinois' },
  MAD: { symbol: 'DH', flag: FLAG('ma'), label: 'Dirham marocain' },
  INR: { symbol: '₹', flag: FLAG('in'), label: 'Roupie indienne' },
  BRL: { symbol: 'R$', flag: FLAG('br'), label: 'Réal brésilien' },
  ZAR: { symbol: 'R', flag: FLAG('za'), label: 'Rand sud-africain' },
  TRY: { symbol: '₺', flag: FLAG('tr'), label: 'Livre turque' },
  SEK: { symbol: 'kr', flag: FLAG('se'), label: 'Couronne suédoise' },
  NOK: { symbol: 'kr', flag: FLAG('no'), label: 'Couronne norvégienne' },
  DKK: { symbol: 'kr', flag: FLAG('dk'), label: 'Couronne danoise' },
  PLN: { symbol: 'zł', flag: FLAG('pl'), label: 'Złoty polonais' },
  AED: { symbol: 'د.إ', flag: FLAG('ae'), label: 'Dirham émirati' },
  SAR: { symbol: 'ر.س', flag: FLAG('sa'), label: 'Riyal saoudien' },
  EGP: { symbol: 'E£', flag: FLAG('eg'), label: 'Livre égyptienne' },
  KES: { symbol: 'KSh', flag: FLAG('ke'), label: 'Shilling kényan' },
  THB: { symbol: '฿', flag: FLAG('th'), label: 'Baht thaïlandais' },
  KRW: { symbol: '₩', flag: FLAG('kr'), label: 'Won sud-coréen' },
  SGD: { symbol: 'S$', flag: FLAG('sg'), label: 'Dollar singapourien' },
  MXN: { symbol: 'Mex$', flag: FLAG('mx'), label: 'Peso mexicain' },
}

export function getCurrencyMeta(code: string): CurrencyMeta {
  return CURRENCY_META[code] ?? CURRENCY_META.EUR
}
