import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import type { Map as LeafletMap, Marker } from 'leaflet';
import { TRAINING_PLACES, TrainingPlace } from '@/config/locations';

/**
 * Map with a pin for every training place (config/locations.ts), on OpenStreetMap tiles.
 * Leaflet is only downloaded when the map scrolls into view, so it doesn't slow down the page.
 */
@Component({
  selector: 'app-training-map',
  imports: [TranslatePipe],
  template: `<div
    #map
    class="training-map"
    role="region"
    [attr.aria-label]="'contact.map.label' | translate"
  ></div>`,
  styleUrl: './training-map.component.scss',
  // Leaflet's own CSS (imported in the .scss) must reach the elements Leaflet creates.
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingMapComponent {
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly container = viewChild.required<ElementRef<HTMLElement>>('map');

  private map?: LeafletMap;
  private markers: { place: TrainingPlace; marker: Marker }[] = [];

  constructor() {
    afterNextRender(() => {
      const element = this.container().nativeElement;
      if (typeof IntersectionObserver === 'undefined') {
        void this.create(element);
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer.disconnect();
            void this.create(element);
          }
        },
        { rootMargin: '200px' },
      );
      observer.observe(element);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });

    this.destroyRef.onDestroy(() => this.map?.remove());

    // Popup texts follow the site language.
    this.translate.onLangChange
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.markers.forEach(({ place, marker }) => this.bindPopup(place, marker)));
  }

  private async create(element: HTMLElement): Promise<void> {
    const L = await import('leaflet');
    if (this.map) return;

    const map = L.map(element, {
      // Don't hijack page scrolling: zoom with the buttons, drag with one finger on desktop only.
      scrollWheelZoom: false,
      dragging: !L.Browser.mobile,
      zoomControl: true,
    });
    this.map = map;

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    this.markers = TRAINING_PLACES.map((place) => {
      const marker = L.marker([place.lat, place.lng], {
        icon: L.divIcon({
          className: 'training-map__pin',
          html: `<span class="training-map__pin-body" style="background:${place.color}"><i class="${place.icon}" aria-hidden="true"></i></span>`,
          iconSize: [44, 52],
          iconAnchor: [22, 52],
          popupAnchor: [0, -48],
        }),
        title: this.translate.instant(place.nameKey),
        alt: this.translate.instant(place.nameKey),
      }).addTo(map);
      this.bindPopup(place, marker);
      return { place, marker };
    });

    map.fitBounds(L.latLngBounds(TRAINING_PLACES.map((place) => [place.lat, place.lng])), {
      padding: [60, 60],
      maxZoom: 18,
    });
  }

  private bindPopup(place: TrainingPlace, marker: Marker): void {
    const popup = document.createElement('div');
    popup.className = 'training-map__popup';

    const name = document.createElement('strong');
    name.textContent = this.translate.instant(place.nameKey);

    const link = document.createElement('a');
    link.href = place.mapUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = this.translate.instant('contact.map.directions');

    popup.append(name, link);
    marker.unbindPopup().bindPopup(popup);
  }
}
