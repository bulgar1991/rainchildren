import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PROGRAMS } from '@/config/programs';
import { VolunteerBannerComponent } from '../../components/volunteer-banner/volunteer-banner.component';

@Component({
  selector: 'app-programs',
  imports: [RouterLink, TranslatePipe, VolunteerBannerComponent],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgramsComponent {
  readonly programs = PROGRAMS;

  protected readonly activities = ['a1', 'a2', 'a3'];
}
