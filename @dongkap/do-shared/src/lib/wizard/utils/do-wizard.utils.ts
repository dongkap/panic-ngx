import { Route } from '@angular/router';
import { ComponentRef } from '@angular/core';
import { DoWizardStepData } from '../wizard-step/do-wizard-step-data.interface';
import { DoWizardOptions } from '../wizard-options/do-wizard-options.interface';
import { DoWizardStepOptions } from '../wizard-step/do-wizard-step-options';

/**
 * Returns true if the component extends the NgWizardStep class or implements the NgWizardStepInterface.
 *
 * @param componentRef The reference to the component to verify
 */
export function componentImplementsNgWizardStepInterface(componentRef: ComponentRef<any>): boolean {
  return 'isValid' in componentRef && 'onNext' in componentRef && 'onPrevious' in componentRef;
}

/**
 * Returns the NgWizardStepData with the given path in the stepData list or undefined if none is
 * found.
 *
 * @param stepData The list with NgWizardStepDatas
 * @param path The path you want to get the NgWizardStepData for
 */
export function getStepDataForPath(stepData: DoWizardStepData[], path: string) {
  return stepData.find(data => data.path === path);
}

/**
 * Returns the NgWizardStepData for the given url in the stepData list or undefined if none is
 * found.
 *
 * @param stepData The list with NgWizardStepDatas
 * @param url The url which you want to get the NgWizardStepData for
 */
export function getStepDataForUrl(stepData: DoWizardStepData[], url: string) {
  // gets 'path' in the url '/wizard/path?key=value'
  const path = url.split('/').pop().split('?')[0];
  return getStepDataForPath(stepData, path);
}

/**
 * Returns the default wizard options.
 */
export function getDefaultWizardOptions(): DoWizardOptions {
  return {
    name: '',
    baseUrl: '/',
    navBar: {
      icons: {
        previous: '<i class="cil-check-alt"></i>',
        current: '<i class="cil-pencil"></i>',
        next: '<i class="cil-lock-locked"></i>',
      },
    },
    buttons: {
      cancel: {
        label: 'Cancel',
      },
      previous: {
        label: 'Back',
      },
      next: {
        label: 'Next',
      },
      finish: {
        label: 'Submit',
      },
    }
  };
}

/**
 * Merges the wizard options in the wizard route's config with the default wizard options.
 *
 * @param wizardOptions The wizard options in the wizard route's config
 */
export function mergeWizardOptions(wizardOptions: {}): DoWizardOptions {
  if (!wizardOptions) {
    return getDefaultWizardOptions();
  }

  return { ...getDefaultWizardOptions(), ...wizardOptions };
}

/**
 * Returns the options passed to the wizard step route with an added title attribute.
 *
 * @param route The wizard step route configuration
 */
export function getWizardStepOptions(route: Route): DoWizardStepOptions {
  if (!route.data) {
    return { title: getStepTitleFromRoute(route) };
  }

  return {
    ...route.data,
    title: getStepTitleFromRoute(route),
  };
}

/**
 * Returns the step title based on the Route configuration.
 * If the route has a data.title attribute it will be returned.
 * Else the path will be capitalized and '-' or '_' characters will be replaces by spaces.
 *
 * @param route The Angular Route object
 */
export function getStepTitleFromRoute(route: Route): string {
  if (route.data && route.data.title) {
    return route.data.title;
  }
  return capitalize(insertSpaces(route.path));
}

/**
 * Capitalizes the first character of the passed value.
 */
function capitalize(value: string): string {
  if (!value) {
    return value;
  }
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

/**
 * Replaces '-' and '_' characters by spaces.
 */
function insertSpaces(value: string): string {
  if (!value) {
    return value;
  }
  return value.replace(/[-_]/g, ' ').trim();
}
