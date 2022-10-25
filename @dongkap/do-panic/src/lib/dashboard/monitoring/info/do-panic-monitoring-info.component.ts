import { Component, Input, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeafletModel } from '@dongkap/do-shared';
import { NbDialogService } from '@nebular/theme';
import { PanicService } from '../../../services/panic.service';
import { DoPanicMonitoringPreviewComponent } from '../preview/do-panic-monitoring-preview.component';

@Component({
  selector: 'do-panic-monitoring-info',
  templateUrl: './do-panic-monitoring-info.component.html',
  styleUrls: ['do-panic-monitoring-info.component.scss'],
})
export class DoPanicMonitoringInfoComponent implements OnInit {

  @Input() public set markerFn(marker: LeafletModel) {
    if (marker) {
      this.panicService.getPanic(marker.alt).then((value: any) => {
        this.data = value;
      });
    }
  }
  public marker: LeafletModel = { mark: [0,0]};
  public data: any = {};

  constructor(private router: Router, private panicService: PanicService,
    private dialogService: NbDialogService) {}

  ngOnInit(): void {
  }

  public onViewDetails(): void {
    this.router.navigate(['/app/dashboard/details', this.data['panicCode']]);
  }

  onPreview(): void {
    this.dialogService.open(DoPanicMonitoringPreviewComponent, {
      context: {
        checksum: this.data['fileMetadata']['checksum'],
        user: this.data['username'],
        fileType: this.data['fileMetadata']['fileType'],
      },
    });
  }

}
