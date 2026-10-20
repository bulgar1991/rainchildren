import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-volunteer-banner',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './volunteer-banner.component.html',
  styleUrl: './volunteer-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VolunteerBannerComponent {}
