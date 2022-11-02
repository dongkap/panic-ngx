import { Component, OnInit, OnDestroy, Injector, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NbDialogService } from '@nebular/theme';
import { BaseFilterComponent, DatatableColumn, SelectParamModel, Sort } from '@dongkap/do-shared';
import { ApiBaseResponse, EncryptionService, HttpBaseModel, OAUTH_INFO, ResponseCode, SecurityResourceModel } from '@dongkap/do-core';
import { PanicService } from '../services/panic.service';
import { DoFakeReportPromptComponent } from './prompt/do-fake-report-prompt.component';
import { DoPanicPreviewComponent } from './preview/do-panic-preview.component';

@Component({
  selector: 'do-panic-detail',
  templateUrl: './do-panic-detail.component.html',
  styleUrls: ['do-panic-detail.component.scss'],
})
export class DoPanicDetailComponent extends BaseFilterComponent<any> implements OnInit, OnDestroy {

  public panicReport: any = {};
  public image: string;
  public imageDefault: string = `${document.getElementsByTagName('base')[0].href}/assets/images/avatars/default.png`;
  public disabledFake: boolean;
  private id: string;
  private userId: string;
  public caseClosed: boolean = false;

  public apiPath: HttpBaseModel;
  public columns: DatatableColumn[] = [
    { name: 'Evidence', prop: 'fileMetadata', width: 100, frozenLeft: true, type: 'button',
      button: 'Preview', buttonStatus: 'warning' },
    { name: 'File Size', prop: 'fileMetadata.size', width: 125, frozenLeft: true, type: 'prefix',
      prefix: 'bytes' },
    { name: 'Latitude', prop: 'location.latitude', width: 125, frozenLeft: true },
    { name: 'Longitude', prop: 'location.longitude', width: 125, frozenLeft: true },
    { name: 'Address', prop: 'location.formattedAddress', width: 350 },
    { name: 'Province', prop: 'location.province', width: 150 },
    { name: 'City', prop: 'location.city', width: 150 },
    { name: 'District', prop: 'location.district', width: 150 },
    { name: 'Device ID', prop: 'device.deviceID', width: 150 },
    { name: 'Device Name', prop: 'device.deviceName', width: 150 },
  ];
  public sort: Sort = {
    'desc': ['createdDate'],
  };
  public apiSelectParameter: HttpBaseModel;
  public paramSelectStatus: SelectParamModel[];
  public paramSelectEmergency: SelectParamModel[];
  private oauthResource: SecurityResourceModel;
  private enc: EncryptionService;

  constructor(public injector: Injector, private router: Router,
    private route: ActivatedRoute, private panicService: PanicService,
    private dialogService: NbDialogService) {
    super(injector, null,
      {
        'status': [],
        'emergencyCategory': [],
      });
    this.enc = injector.get(EncryptionService);
    this.oauthResource = injector.get(OAUTH_INFO);
    this.apiSelectParameter = this.api['master']['select-parameter'];
    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
      this.keyword = {
        id: this.id,
      };
    } else {
      this.router.navigate(['/app/monitoring']);
    }
    this.apiPath = this.api['panic']['datatable-panic-detail'];
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.onInit('panic', 'get-panic');
    this.paramSelectStatus = [{
      key: 'parameterGroupCode',
      value: 'STATUS_EMERGENCY',
    }];
    this.paramSelectEmergency = [{
      key: 'parameterGroupCode',
      value: 'CATEGORY_EMERGENCY',
    }];
  }

  onInit(serviceName: string, apiName: string): void {
    this.loadingForm = true;
    this.panicService.getPanic(this.id).then((panicData: any) => {
      this.formGroup.get('status').setValue(panicData?.status);
      this.formGroup.get('emergencyCategory').setValue(panicData?.emergencyCategory);
      if (panicData?.statusCode === 'STATUS_EMERGENCY.CASE_CLOSED') {
        this.caseClosed = true;
        this.formGroup.get('status').disable();
        this.formGroup.get('emergencyCategory').disable();
      }
      const pathVariables: string[] = [this.id];

      this.exec(serviceName, apiName, null, null, null, pathVariables)
        .subscribe(
          (success: any) => {
            this.loadingForm = false;
            this.panicReport = success;
            this.userId = success?.userId;
            if (success['image']) {
              this.image = success.personalInfo?.image;
            }
          },
          (error: HttpErrorResponse) => {
            this.loadingForm = true;
            const err: ApiBaseResponse = error['error'];
            if (err) {
              this.toastr.showI18n(err.respStatusMessage[err.respStatusCode], true, null, 'danger');
            } else {
              this.toastr.showI18n(err as any, true, null, 'danger');
            }
          },
        );
    });
  }

  valueSelect(prop: string): string {
    if (this.formGroup.get(prop).value) {
      if (this.formGroup.get(prop).value.value) {
        return this.formGroup.get(prop).value.value;
      } else {
        return this.formGroup.get(prop).value;
      }
    } else {
      return null;
    }
  }

  onPreview(data: any): void {
    this.dialogService.open(DoPanicPreviewComponent, {
      context: {
        checksum: data['checksum'],
        userId: this.userId,
        fileType: data['fileType'],
      },
    });
  }

  onFake(): void {
    this.dialogService.open(DoFakeReportPromptComponent)
      .onClose.subscribe((password: string) => {
        if (password) {
          this.disabledFake = true;
          const data: any = {
            password: this.enc.encryptAES(this.oauthResource['aes_key'], password),
            id: this.id,
          };
          (super.onSubmit(data, 'panic', 'fake-report') as Observable<ApiBaseResponse>)
            .pipe(takeUntil(this.destroy$))
            .subscribe((response: ApiBaseResponse) => {
              if (response) {
                if (response.respStatusCode === ResponseCode.OK_SCR011.toString()) {
                  this.router.navigate(['/app/monitoring']);
                }
              }
            });
        } else {
          this.disabledFake = false;
        }
      });
  }

  onProcess(): void {
    const data: any = {
      id: this.id,
      status: this.valueSelect('status'),
      emergencyCategory: this.valueSelect('emergencyCategory'),
    };
    (super.onSubmit(data, 'panic', 'process-report') as Observable<ApiBaseResponse>)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: ApiBaseResponse) => {
        if (response) {
          if (response.respStatusCode === ResponseCode.OK_UPDATED.toString()) {
            this.router.navigate(['/app/monitoring']);
          }
        }
      });

  }

}
