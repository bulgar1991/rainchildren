import { Routes } from '@angular/router';
import { findProgram } from './config/programs';
import { itemExistsGuard } from './guards/item-exists.guard';
import { itemSeoResolver } from './resolvers/item-seo.resolver';
import { seoResolver } from './resolvers/seo.resolver';

// `data.seo` holds translation keys (under "seo" in assets/i18n/*.json); seoResolver turns them
// into the page title, description, canonical link and social-media tags.
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    resolve: { seo: seoResolver },
    data: {
      seo: {
        title: 'seo.home.title',
        description: 'seo.home.description',
      },
    },
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
    resolve: { seo: seoResolver },
    data: {
      seo: {
        title: 'seo.about.title',
        description: 'seo.about.description',
      },
    },
  },
  {
    path: 'programs',
    loadComponent: () =>
      import('./pages/programs/programs.component').then((m) => m.ProgramsComponent),
    resolve: { seo: seoResolver },
    data: {
      seo: {
        title: 'seo.programs.title',
        description: 'seo.programs.description',
      },
    },
  },
  {
    path: 'programs/:id',
    canMatch: [itemExistsGuard(findProgram)],
    loadComponent: () =>
      import('./pages/program-detail/program-detail.component').then(
        (m) => m.ProgramDetailComponent,
      ),
    // Bound to the component's `program` input (withComponentInputBinding in app.config.ts).
    resolve: { program: itemSeoResolver(findProgram, '.desc') },
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then((m) => m.ContactComponent),
    resolve: { seo: seoResolver },
    data: {
      seo: {
        title: 'seo.contact.title',
        description: 'seo.contact.description',
      },
    },
  },
  {
    path: 'donate',
    loadComponent: () => import('./pages/donate/donate.component').then((m) => m.DonateComponent),
    resolve: { seo: seoResolver },
    data: {
      seo: {
        title: 'seo.donate.title',
        description: 'seo.donate.description',
      },
    },
  },
  {
    path: 'gallery',
    loadComponent: () =>
      import('./pages/gallery/gallery-page.component').then((m) => m.GalleryPageComponent),
    resolve: { seo: seoResolver },
    data: {
      seo: {
        title: 'seo.gallery.title',
        description: 'seo.gallery.description',
      },
    },
  },
  {
    path: '404',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
    resolve: { seo: seoResolver },
    data: {
      seo: {
        title: 'seo.notFound.title',
        description: 'seo.notFound.description',
        metaTags: [{ name: 'robots', content: 'noindex, follow' }],
      },
    },
  },
  { path: '**', redirectTo: '404' },
];
