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

@Component({
  selector: 'app-gallery',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
  private readonly document = inject(DOCUMENT);

  @Input() showHeader  = true;
  @Input() showViewAll = true;
  @Input() limit: number | null = null;

  activeIndex = signal<number | null>(null);

  readonly images: GalleryImage[] = [
    { id:  1, src: 'assets/images/gallery-1.jpg',  alt: 'gallery.alt' },
    { id:  2, src: 'assets/images/gallery-2.jpg',  alt: 'gallery.alt' },
    { id:  3, src: 'assets/images/gallery-3.jpg',  alt: 'gallery.alt' },
    { id:  4, src: 'assets/images/gallery-4.jpg',  alt: 'gallery.alt' },
    { id:  5, src: 'assets/images/gallery-5.jpg',  alt: 'gallery.alt' },
    { id:  6, src: 'assets/images/gallery-6.jpg',  alt: 'gallery.alt' },
    { id:  7, src: 'assets/images/gallery-7.jpg',  alt: 'gallery.alt' },
    { id:  8, src: 'assets/images/gallery-8.jpg',  alt: 'gallery.alt' },
    { id:  9, src: 'assets/images/gallery-9.jpg',  alt: 'gallery.alt' },
    { id: 10, src: 'assets/images/gallery-10.jpg', alt: 'gallery.alt' },
    { id: 11, src: 'assets/images/gallery-11.jpg', alt: 'gallery.alt' },
    { id: 12, src: 'assets/images/gallery-12.jpg', alt: 'gallery.alt' },
  ];

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
    if (e.key === 'Escape')     this.close();
    if (e.key === 'ArrowLeft')  this.prev();
    if (e.key === 'ArrowRight') this.next();
  }
}
