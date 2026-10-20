import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Program } from '@models/program.model';
import { SportSceneComponent } from '@components/sport-scene/sport-scene.component';
import { SportVideoComponent } from '@components/sport-video/sport-video.component';

@Component({
  selector: 'app-program-detail',
  imports: [RouterLink, TranslatePipe, SportSceneComponent, SportVideoComponent],
  templateUrl: './program-detail.component.html',
  styleUrl: './program-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgramDetailComponent {
  // Set by itemSeoResolver (route `resolve: { program }`).
  readonly program = input.required<Program>();

  protected readonly activities = ['a1', 'a2', 'a3'];
}
