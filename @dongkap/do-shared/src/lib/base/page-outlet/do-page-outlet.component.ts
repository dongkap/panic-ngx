import { Component, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'do-page-outlet',
  styleUrls: ['./do-page-outlet.component.scss'],
  templateUrl: './do-page-outlet.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DoPageOutletComponent {
  @Input() public header: string;
  @Input() public url: string;
  @Input() public width: number = 12;
  @Input() public dataSelect: any[];
  @Input() public selected: any;
  @Input() public param: any;
  @Input() public hidefooter: boolean = false;
  @Input() public showToggle: boolean = true;
  @Input() public isCollapsed: boolean = false;
  @Input() public iconToggle: string = 'arrow-ios-downward-outline';
  @Output() public selectChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onCollapsed: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onExpanded: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) {}

  public back(): boolean {
    this.router.navigate([this.url]);
    return false;
  }

  public onChangeSelect(event: any) {
    this.selected = event;
    this.selectChange.emit(event);
  }

  public collapsed(event: any): void {
    this.onCollapsed.emit(event);
  }

  public expanded(event: any): void {
    this.onExpanded.emit(event);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconToggle = this.isCollapsed ? 'arrow-ios-upward-outline' : 'arrow-ios-downward-outline';
  }

}
