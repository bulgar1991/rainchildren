// Bank accounts shown on /donate (Asociaţia Obştească RAIN CHILDREN).
export interface BankAccount {
  currency: 'MDL' | 'USD';
  beneficiary: string;
  fiscalCode: string;
  bic: string;
  iban: string;
}

const BENEFICIARY = {
  beneficiary: 'Asociatia Obsteasca RAIN CHILDREN',
  fiscalCode: '1020620005613',
  bic: 'AGRNMD2X',
};

export const BANK_ACCOUNTS: BankAccount[] = [
  { ...BENEFICIARY, currency: 'MDL', iban: 'MD18AG000000022515867335' },
  { ...BENEFICIARY, currency: 'USD', iban: 'MD55AG000000022515867348' },
];

/** "MD18AG000000022515867335" -> "MD18 AG00 0000 0225 1586 7335" (display only). */
export function formatIban(iban: string): string {
  return iban.replace(/(.{4})(?=.)/g, '$1 ');
}
