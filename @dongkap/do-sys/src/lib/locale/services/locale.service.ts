import { Injectable } from '@angular/core';
import { LocaleModel } from '@dongkap/do-core';

@Injectable()
export class LocaleService {

    private locale: LocaleModel;

    public getLocale(): LocaleModel {
        return this.locale;
    }

    public setLocale(locale: LocaleModel) {
        this.locale = locale;
    }

}
