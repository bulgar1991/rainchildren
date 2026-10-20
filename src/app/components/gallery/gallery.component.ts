import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  inject,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

// Number of photos in assets/images/gallery (gallery-1.jpg ... gallery-<n>.jpg).
const GALLERY_SIZE = 35;

@Component({
  selector: 'app-gallery',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
  private readonly document = inject(DOCUMENT);

  @Input() showHeader = true;
  @Input() showViewAll = true;
  @Input() limit: number | null = null;

  activeIndex = signal<number | null>(null);

  readonly images: GalleryImage[] = Array.from({ length: GALLERY_SIZE }, (_, i) => ({
    id: i + 1,
    src: `assets/images/gallery/gallery-${i + 1}.jpg`,
    alt: 'gallery.alt',
  }));

  get visible(): GalleryImage[] {
    return this.limit !== null ? this.images.slice(0, this.limit) : this.images;
  }

  get active(): GalleryImage | null {
    const i = this.activeIndex();
    return i !== null ? this.visible[i] : null;
  }

  open(index: number): void {
    this.activeIndex.set(index);
    this.document.body.classList.add('lightbox-open');
  }

  close(): void {
    this.activeIndex.set(null);
    this.document.body.classList.remove('lightbox-open');
  }

  prev(): void {
    const i = this.activeIndex();
    if (i === null) return;
    this.activeIndex.set((i - 1 + this.visible.length) % this.visible.length);
  }

  next(): void {
    const i = this.activeIndex();
    if (i === null) return;
    this.activeIndex.set((i + 1) % this.visible.length);
  }

  @HostListener('window:keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    if (this.activeIndex() === null) return;
    if (e.key === 'Escape') this.close();
    if (e.key === 'ArrowLeft') this.prev();
    if (e.key === 'ArrowRight') this.next();
  }
}
