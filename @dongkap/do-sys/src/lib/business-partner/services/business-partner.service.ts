import { Injectable } from '@angular/core';
import { B2BModel } from '../models/business-partner.model';

@Injectable()
export class BusinessPartnerService {

    private b2b: B2BModel;

    public getB2B(): B2BModel {
        return this.b2b;
    }

    public setB2B(b2b: B2BModel) {
        this.b2b = b2b;
    }

}
