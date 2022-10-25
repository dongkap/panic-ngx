import { Injectable } from '@angular/core';
import { AppsModel } from '../models/apps.model';

@Injectable()
export class AppsService {

    private apps: AppsModel;

    public getApps(): AppsModel {
        return this.apps;
    }

    public setApps(apps: AppsModel) {
        this.apps = apps;
    }

}
