import { Component, Injector } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiBaseResponse, ResponseCode } from '@dongkap/do-core';
import { BaseFormComponent } from '@dongkap/do-shared';
import { AppsService } from '../services/apps.service';
import { AppsModel } from '../models/apps.model';

@Component({
  selector: 'do-apps-add-edit-page',
  styleUrls: ['./apps-add-edit-page.component.scss'],
  templateUrl: './apps-add-edit-page.component.html',
})
export class AppsAddEditPageComponent extends BaseFormComponent<any> implements OnInit {

  public action: 'Add' | 'Edit' = 'Add';
  constructor(
    public injector: Injector,
    private router: Router,
    private route: ActivatedRoute,
    private appsService: AppsService) {
    super(injector,
      {
        appCode: [],
        appName: [],
        description: [],
      });
    if (this.appsService.getApps() || (this.route.snapshot.params['action'] === 'add')) {
      if ((this.route.snapshot.params['action'] === 'edit')) {
        this.action = 'Edit';
        this.formGroup.get('appCode').setValue(this.appsService.getApps().appCode);
        this.formGroup.get('appName').setValue(this.appsService.getApps().appName);
        this.formGroup.get('description').setValue(this.appsService.getApps().description);
        this.formGroup.get('appCode').disable();
      }
    } else {
      this.router.navigate(['/app/mgmt/apps']);
    }
  }

  ngOnInit(): void {}

  onReset(): void {
    this.router.navigate(['/app/mgmt/apps']);
  }

  onSubmit(): void {
    const data: AppsModel = {
      appCode: this.formGroup.get('appCode').value,
      appName: this.formGroup.get('appName').value,
      description: this.formGroup.get('description').value,
    };
    (super.onSubmit(data, 'security', 'post-apps')  as Observable<ApiBaseResponse>)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        if (response.respStatusCode === ResponseCode.OK_DEFAULT.toString()) {
          this.router.navigate(['/app/mgmt/apps']);
        }
      });
  }

}
