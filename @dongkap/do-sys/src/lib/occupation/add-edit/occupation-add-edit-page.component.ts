import { Component, Injector } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiBaseResponse, ResponseCode } from '@dongkap/do-core';
import { BaseFormComponent, CheckboxModel } from '@dongkap/do-shared';
import { OccupationService } from '../services/occupation.service';
import { OccupationModel } from '../models/occupation.model';

@Component({
  selector: 'do-occupation-add-edit-page',
  styleUrls: ['./occupation-add-edit-page.component.scss'],
  templateUrl: './occupation-add-edit-page.component.html',
})
export class OccupationAddEditPageComponent extends BaseFormComponent<any> implements OnInit {

  public action: 'Add' | 'Edit' = 'Add';
  public dataDefault: CheckboxModel[] = [
    {
      selected: true,
    },
  ];
  constructor(
    public injector: Injector,
    private router: Router,
    private route: ActivatedRoute,
    private occupationService: OccupationService) {
    super(injector,
      {
        code: [],
        name: [],
      });
    if (this.occupationService.getOccupation() || (this.route.snapshot.params['action'] === 'add')) {
      if ((this.route.snapshot.params['action'] === 'edit')) {
        this.action = 'Edit';
        this.formGroup.get('code').setValue(this.occupationService.getOccupation().code);
        this.formGroup.get('name').setValue(this.occupationService.getOccupation().name);
        this.formGroup.get('code').disable();
      }
    } else {
      this.router.navigate(['/app/mgmt/occupation']);
    }
  }

  ngOnInit(): void {}

  onReset(): void {
    this.router.navigate(['/app/mgmt/occupation']);
  }

  onSubmit(): void {
    const data: OccupationModel = {
      code: this.formGroup.get('code').value,
      name: this.formGroup.get('name').value,
    };
    (super.onSubmit(data, 'security', 'post-occupation')  as Observable<ApiBaseResponse>)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        if (response.respStatusCode === ResponseCode.OK_DEFAULT.toString()) {
          this.router.navigate(['/app/mgmt/occupation']);
        }
      });
  }

}
