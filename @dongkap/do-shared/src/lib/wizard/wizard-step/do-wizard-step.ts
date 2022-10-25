import { Injector } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { API, APIModel, HttpFactoryService, HTTP_SERVICE } from '@dongkap/do-core';
import { Subject } from 'rxjs';
import { DoWizardService } from '../services/do-wizard.service';
import { DoWizardStepInterface } from './do-wizard-step.interface';

export abstract class DoWizardStep implements DoWizardStepInterface {
  protected api: APIModel;
  protected http: HttpFactoryService;
  protected router: Router;
  public formGroup: FormGroup;
  protected formBuilder: FormBuilder;
  public disabled: boolean = false;
  public loadingForm: boolean = false;
  public wizardService: DoWizardService;
  protected destroy$: Subject<any> = new Subject<any>();

  constructor(
    public injector: Injector,
    public formGroupName: string,
    controlsConfig: {
      [key: string]: any;
    }
    ){
      this.api = injector.get(API);
      this.http = injector.get(HTTP_SERVICE);
      this.formBuilder = injector.get(FormBuilder);
      this.wizardService = injector.get(DoWizardService);
      this.router = injector.get(Router);
      this.formGroup = this.wizardService.getFormGroup();
      this.formGroup.addControl(this.formGroupName, this.formBuilder.group(controlsConfig));
      this.validateRoute();
  }

  protected abstract validateRoute(): void;

  isValid(): boolean {
    return this.formGroup.controls[this.formGroupName].valid;
  }

  onNext(): void | boolean {
    this.wizardService.setFormGroup(this.formGroup);
  }

  onPrevious(): void | boolean {
    this.wizardService.setFormGroup(this.formGroup);
  }
}
