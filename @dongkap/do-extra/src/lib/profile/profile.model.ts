export class ProfileModel {
    username: string;
    name: string;
    email: string;
    image?: string;
    contact?: ContactUserModel;
    personalInfo?: PersonalInfoModel;
}

export class ContactUserModel {
    phoneNumber: string;
    address: string;
    country?: string;
    countryCode?: string;
    province?: string;
    provinceCode?: string;
    city?: string;
    cityCode?: string;
    district?: string;
    districtCode?: string;
    subDistrict?: string;
    subDistrictCode?: string;
    zipcode?: string;
}

export class PersonalInfoModel {
    idNumber: string;
    age?: number;
    genderCode: string;
    genderValue: string;
    placeOfBirth: string;
    dateOfBirth: string;
    height?: number;
    weight?: number;
    bloodType?: string;
}
