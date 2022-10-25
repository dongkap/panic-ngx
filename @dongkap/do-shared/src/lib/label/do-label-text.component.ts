import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'do-label-text',
  styleUrls: ['./do-label-text.component.scss'],
  templateUrl: './do-label-text.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DoLabelTextComponent {

    @Input() colLabel: number = 4;
    @Input() colContent: number = 8;
    @Input() skeleton: boolean = false;
    @Input() name: string;
    @Input() set content(data: string) {
      if (this.showMoreMode) {
        if (data) {
          this.originalContent = data;
          if (data.length > this.maxShowMore) {
            this.onLess();
          }
        }
      } else {
        this.value = data;
      }
    }
    @Input() dividerlabel: boolean = true;
    @Input() numeric: boolean = false;
    @Input() label: string = '';
    @Input() nolabel: boolean = false;
    @Input() required: boolean = false;
    @Input() showMoreMode: boolean = false;
    @Input() maxShowMore: number = 100;
    @Input() paramError: any;

    public originalContent: string = '';
    public value: string = '';
    public showMore: boolean = false;

    constructor() {}

    public onShowMore(): void {
      this.showMore = !this.showMore;
      if (this.showMore) {
        this.value = this.originalContent;
      } else {
        this.onLess();
      }
    }

    private onLess(): void {
      this.value = this.originalContent.slice(0, this.maxShowMore);
      this.value = this.value + '.... ';
    }
}
