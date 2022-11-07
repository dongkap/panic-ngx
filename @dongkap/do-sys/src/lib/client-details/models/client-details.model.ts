export class ClientDetailsModel {
    clientId: string;
    clientSecret: string;
    resourceIds: string;
    scope: string;
    authorizedGrantTypes: string;
    registeredRedirectUri: string;
    authorities: string;
    accessTokenValidity: number;
    refreshTokenValidity: number;
    additionalInformation: number;
    autoApprove: boolean;
}
