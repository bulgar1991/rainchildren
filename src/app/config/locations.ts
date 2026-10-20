// Where the trainings take place - shown in the FAQ ("Unde au loc activităţile?") and on the
// map on /contact.
// `nameKey` is a translation key under "faq.places".
export interface TrainingPlace {
  id: string;
  nameKey: string;
  // Icon-font class shown on the map pin (see config/programs.ts).
  icon: string;
  // Pin colour - the program colour from config/programs.ts.
  color: string;
  // Pin position (from the Google Maps link).
  lat: number;
  lng: number;
  mapUrl: string;
}

export const TRAINING_PLACES: TrainingPlace[] = [
  {
    id: 'basketball',
    nameKey: 'faq.places.basketball',
    icon: 'icon-basketball',
    color: '#fb923c',
    lat: 47.0463918,
    lng: 28.7850581,
    mapUrl:
      'https://www.google.com/maps/place/La+Izvor+-+Teren+polivalent+basketball/@47.0463223,28.7864497,237m/data=!3m1!1e3!4m6!3m5!1s0x40c97d000d3558cf:0x915d54b5eb76da9!8m2!3d47.0463918!4d28.7850581!16s%2Fg%2F11yjlmfbh_',
  },
  {
    id: 'football',
    nameKey: 'faq.places.football',
    icon: 'icon-football',
    color: '#34d399',
    lat: 47.0466093,
    lng: 28.7853552,
    mapUrl:
      'https://www.google.com/maps/place/Teren+de+fotbal.+FMF/@47.046392,28.7839396,272m/data=!3m1!1e3!4m6!3m5!1s0x40c97da0cbd0a19f:0x9041075039a5c3b2!8m2!3d47.0466093!4d28.7853552!16s%2Fg%2F11s56426n6',
  },
];
