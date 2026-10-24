import { Program } from '@models/program.model';

// Programs shown on /programs, /programs/:id, the home page slider and the footer. Texts live in
// assets/i18n/*.json under "programs.<name>".
// Images: basketball is from the Rain Children basketball training (wfolio, IMG_2030); football
// and gymnastics are from Unsplash (free Unsplash License): Quilia (AvcBDbR-LWc) and
// Gabriel Rodrigues (4Cc0rs9pWI8) - https://unsplash.com/photos/<id>.
// Banners (assets/images/programs/): basketball is the Rain Children shooting drill (home slider
// banner-3); football and gymnastics are wide crops of the photos above.
export const PROGRAMS: Program[] = [
  {
    id: 'fotbal',
    icon: 'icon-football',
    bannerIcon: 'icon-futbol-solid-full',
    color: '#34d399',
    image: 'assets/images/prog-football.webp',
    shareImage: 'assets/images/prog-football.jpg',
    banner: 'assets/images/programs/football-banner.webp',
    key: 'programs.football',
    seo: 'seo.programs.football',
    scene: 'football',
  },
  {
    id: 'baschet',
    icon: 'icon-basketball',
    bannerIcon: 'icon-basketball-solid-full',
    color: '#fb923c',
    image: 'assets/images/prog-basketball.webp',
    shareImage: 'assets/images/prog-basketball.jpg',
    banner: 'assets/images/programs/basketball-banner.webp',
    key: 'programs.basketball',
    seo: 'seo.programs.basketball',
    scene: 'basketball',
  },
  {
    id: 'gimnastica',
    icon: 'icon-gymnastics',
    bannerIcon: 'icon-children-solid-full',
    color: '#a78bfa',
    image: 'assets/images/prog-gymnastics.webp',
    shareImage: 'assets/images/prog-gymnastics.jpg',
    banner: 'assets/images/programs/gymnastics-banner.webp',
    key: 'programs.gymnastics',
    seo: 'seo.programs.gymnastics',
    scene: 'gymnastics',
  },
];

export function findProgram(id: string | null | undefined): Program | undefined {
  return PROGRAMS.find((program) => program.id === id);
}
