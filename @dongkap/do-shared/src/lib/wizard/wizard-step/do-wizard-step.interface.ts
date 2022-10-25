export interface DoWizardStepInterface {
  isValid(): boolean;
  onNext(): void | boolean;
  onPrevious(): void | boolean;
}
