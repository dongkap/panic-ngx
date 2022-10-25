import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'do-fake-report-prompt',
  templateUrl: './do-fake-report-prompt.component.html',
  styleUrls: ['do-fake-report-prompt.component.scss'],
})
export class DoFakeReportPromptComponent {

  public disabled: boolean = false;
  public password: string;

  constructor(protected ref: NbDialogRef<DoFakeReportPromptComponent>) {
  }

  submit(password) {
    this.disabled = true;
    this.ref.close(password);
  }
}
