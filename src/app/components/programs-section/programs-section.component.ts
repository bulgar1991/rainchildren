import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PROGRAMS } from '@/config/programs';

@Component({
  selector: 'app-programs-section',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './programs-section.component.html',
  styleUrl: './programs-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgramsSectionComponent {
  readonly programs = PROGRAMS;
}
