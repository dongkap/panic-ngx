export class ClientDetailsModel {
    scope: string[];
    client_id: string;
    client_secret: string;
    resource_ids: string[];
    authorized_grant_types: string[];
    autoapprove: string[];
    access_token_validity: number;
    refresh_token_validity: number;
    authorities: string[];
}
