import { Injectable } from '@angular/core';
import { LocaleModel } from '@dongkap/do-core';
import { ParameterGroupModel, ParameterModel } from '../models/parameter.model';

@Injectable()
export class ParameterService {

    private parameter: ParameterModel;
    private parameterGroup: ParameterGroupModel;
    private locales: LocaleModel[];

    public getParameter(): ParameterModel {
        return this.parameter;
    }

    public setParameter(parameter: ParameterModel) {
        this.parameter = parameter;
    }

    public getParameterGroup(): ParameterGroupModel {
        return this.parameterGroup;
    }

    public setParameterGroup(parameterGroup: ParameterGroupModel) {
        this.parameterGroup = parameterGroup;
    }

    public getLocales(): LocaleModel[] {
        return this.locales;
    }

    public setLocales(locales: LocaleModel[]) {
        this.locales = locales;
    }

}
