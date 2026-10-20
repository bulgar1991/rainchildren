import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PreloaderService {
  readonly pageLoading = signal(true);
  readonly routeLoading = signal(false);
}
