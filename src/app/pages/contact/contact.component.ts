import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../../environments/environment';
import { TrainingMapComponent } from '@components/training-map/training-map.component';
import { TRAINING_PLACES } from '@/config/locations';
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
} from '@/config/contact';

@Component({
  selector: 'app-contact',
  imports: [
    RouterLink,
    TranslatePipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    TrainingMapComponent,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly translate = inject(TranslateService);

  protected readonly places = TRAINING_PLACES;
  protected readonly phone = CONTACT_PHONE;
  protected readonly phoneHref = CONTACT_PHONE_HREF;
  protected readonly email = CONTACT_EMAIL;
  protected readonly emailHref = CONTACT_EMAIL_HREF;

  sent = signal(false);
  sending = signal(false);
  sendError = signal(false);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  readonly subjects = [
    'contact.subjects.volunteer',
    'contact.subjects.donation',
    'contact.subjects.program',
    'contact.subjects.partnership',
    'contact.subjects.other',
  ];

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.sending.set(true);
    this.sendError.set(false);
    const v = this.form.value;
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: environment.web3formsKey,
          name: v.name ?? '',
          email: v.email ?? '',
          phone: v.phone ?? '',
          subject: this.translate.instant(v.subject ?? ''),
          message: v.message ?? '',
        }),
      });
      const data = await res.json();
      if (data.success) {
        this.sent.set(true);
      } else {
        this.sendError.set(true);
      }
    } catch {
      this.sendError.set(true);
    } finally {
      this.sending.set(false);
    }
  }
}
