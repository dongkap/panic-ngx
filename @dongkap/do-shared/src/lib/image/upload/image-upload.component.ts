import {
  Component,
  Inject,
  Input,
  ViewEncapsulation,
  Optional,
  Self,
  LOCALE_ID,
  Output,
  EventEmitter,
} from '@angular/core';
import { OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ValueAccessorDirective } from '../../base/value-accessor.component';

@Component({
  selector: 'do-image-upload',
  styleUrls: ['./image-upload.component.scss'],
  templateUrl: './image-upload.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ImageUploadComponent extends ValueAccessorDirective<any> implements OnDestroy {
  @Output() onPreview: EventEmitter<any> = new EventEmitter<any>();
  @Input() image: string;
  @Input() height: number;
  @Input() width: number;
  @Input() radius: number = 0;
  @Input() buttonUpload: boolean = true;
  @Input() skeleton: boolean = false;
  @Input() set uploadFn(finish: boolean) {
    if (finish) {
      this.ngControl.control.markAsPristine();
      this.ngControl.control.markAsUntouched();
    }
  }
  public imageDefault: string = `${document.getElementsByTagName('base')[0].href}assets/images/avatars/default.png`;

  constructor(
    @Optional() @Self() ngControl: NgControl,
    @Inject(LOCALE_ID) public locale: string,
    public dom: DomSanitizer) {
    super(ngControl, locale);
  }

  public writeValue(value: any): void {
    if (value instanceof File) {
      this.image = URL.createObjectURL(value);
      this.value = value;
      this.onChange(this.value);
    } else {
      this.image = value;
    }
  }

  upload(files: any[]) {
    if (files.length) {
      this.value = files[0];
      this.image = URL.createObjectURL(this.value);
      this.onPreview.emit(this.value);
    }
    const control = this.ngControl.control;
    if (control) {
        control.updateValueAndValidity();
        control.markAsTouched();
        control.markAsDirty();
    }
  }

  ngOnDestroy(): void {}

  onInit(): void {}

}
