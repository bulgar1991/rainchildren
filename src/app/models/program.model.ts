import type { SportScene } from '@components/sport-scene/sport-scene.component';
import type { SportVideo } from '@components/sport-video/sport-video.component';

export interface Program {
  // URL slug: /programs/<id>.
  id: string;
  // Icon-font class from assets/fonts/icons.css (fantasticon: assets/icons/font-icons/<name>.svg
  // -> icon-<name>, rebuilt with `npm run generate-fonts`).
  icon: string;
  // Solid icon-font class for the badge in the /programs/:id banner.
  bannerIcon: string;
  color: string;
  image: string;
  // Wide photo for the banner at the top of /programs/:id.
  banner: string;
  // Translation key prefix, e.g. 'programs.football' -> '.title', '.desc', '.a1'...'.a3' in
  // assets/i18n/*.json.
  key: string;
  // Animated scene shown on the program page (football / basketball / gymnastics).
  scene?: SportScene;
  // Real clip from training; shown instead of the drawn `scene` once it is set.
  video?: SportVideo;
}
