import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'do-wizard-page-outlet',
  styleUrls: ['./do-wizard-page-outlet.component.scss'],
  templateUrl: './do-wizard-page-outlet.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DoWizardPageOutletComponent {

  @Input() public width: number = 12;

}
