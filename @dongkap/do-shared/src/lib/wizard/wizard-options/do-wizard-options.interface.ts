export interface DoWizardOptions {
  name: string;
  baseUrl: string;
  navBar: {
    icons: {
      previous: string;
      current: string;
      next: string;
    };
  };
  buttons: {
    cancel: {
      label: string;
    };
    previous: {
      label: string;
    };
    next: {
      label: string;
    };
    finish: {
      label: string;
    };
  };
}
