import { Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { ApiBaseResponse } from '@dongkap/do-core';
import { BaseComponent } from './base.component';
import { DoToastrService } from '../../toastr/services/do-toastr.service';

export abstract class BaseFormComponent<T> extends BaseComponent<T> {

    protected toastr: DoToastrService;
    protected submitSubject$ = new Subject<ApiBaseResponse>();
    public formGroup: FormGroup;
    public formBuilder: FormBuilder;
    public disabled: boolean = false;
    public loadingForm: boolean = false;

    constructor(
        public injector: Injector,
        controlsConfig?: {
            [key: string]: any;
        }) {
        super(injector);
        this.formBuilder = injector.get(FormBuilder);
        if (controlsConfig) {
            this.formGroup = this.formBuilder.group(controlsConfig);
        }
        this.toastr = injector.get(DoToastrService);
    }

    onDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
        this.destroy$.unsubscribe();
    }

    onSubmit(body?: any, serviceName?: string, apiName?: string, disableToastr?: boolean): any {
        this.disabled = true;
        this.initProgress();
        this.setProgress(65);
        this.exec(serviceName, apiName, body ? body : this.formGroup?.value)
            .subscribe(
                (success: ApiBaseResponse) => {
                    this.setProgress(95);
                    if (!body) {
                        this.formGroup.markAsPristine();
                    }
                    this.disabled = false;
                    if (success.respStatusCode) {
                        if (!disableToastr) {
                            this.toastr.showI18n(success.respStatusMessage[success.respStatusCode], true);
                        }
                    }
                    this.doneProgress();
                    this.submitSubject$.next(success);
                },
                (error: any | ApiBaseResponse) => {
                    this.disabled = false;
                    if (!disableToastr) {
                        if (error instanceof HttpErrorResponse) {
                            error = error['error'] as ApiBaseResponse;
                        }
                        this.toastr.showI18n(error.respStatusMessage[error.respStatusCode], true, null, 'danger');
                    }
                    this.doneProgress();
                    this.submitSubject$.next(error);
                },
            );
        return this.submitSubject$.asObservable();
    }

    onReset(): void {}

}
