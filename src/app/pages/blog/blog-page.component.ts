import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { BlogComponent } from '../../components/blog/blog.component';

@Component({
  selector: 'app-blog-page',
  imports: [RouterLink, TranslatePipe, BlogComponent],
  template: `
    <section class="page-hero">
      <div class="page-hero__inner max-w-screen-3xl mx-auto lg:px-desktop px-mobile">
        <nav class="page-hero__breadcrumb">
          <a routerLink="/" class="page-hero__bc-link">{{ 'header.nav.home' | translate }}</a>
          <span>/</span>
          <span>{{ 'blog.title' | translate }}</span>
        </nav>
        <h1 class="page-hero__title">{{ 'blog.title' | translate }}</h1>
        <p class="page-hero__sub">{{ 'blog.subtitle' | translate }}</p>
      </div>
    </section>
    <app-blog [showViewAll]="false" />
  `,
  styleUrl: './blog-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPageComponent {}
