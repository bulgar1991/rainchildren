import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';

export type SportScene = 'football' | 'basketball' | 'gymnastics';

/**
 * Small looping cartoon: a kid scoring a goal, a player dunking, or a gymnast's flip.
 * Pure SVG + CSS animations on `transform` / `opacity` only (no layout work), and it only
 * plays while it is on screen.
 */
@Component({
  selector: 'app-sport-scene',
  templateUrl: './sport-scene.component.html',
  styleUrl: './sport-scene.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.is-playing]': 'playing()' },
})
export class SportSceneComponent {
  readonly sport = input.required<SportScene>();

  protected readonly playing = signal(false);

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') {
        this.playing.set(true);
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => this.playing.set(entries.some((entry) => entry.isIntersecting)),
        { threshold: 0.2 },
      );
      observer.observe(host);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
