import { RoleModel } from './role.model';

export class UserModel {
    username?: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    country?: string;
    province?: string;
    city?: string;
    district?: string;
    subDistrict?: string;
    zipcode?: string;
    image?: any;
    description?: string;
    authorityDefault?: string;
    roles?: RoleModel[];
    enabled?: boolean;
    accountNonExpired?: boolean;
    credentialsNonExpired?: boolean;
    accountNonLocked?: boolean;
}
