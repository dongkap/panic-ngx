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
  selector: 'do-collapse, [do-collapse]',
  styleUrls: ['./do-collapse.component.scss'],
  templateUrl: './do-collapse.component.html',
  animations: [
    trigger('openedState', [
      state('collapsed', style(
        {
          opacity: 0,
          overflow: 'hidden',
          height: '0px',
          minHeight: '0',
          paddingTop: 0,
      })),
      state('expanded', style(
        {
          opacity: 1,
          overflow: 'hidden',
          height: '*',
          paddingTop: '0.75rem',
      })),
      transition('collapsed <=> expanded', animate('500ms ease-in-out')),
    ]),
  ],
})
export class DoCollapseComponent {
  private openedSubject: ReplaySubject<boolean>;
  opened$: Observable<boolean>;
  openedState$: Observable<string>;
  @Input() public set expanded(expanded: boolean) {
    this.openedSubject.next(expanded);
  }

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
