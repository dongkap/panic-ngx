import { Injectable } from '@angular/core';
import { CorporateModel } from '../models/corporate.model';

@Injectable()
export class CorporateService {

    private corporate: CorporateModel;

    public getCorporate(): CorporateModel {
        return this.corporate;
    }

    public setCorporate(corporate: CorporateModel) {
        this.corporate = corporate;
    }

}
