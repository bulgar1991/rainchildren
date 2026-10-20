import { BANK_ACCOUNTS, formatIban } from './donate';

// ISO 13616 check: move the first 4 characters to the end, letters -> numbers, mod 97 must be 1.
function isValidIban(iban: string): boolean {
  const digits = (iban.slice(4) + iban.slice(0, 4)).replace(/[A-Z]/g, (c) =>
    String(c.charCodeAt(0) - 55),
  );
  return [...digits].reduce((rest, digit) => (rest * 10 + Number(digit)) % 97, 0) === 1;
}

describe('BANK_ACCOUNTS', () => {
  it('should have a valid Moldovan IBAN for every account', () => {
    for (const account of BANK_ACCOUNTS) {
      expect(account.iban).toMatch(/^MD\d{2}[A-Z0-9]{20}$/);
      expect(isValidIban(account.iban)).toBe(true);
    }
  });

  it('should group the IBAN in blocks of 4 for display', () => {
    expect(formatIban('MD18AG000000022515867335')).toBe('MD18 AG00 0000 0225 1586 7335');
  });
});
