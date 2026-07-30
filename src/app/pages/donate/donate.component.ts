import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-donate',
  imports: [TranslatePipe],
  template: `
    <div class="page-stub">
      <h1>{{ 'header.donate' | translate }}</h1>
    </div>
  `,
  styles: [`.page-stub { min-height: 60vh; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 700; color: #1a2540; }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DonateComponent {}
