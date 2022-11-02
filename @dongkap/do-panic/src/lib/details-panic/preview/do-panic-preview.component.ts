import { Component, OnInit, Input, Inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { APIModel, API, HTTP_SERVICE, HttpFactoryService } from '@dongkap/do-core';

@Component({
  selector: 'do-panic-preview',
  templateUrl: './do-panic-preview.component.html',
  styleUrls: ['do-panic-preview.component.scss'],
})
export class DoPanicPreviewComponent implements OnInit {

  @Input() public url: any;
  @Input() public checksum: any;
  @Input() public userId: any;
  @Input() public fileType: any;

  constructor(
    @Inject(API)private apiPath: APIModel,
    @Inject(HTTP_SERVICE)private httpBaseService: HttpFactoryService,
    public sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.getEvidence(this.checksum, this.userId, this.fileType);
  }

  private getEvidence(checksum: any, userId: string, fileType: string) {
    this.httpBaseService.HTTP_AUTH(
    this.apiPath['file']['evidence'], null, null, null,
    [checksum, userId], 'arraybuffer')
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
