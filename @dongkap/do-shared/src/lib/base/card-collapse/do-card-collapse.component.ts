import {
  Component,
  Input,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import { OnDestroy } from '@angular/core';
import { DoCollapseComponent } from '../collapse/do-collapse.component';

@Component({
  selector: 'do-card-collapse',
  styleUrls: ['./do-card-collapse.component.scss'],
  templateUrl: './do-card-collapse.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DoCardCollapseComponent implements OnDestroy {
  private defaultExpanded: boolean = false;
  public show: boolean = this.defaultExpanded;
  @ViewChild('cardcollapse', {static: false}) collapse: DoCollapseComponent;
  @Input() public header: string;
  @Input() public set expanded(expanded: boolean) {
    this.defaultExpanded = expanded;
    this.show = expanded;
  }
  public get expanded(): boolean {
    return this.defaultExpanded;
  }

  ngOnDestroy(): void {}

  doCollapse(): void {
    this.collapse.toggle();
    this.show = !this.show;
  }

}
