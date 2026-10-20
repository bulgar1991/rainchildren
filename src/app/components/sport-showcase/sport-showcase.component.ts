import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SportSceneComponent } from '@components/sport-scene/sport-scene.component';
import { SportVideoComponent } from '@components/sport-video/sport-video.component';
import { PROGRAMS } from '@/config/programs';

// Home page: a real clip (or, until there is one, the drawn animation) per sport, each linking to
// its program.
@Component({
  selector: 'app-sport-showcase',
  imports: [RouterLink, TranslatePipe, SportSceneComponent, SportVideoComponent],
  templateUrl: './sport-showcase.component.html',
  styleUrl: './sport-showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportShowcaseComponent {
  readonly programs = PROGRAMS.filter((program) => program.scene);
}
