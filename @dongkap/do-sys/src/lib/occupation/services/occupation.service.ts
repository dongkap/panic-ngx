import { Injectable } from '@angular/core';
import { OccupationModel } from '../models/occupation.model';

@Injectable()
export class OccupationService {

    private occupation: OccupationModel;

    public getOccupation(): OccupationModel {
        return this.occupation;
    }

    public setOccupation(occupation: OccupationModel) {
        this.occupation = occupation;
    }

}
