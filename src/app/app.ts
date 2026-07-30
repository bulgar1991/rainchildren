import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { PreloaderService } from './services/preloader.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, PreloaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly router = inject(Router);
  private readonly preloader = inject(PreloaderService);

  ngOnInit(): void {
    setTimeout(() => this.preloader.pageLoading.set(false), 800);

    this.router.events
      .pipe(filter(e => e instanceof NavigationStart || e instanceof NavigationEnd || e instanceof NavigationError))
      .subscribe(e => {
        if (e instanceof NavigationStart) {
          this.preloader.routeLoading.set(true);
        } else {
          setTimeout(() => this.preloader.routeLoading.set(false), 300);
        }
      });
  }
}
