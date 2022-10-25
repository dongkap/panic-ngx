import {
  Component,
  Input,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import { Observable, ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'do-datatable-collapse, [do-datatable-collapse]',
  styleUrls: ['./do-datatable-collapse.component.scss'],
  templateUrl: './do-datatable-collapse.component.html',
  animations: [
    trigger('openedState', [
      state('collapsed', style(
        {
          opacity: 0,
          overflow: 'hidden',
          height: '0px',
          minHeight: '0',
          padding: '0 0 0 0.5rem',
      })),
      state('expanded', style(
        {
          opacity: 1,
          overflow: 'hidden',
          height: '*',
          padding: '1.5rem 0 0.5rem 0.5rem',
          'border-bottom': '1px solid #d1d4d7',
      })),
      transition('collapsed <=> expanded', animate('500ms ease-in-out')),
    ]),
  ],
})
export class DoDatatableCollapseComponent {
  private openedSubject: ReplaySubject<boolean>;
  opened$: Observable<boolean>;
  openedState$: Observable<string>;

  constructor() {
    this.openedSubject = new ReplaySubject(1);
    this.openedSubject.next(false);
    this.opened$ = this.openedSubject.asObservable();
    this.openedState$ = this.opened$.pipe(map(x => x ? 'expanded' : 'collapsed'));
  }

  toggle = () => {
    this.opened$.pipe(take(1)).subscribe(x => this.openedSubject.next(!x));
  }

}
