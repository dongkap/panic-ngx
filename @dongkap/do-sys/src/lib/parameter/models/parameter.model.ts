export class ParameterGroupModel {
    public parameterGroupCode: string;
    public parameterGroupName: string;
    public parameterGroupType: string;
}

export class ParameterModel extends ParameterGroupModel {
    public parameterCode: string;
}

export class ParameterI18nModel extends ParameterModel {
    public parameterValue: string;
    public locale: string;
}
