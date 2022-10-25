import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export class TranslationService extends TranslateHttpLoader {

  constructor(http: HttpClient, prefix?: string, suffix?: string) {
    super(http, prefix, suffix);
  }

  getTranslation(lang: string): Observable<any> {
    return super.getTranslation(lang);
  }

}
