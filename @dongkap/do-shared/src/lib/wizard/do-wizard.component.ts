import { Component, ComponentRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoWizardService } from './services/do-wizard.service';

@Component({
  selector: 'do-wizard',
  styleUrls: ['./do-wizard.component.scss'],
  templateUrl: './do-wizard.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DoWizardComponent {
  @Input() extra: boolean = false;
  @Input() loading: boolean = false;
  @Output() onNext: EventEmitter<any> = new EventEmitter<any>();
  @Output() onPrevious: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  public error: Error;
  private wizardName: string;

  constructor(
    private service: DoWizardService,
    private route: ActivatedRoute,
  ) {
    try {
      this.route.data.subscribe(data => {
        this.wizardName = data.name;
      });
      this.service.loadWizardRoutes(this.wizardName);
    } catch (error) {
      this.error = error;
    }
  }

  public onActivate(componentRef: ComponentRef<any>) {
    try {
      this.service.registerActiveComponent(componentRef);
    } catch (error) {
      this.error = error;
    }
  }

  goToSubmit(data: any) {
    this.onSubmit.emit(data);
  }

  goToNextStep() {
    this.onNext.emit(this.service.getFormGroup());
  }

  goToPreviousStep() {
    this.onPrevious.emit(this.service.getFormGroup());
  }
}
