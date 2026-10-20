import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PreloaderService } from '../../services/preloader.service';

@Component({
  selector: 'app-preloader',
  imports: [],
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreloaderComponent {
  readonly preloader = inject(PreloaderService);
}
