import { Injectable } from '@angular/core';

import {
  NbGlobalPhysicalPosition,
  NbToastrService,
} from '@nebular/theme';
import { NbGlobalPosition } from '@nebular/theme';
import { NbComponentStatus } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class DoToastrService {

  constructor(
    private toastrService: NbToastrService,
    private translate: TranslateService) {}

  private status: NbComponentStatus = 'success';
  private position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  private duration: number = 5000;
  private hasIcon: boolean = true;
  private destroyByClick: boolean = true;
  private preventDuplicates: boolean = false;

  public show(
    content: string,
    title?: string,
    status?: NbComponentStatus,
    position?: NbGlobalPosition,
    duration?: number,
    hasIcon?: boolean,
    destroyByClick?: boolean) {
    if (!title) { title = this.title(status); }
    this.build(content, title, status, position, duration, hasIcon, destroyByClick);
  }

  public showI18n(
    content: string,
    contentHasI18n?: boolean,
    title?: string,
    status?: NbComponentStatus,
    position?: NbGlobalPosition,
    duration?: number,
    hasIcon?: boolean,
    destroyByClick?: boolean) {
    if (!title) { title = this.title(status); }
    this.translate.get(title).subscribe((resultTitle: string) => {
      title = resultTitle;
      if (contentHasI18n) {
        this.build(content, title, status, position, duration, hasIcon, destroyByClick);
      } else {
        this.translate.get(content).subscribe((resultContent: string) => {
          this.build(resultContent, title, status, position, duration, hasIcon, destroyByClick);
        });
      }
    });
  }

  private build(
    content: string,
    title: string,
    status: NbComponentStatus,
    position: NbGlobalPosition,
    duration: number,
    hasIcon: boolean,
    destroyByClick: boolean) {
    this.toastrService.show(content, title, {
      status: status ? status : this.status,
      position: position ? position : this.position,
      duration: duration ? duration : this.duration,
      hasIcon: hasIcon ? hasIcon : this.hasIcon,
      destroyByClick: destroyByClick ? destroyByClick : this.destroyByClick,
      preventDuplicates: this.preventDuplicates,
    });
  }

  private title(status: NbComponentStatus) {
    let title = 'Success';
    switch (status) {
      case 'primary':
        title = 'Notification';
        break;
      case 'warning':
        title = 'Warning';
        break;
      case 'danger':
        title = 'Failure';
        break;
      case 'info':
        title = 'Information';
        break;
      default:
        break;
    }
    return title;
  }

}
