import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, TranslatePipe],
  template: `
    <div class="not-found">
      <span class="not-found__code">404</span>
      <h1 class="not-found__title">{{ 'notFound.title' | translate }}</h1>
      <p class="not-found__desc">{{ 'notFound.desc' | translate }}</p>
      <a routerLink="/" class="not-found__btn">{{ 'notFound.back' | translate }}</a>
    </div>
  `,
  styles: [
    `
      .not-found {
        min-height: 70vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
        text-align: center;
        padding: 40px 20px;
      }
      .not-found__code {
        font-size: clamp(80px, 15vw, 140px);
        font-weight: 900;
        color: #e8edf5;
        line-height: 1;
      }
      .not-found__title {
        font-size: clamp(22px, 3vw, 32px);
        font-weight: 800;
        color: #1a2540;
        margin: 0;
      }
      .not-found__desc {
        font-size: 16px;
        color: #64748b;
        margin: 0;
        max-width: 400px;
      }
      .not-found__btn {
        margin-top: 8px;
        padding: 13px 32px;
        background: #5b8af0;
        color: #fff;
        border-radius: 12px;
        font-weight: 700;
        font-size: 15px;
        text-decoration: none;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
