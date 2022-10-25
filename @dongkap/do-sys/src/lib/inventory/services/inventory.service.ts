import { Injectable } from '@angular/core';
import { AssetModel } from '../models/asset.model';

@Injectable()
export class InventoryService {

    private asset: AssetModel;

    public getAsset(): AssetModel {
        return this.asset;
    }

    public setAsset(asset: AssetModel) {
        this.asset = asset;
    }

}
