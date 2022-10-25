import { Component, OnInit } from '@angular/core';
import { DoWizardService } from '../services/do-wizard.service';
import { DoWizardStepData } from '../wizard-step/do-wizard-step-data.interface';
import { DoWizardOptions } from '../wizard-options/do-wizard-options.interface';

@Component({
  selector: 'do-wizard-navigation',
  templateUrl: './do-wizard-navigation.component.html',
  styleUrls: ['./do-wizard-navigation.component.scss']
})
export class DoWizardNavigationComponent implements OnInit {
  public stepData$;
  public currentStepData;

  public wizardOptions: DoWizardOptions;

  constructor(private service: DoWizardService) { }

  ngOnInit() {
    this.stepData$ = this.service.getStepDataChangesAsObservable();
    this.service.getCurrentStepDataAsObservable().subscribe(stepData => this.currentStepData = stepData);
    this.wizardOptions = this.service.wizardOptions;
  }

  public goToStep(stepData: DoWizardStepData) {
    if ((this.currentStepData && this.currentStepData.options && this.currentStepData.options.disableNavigation)
        || stepData.order >= this.currentStepData.order) {
      return;
    }
    this.service.navigateToStep(stepData);
  }
}
