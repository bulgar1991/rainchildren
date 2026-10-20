import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { BANK_ACCOUNTS, BankAccount, formatIban } from '@/config/donate';

type Field = 'beneficiary' | 'fiscalCode' | 'bic' | 'iban';

@Component({
  selector: 'app-donate',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DonateComponent {
  private readonly translate = inject(TranslateService);
  private resetTimer?: ReturnType<typeof setTimeout>;

  protected readonly accounts = BANK_ACCOUNTS;
  protected readonly fields: Field[] = ['beneficiary', 'fiscalCode', 'bic', 'iban'];
  protected readonly formatIban = formatIban;

  // Id of the value that was just copied ('MDL-iban', 'USD-all', ...), for the "Copied!" state.
  protected readonly copied = signal<string | null>(null);

  protected display(account: BankAccount, field: Field): string {
    return field === 'iban' ? formatIban(account.iban) : account[field];
  }

  protected copyField(account: BankAccount, field: Field): void {
    this.copy(account[field], `${account.currency}-${field}`);
  }

  protected copyAll(account: BankAccount): void {
    const label = (field: string) => this.translate.instant('donate.fields.' + field);
    const text = [
      ...this.fields.map((field) => `${label(field)}: ${account[field]}`),
      `${label('currency')}: ${account.currency}`,
    ].join('\n');
    this.copy(text, `${account.currency}-all`);
  }

  private async copy(text: string, id: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return; // Clipboard not available (e.g. not a secure context) - the text stays selectable.
    }
    this.copied.set(id);
    clearTimeout(this.resetTimer);
    this.resetTimer = setTimeout(() => this.copied.set(null), 2000);
  }
}
