import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

interface Event {
  id: number;
  image: string;
  dateKey: string;
  titleKey: string;
  descKey: string;
  locationKey: string;
  typeKey: string;
  color: string;
  featured?: boolean;
  past?: boolean;
}

@Component({
  selector: 'app-events',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent {
  readonly upcoming: Event[] = [
    {
      id: 1, featured: true,
      image: 'assets/images/event-1.jpg',
      dateKey: 'events.e1.date', titleKey: 'events.e1.title',
      descKey: 'events.e1.desc', locationKey: 'events.e1.location',
      typeKey: 'events.e1.type', color: '#5b8af0',
    },
    {
      id: 2, image: 'assets/images/event-2.jpg',
      dateKey: 'events.e2.date', titleKey: 'events.e2.title',
      descKey: 'events.e2.desc', locationKey: 'events.e2.location',
      typeKey: 'events.e2.type', color: '#34d399',
    },
    {
      id: 3, image: 'assets/images/event-3.jpg',
      dateKey: 'events.e3.date', titleKey: 'events.e3.title',
      descKey: 'events.e3.desc', locationKey: 'events.e3.location',
      typeKey: 'events.e3.type', color: '#ffb547',
    },
    {
      id: 4, image: 'assets/images/event-4.jpg',
      dateKey: 'events.e4.date', titleKey: 'events.e4.title',
      descKey: 'events.e4.desc', locationKey: 'events.e4.location',
      typeKey: 'events.e4.type', color: '#a78bfa',
    },
  ];

  readonly past: Event[] = [
    {
      id: 5, past: true, image: 'assets/images/event-5.jpg',
      dateKey: 'events.e5.date', titleKey: 'events.e5.title',
      descKey: 'events.e5.desc', locationKey: 'events.e5.location',
      typeKey: 'events.e5.type', color: '#64748b',
    },
    {
      id: 6, past: true, image: 'assets/images/event-6.jpg',
      dateKey: 'events.e6.date', titleKey: 'events.e6.title',
      descKey: 'events.e6.desc', locationKey: 'events.e6.location',
      typeKey: 'events.e6.type', color: '#64748b',
    },
    {
      id: 7, past: true, image: 'assets/images/event-7.jpg',
      dateKey: 'events.e7.date', titleKey: 'events.e7.title',
      descKey: 'events.e7.desc', locationKey: 'events.e7.location',
      typeKey: 'events.e7.type', color: '#64748b',
    },
  ];
}
