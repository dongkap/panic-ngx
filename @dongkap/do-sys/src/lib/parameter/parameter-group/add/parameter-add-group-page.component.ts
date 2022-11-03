import { Component, Injector } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiBaseResponse, ResponseCode } from '@dongkap/do-core';
import { BaseFormComponent, CheckboxModel } from '@dongkap/do-shared';

@Component({
  selector: 'do-parameter-add-group-page',
  styleUrls: ['./parameter-add-group-page.component.scss'],
  templateUrl: './parameter-add-group-page.component.html',
})
export class ParameterAddGroupPageComponent extends BaseFormComponent<any> implements OnInit {

  public dataType: CheckboxModel[] = [
    {
      id: 'parameterGroupType',
      selected: true,
    },
  ];

  constructor(public injector: Injector, private router: Router) {
    super(injector,
      {
        parameterGroupCode: [],
        parameterGroupName: [],
        parameterGroupType: [],
      });
  }

  ngOnInit(): void {}

  onReset(): void {
    this.router.navigate(['/app/sysconf/parameter']);
  }

  onSubmit(): void {
    const parameterGroupCode = this.formGroup.get('parameterGroupCode')?.value;
    const parameterGroupName = this.formGroup.get('parameterGroupName')?.value;
    let parameterGroupType : 'multi' | 'single' = 'single';
    if (this.formGroup.get('parameterGroupType')?.value) {
      parameterGroupType = this.formGroup.get('parameterGroupType')?.value[0].selected ? 'multi' : 'single';
    }
    const data : any = {
      parameterGroupCode,
      parameterGroupName,
      parameterGroupType
    };
    (super.onSubmit(data, 'master', 'post-parameter-group')  as Observable<ApiBaseResponse>)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        if (response.respStatusCode === ResponseCode.OK_SCR009.toString()) {
          this.router.navigate(['/app/sysconf/parameter']);
        }
      });
  }

}
