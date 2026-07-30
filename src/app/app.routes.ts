import { Routes } from '@angular/router';
import { seoResolver } from './utils/seo.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    resolve: { seo: seoResolver },
    data: { seo: { title: 'seo.home.title', metaTags: [{ name: 'description', content: 'seo.home.description' }, { property: 'og:title', content: 'seo.home.title' }, { property: 'og:description', content: 'seo.home.description' }] } },
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    resolve: { seo: seoResolver },
    data: { seo: { title: 'seo.about.title', metaTags: [{ name: 'description', content: 'seo.about.description' }, { property: 'og:title', content: 'seo.about.title' }, { property: 'og:description', content: 'seo.about.description' }] } },
  },
  {
    path: 'programs',
    loadComponent: () => import('./pages/programs/programs.component').then(m => m.ProgramsComponent),
    resolve: { seo: seoResolver },
    data: { seo: { title: 'seo.programs.title', metaTags: [{ name: 'description', content: 'seo.programs.description' }, { property: 'og:title', content: 'seo.programs.title' }, { property: 'og:description', content: 'seo.programs.description' }] } },
  },
  {
    path: 'events',
    loadComponent: () => import('./pages/events/events.component').then(m => m.EventsComponent),
    resolve: { seo: seoResolver },
    data: { seo: { title: 'seo.events.title', metaTags: [{ name: 'description', content: 'seo.events.description' }, { property: 'og:title', content: 'seo.events.title' }, { property: 'og:description', content: 'seo.events.description' }] } },
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    resolve: { seo: seoResolver },
    data: { seo: { title: 'seo.contact.title', metaTags: [{ name: 'description', content: 'seo.contact.description' }, { property: 'og:title', content: 'seo.contact.title' }, { property: 'og:description', content: 'seo.contact.description' }] } },
  },
  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery/gallery-page.component').then(m => m.GalleryPageComponent),
    resolve: { seo: seoResolver },
    data: { seo: { title: 'seo.gallery.title', metaTags: [{ name: 'description', content: 'seo.gallery.description' }] } },
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog-page.component').then(m => m.BlogPageComponent),
    resolve: { seo: seoResolver },
    data: { seo: { title: 'seo.blog.title', metaTags: [{ name: 'description', content: 'seo.blog.description' }] } },
  },
  {
    path: '404',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
  { path: '**', redirectTo: '404' },
];
