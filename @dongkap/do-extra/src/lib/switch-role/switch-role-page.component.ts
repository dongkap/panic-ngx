import { Component, Injector, OnInit } from '@angular/core';
import { AuthIndexedDBService } from '@dongkap/do-auth';
import {
  ApiBaseResponse,
  HttpBaseModel,
} from '@dongkap/do-core';
import { BaseFormComponent } from '@dongkap/do-shared';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'do-switch-role-page',
  styleUrls: ['./switch-role-page.component.scss'],
  templateUrl: './switch-role-page.component.html',
})
export class SwitchRolePageComponent extends BaseFormComponent<any> implements OnInit {

  public apiSelectUserRole: HttpBaseModel;
  private authority: any;

  constructor(
    public injector: Injector,
    private authIndexedDB: AuthIndexedDBService) {
    super(injector, {
      role: [],
    });
    this.apiSelectUserRole = this.api['security']['select-user-role'];
  }

  ngOnInit(){
    this.loadingForm = true;
    this.exec('security', 'get-user-role')
      .subscribe(
        (success: any) => {
          this.loadingForm = false;
          this.authority = success['authority'];
          this.formGroup.controls['role'].setValue(success['description']);
          this.formGroup.markAsPristine();
        },
        (error: ApiBaseResponse) => {
          this.loadingForm = true;
          if (error.respStatusMessage) {
            this.toastr.showI18n(error.respStatusMessage[error.respStatusCode], true, null, 'danger');
          }
        },
      );
  }

  onSubmit(): void {
    if (this.formGroup.get('role').value['value']) {
      this.authority = this.formGroup.get('role').value['value'];
    }
    this.disabled = true;
    this.loadingForm = true;
    const data: any = {
      authority: this.authority
    };
    (super.onSubmit(data, 'security', 'switch-role') as Observable<ApiBaseResponse>)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response) {
          this.toastr.showI18n('notification.default', true);
          Promise.all([
            this.authIndexedDB.putEnc('menus', JSON.stringify(response['main'])),
            this.authIndexedDB.putEnc('extras', JSON.stringify(response['extra'])),
          ]).then(() => {
            this.loadingForm = false;
            window.location.href = '/app/home';
          });
        }
      });
  }

}
