import { Directive, Input, OnInit } from '@angular/core';
import {
    NgControl,
    Validators,
    AbstractControl,
    Validator,
    ValidatorFn,
    ValidationErrors,
    ControlValueAccessor,
} from '@angular/forms';

@Directive()
export abstract class ValidatorAccessorDirective implements ControlValueAccessor, Validator, OnInit {

    @Input() name: string;
    @Input() pattern: string;
    @Input() label: string = '';
    @Input() nolabel: boolean = false;
    @Input() disabled: boolean = false;
    @Input() required: boolean = false;
    @Input() paramError: any;
    @Input() warnMessage: string;
    public onChange = (_: any) => {};
    public onTouched = (_?: any) => {};
    protected onInit(): void {}

    constructor(protected ngControl: NgControl) {
        // ngControl && (ngControl.valueAccessor = this);
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
    }

    public ngOnInit(): void {
        this.onInit();

        const control = this.ngControl.control;
        const validators: ValidatorFn[] = control.validator ? [control.validator] : [];
        if (this.ngControl.control.errors) {
            this.required = this.ngControl.control.errors['required'];
        }
        if (this.required && !this.disabled) {
            validators.push(Validators.required);
            this.ngControl.control.setErrors({required: true});
        }
        if (this.pattern) {
            validators.push(Validators.pattern(this.pattern));
        }
        this.ngControl.control.setValidators(validators);
        this.ngControl.control.updateValueAndValidity();
    }

    validate(c: AbstractControl): ValidationErrors {
        const validators: ValidatorFn[] = [];
        if (this.required) {
            validators.push(Validators.required);
        }
        if (this.pattern) {
            validators.push(Validators.pattern(this.pattern));
        }
        return validators;
    }

    get hasErrors(): boolean {
        return (
            !this.disabled &&
            this.ngControl.control &&
            this.ngControl.control.invalid &&
            this.ngControl.touched
        );
    }

    get hasSuccess(): boolean {
        return (
            !this.disabled &&
            this.ngControl.control &&
            this.ngControl.control.valid &&
            this.ngControl.touched
        );
    }

    get errorMessages(): string[] {
        const errors: string[] = [];
        if (this.ngControl.errors){
            Object.keys(this.ngControl.errors).forEach(property => {
                switch (property) {
                    case 'required':
                        errors.push('error.required');
                        break;
                    case 'email':
                        errors.push('error.pattern.email');
                        break;
                    case 'minlength':
                        errors.push('error.minlength');
                        break;
                    case 'daterange':
                        errors.push('error.daterange');
                        break;
                    default:
                        errors.push('error.'.concat(property).concat('.').concat(this.name));
                        break;
                }
            });
        }
        return errors;
    }

    registerOnValidatorChange(fn: () => void): void {
        this.onChange = fn;
    }

    abstract writeValue(obj: any): void;
    abstract registerOnChange(fn: any): void;
    abstract registerOnTouched(fn: any): void;
    abstract setDisabledState?(isDisabled: boolean): void;
}
