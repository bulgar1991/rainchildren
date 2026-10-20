import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';

export interface SportVideo {
  // Short muted loop, e.g. 'assets/videos/football.mp4' (H.264 720p, a few seconds).
  src: string;
  // First frame as an image - shown until the video loads, and instead of it with reduced motion.
  poster: string;
}

/**
 * A short real clip from training (a goal, a dunk), playing muted in a loop.
 * The video file is only downloaded when it scrolls into view and pauses when it leaves it, so
 * it doesn't slow down the page.
 */
@Component({
  selector: 'app-sport-video',
  template: `<video
    #video
    class="sport-video"
    [poster]="clip().poster"
    [attr.aria-label]="label()"
    muted
    loop
    playsinline
    disablepictureinpicture
    preload="none"
  ></video>`,
  styles: `
    :host {
      display: block;
    }

    .sport-video {
      display: block;
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      border-radius: 16px;
      background: #e8edf5;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportVideoComponent {
  readonly clip = input.required<SportVideo>();
  readonly label = input('');

  private readonly element = viewChild.required<ElementRef<HTMLVideoElement>>('video');
  private readonly loaded = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const video = this.element().nativeElement;
      // Angular sets the `muted` attribute, but autoplay needs the property too.
      video.muted = true;

      const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion || typeof IntersectionObserver === 'undefined') return; // poster only

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (!this.loaded()) {
              video.src = this.clip().src;
              this.loaded.set(true);
            }
            video.play().catch(() => {
              // Autoplay refused (e.g. data saver) - the poster stays visible.
            });
          } else {
            video.pause();
          }
        },
        { threshold: 0.25 },
      );
      observer.observe(video);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
