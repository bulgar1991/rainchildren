import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { TRAINING_PLACES } from '@/config/locations';

interface FaqItem {
  questionKey: string;
  answerKey: string;
  // Show the training places (with map links) under the answer.
  showPlaces?: boolean;
}

@Component({
  selector: 'app-faq',
  imports: [TranslatePipe, MatExpansionModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {
  readonly places = TRAINING_PLACES;

  readonly items: FaqItem[] = [
    { questionKey: 'faq.q1', answerKey: 'faq.a1' },
    { questionKey: 'faq.q2', answerKey: 'faq.a2' },
    { questionKey: 'faq.q3', answerKey: 'faq.a3' },
    { questionKey: 'faq.q4', answerKey: 'faq.a4' },
    { questionKey: 'faq.q5', answerKey: 'faq.a5' },
    { questionKey: 'faq.q6', answerKey: 'faq.a6', showPlaces: true },
  ];
}
