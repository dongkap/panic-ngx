export interface RadioModel {
    name: string;
    value: string;
    selected?: boolean;
    disabled?: boolean;
}

export class RadioParamModel {
    key: string;
    value: any;
}
