export class RoleModel {
    authority: string;
    level?: string;
    description?: string;
    group?: SystemAuthority;
}

export class SystemAuthority {
    code: string;
    name: string;
}
