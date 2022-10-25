import { ComponentRef } from '@angular/core';
import { DoWizardStepOptions } from './do-wizard-step-options';

export interface DoWizardStepData {
  order: number;
  componentName: string;
  componentRef?: ComponentRef<any>;
  path: string;
  previousStep?: string;
  nextStep?: string;
  isCurrent: boolean;
  options: DoWizardStepOptions;
}
