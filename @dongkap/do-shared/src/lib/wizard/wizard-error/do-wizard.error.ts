import { DoWizardErrorType } from './do-wizard-error-type.enum';

export abstract class DoWizardError extends Error {
  public type: DoWizardErrorType;

  public wizardComponentName = '';
  public wizardPath = '';
  public stepComponentName = '';

  protected constructor(type: DoWizardErrorType, message: string) {
    super(message);
    this.type = type;
  }
}

export class NoWizardRoute extends DoWizardError {
  constructor(public wizardComponentName: string) {
    super(
      DoWizardErrorType.NO_WIZARD_ROUTE,
      `No route configuration for the ${wizardComponentName} found.`,
    );
  }
}

export class NoChildRoutes extends DoWizardError {
  constructor(public wizardComponentName: string, public wizardPath: string) {
    super(
      DoWizardErrorType.NO_CHILD_ROUTES,
      `No child routes for the ${wizardComponentName} found.`,
    );
  }
}

export class NoWsInterface extends DoWizardError {
  constructor(public stepComponentName: string) {
    super(
      DoWizardErrorType.NO_WS_INTERFACE,
      `The ${stepComponentName} does not extend the NgWizardStep class or implement the NgWizardStepInterface.`,
    );
  }
}
