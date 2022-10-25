import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'do-panic-slide-out',
  styleUrls: ['./do-panic-slide-out.component.scss'],
  templateUrl: './do-panic-slide-out.component.html',
})
export class DoPanicSlideOutComponent {

  @Input() public showInfo: boolean = false;
  @Output() public onToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggleDetail() {
    this.showInfo = !this.showInfo;
    this.onToggle.emit(this.showInfo);
  }
}
