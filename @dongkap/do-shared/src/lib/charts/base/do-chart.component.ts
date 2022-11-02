import { Component, Input } from '@angular/core';

@Component({
  selector: 'do-chart',
  styleUrls: ['./do-chart.component.scss'],
  templateUrl: './do-chart.component.html',
})
export class DoChartComponent  {
  @Input() public set optionsFn(options: any) {
    this.options = options;
  }
  @Input() public options: any = {};
  public data: any;
  public type: 'bar' | 'pie' | 'line' | 'horizontalBar' | 'radar';

}
