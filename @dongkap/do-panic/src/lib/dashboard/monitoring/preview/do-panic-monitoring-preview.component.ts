import { Component, OnInit, Input, Inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { API, APIModel, HttpFactoryService, HTTP_SERVICE } from '@dongkap/do-core';

@Component({
  selector: 'do-panic-monitoring-preview',
  templateUrl: './do-panic-monitoring-preview.component.html',
  styleUrls: ['do-panic-monitoring-preview.component.scss'],
})
export class DoPanicMonitoringPreviewComponent implements OnInit {

  @Input() public url: any;
  @Input() public checksum: any;
  @Input() public user: any;
  @Input() public fileType: any;

  constructor(
    @Inject(API)private apiPath: APIModel,
    @Inject(HTTP_SERVICE)private httpBaseService: HttpFactoryService,
    public sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.getEvidence(this.checksum, this.user, this.fileType);
  }

  private getEvidence(checksum: any, user: string, fileType: string) {
    this.httpBaseService.HTTP_AUTH(
    this.apiPath['file']['evidence'], null, null, null,
    [checksum, user], 'arraybuffer')
    .pipe(tap((response: any) => {
        const fileBlob: Blob = new Blob([response], {
          type: fileType,
        });
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(fileBlob);
        reader.onloadend = () => {
          this.url = this.sanitizer.bypassSecurityTrustUrl(reader.result.toString());
        };
    })).subscribe();
  }

}
