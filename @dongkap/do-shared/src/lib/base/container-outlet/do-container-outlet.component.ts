import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'do-container-outlet',
  styleUrls: ['./do-container-outlet.component.scss'],
  templateUrl: './do-container-outlet.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DoContainerOutletComponent {
    @Input() name: string;
    @Input() label: string = '';
    @Input() colLabel: number = 3;
    @Input() colContent: number = 9;
    @Input() nolabel: boolean = false;
    @Input() dividerlabel: boolean = false;
    @Input() required: boolean = false;
    @Input() hasErrors: boolean = false;
    @Input() errorMessages: string[] = [];
    @Input() warnMessage: string;
    @Input() paramError: any;
    @Input() skeleton: boolean = false;
    @Input() show: boolean = true;
}
