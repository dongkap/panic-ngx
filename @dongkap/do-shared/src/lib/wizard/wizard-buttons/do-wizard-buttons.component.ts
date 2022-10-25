import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { DoWizardService } from '../services/do-wizard.service';
import { DoWizardStepData } from '../wizard-step/do-wizard-step-data.interface';
import { DoWizardOptions } from '../wizard-options/do-wizard-options.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'do-wizard-buttons',
  templateUrl: './do-wizard-buttons.component.html',
  styleUrls: ['./do-wizard-buttons.component.scss'],
})
export class DoWizardButtonsComponent implements OnInit {
  @Input() extra: boolean = false;
  @Input() clearFormOnSubmit: boolean = false;
  @Input() disabled: boolean = false;
  @Output() onNext: EventEmitter<any> = new EventEmitter<any>();
  @Output() onPrevious: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  public currentStepData$: Observable<DoWizardStepData>;

  public wizardOptions: DoWizardOptions;

  constructor(private service: DoWizardService, private router: Router) { }

  ngOnInit() {
    this.currentStepData$ = this.service.getCurrentStepDataAsObservable();
    this.wizardOptions = this.service.wizardOptions;
  }

  formIsValid(): boolean {
    return this.service.formIsValid();
  }

  goToSubmit() {
    if (this.clearFormOnSubmit) {
      this.service.getFormGroup().reset();
    }
    this.onSubmit.emit(this.service.getFormGroup().value);
  }

  goToNextStep() {
    this.onNext.emit(this.service.getFormGroup());
    this.service.navigateToNextStep();
  }

  goToPreviousStep() {
    this.onPrevious.emit(this.service.getFormGroup());
    this.service.navigateToPreviousStep();
  }

  goToCancel(url: string) {
    this.service.getFormGroup().reset();
    this.router.navigate([url]);
  }

  goToPath(path: string) {
    this.service.navigateToPath(path);
  }

}
