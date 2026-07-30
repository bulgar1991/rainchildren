import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

interface BlogPost {
  id: number;
  image: string;
  titleKey: string;
  excerptKey: string;
  slug: string;
}

@Component({
  selector: 'app-blog',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent {
  @Input() showViewAll = true;

  readonly posts: BlogPost[] = [
    { id: 1, image: 'assets/images/blog-1.jpg', titleKey: 'blog.posts.1.title', excerptKey: 'blog.posts.1.excerpt', slug: 'cum-ajutam-copiii-cu-autism' },
    { id: 2, image: 'assets/images/blog-2.jpg', titleKey: 'blog.posts.2.title', excerptKey: 'blog.posts.2.excerpt', slug: 'terapia-prin-arta' },
    { id: 3, image: 'assets/images/blog-3.jpg', titleKey: 'blog.posts.3.title', excerptKey: 'blog.posts.3.excerpt', slug: 'voluntarii-nostri' },
    { id: 4, image: 'assets/images/blog-4.jpg', titleKey: 'blog.posts.4.title', excerptKey: 'blog.posts.4.excerpt', slug: 'sindromul-down-integrare' },
    { id: 5, image: 'assets/images/blog-5.jpg', titleKey: 'blog.posts.5.title', excerptKey: 'blog.posts.5.excerpt', slug: 'eveniment-caritabil-2025' },
    { id: 6, image: 'assets/images/blog-6.jpg', titleKey: 'blog.posts.6.title', excerptKey: 'blog.posts.6.excerpt', slug: 'parinti-si-specialisti' },
  ];
}
