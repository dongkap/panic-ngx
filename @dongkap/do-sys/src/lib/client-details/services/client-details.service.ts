import { Injectable } from '@angular/core';
import { ClientDetailsModel } from '../models/client-details.model';

@Injectable()
export class ClientDetailsService {

    private clientDetails: ClientDetailsModel;

    public getClientDetails(): ClientDetailsModel {
        return this.clientDetails;
    }

    public setClientDetails(clientDetails: ClientDetailsModel) {
        this.clientDetails = clientDetails;
    }

}
