export interface APIModel {
    [name: string]: {
        [name: string]: HttpBaseModel,
    };
}

export interface HttpBaseModel {
    server: HostModel;
    path?: string;
    method?: HttpMethod;
    file?: FileModel;
}

export interface FileModel {
    filename: string;
    extension: string;
}

export enum HttpMethod {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export class HostModel {
    protocol?: string = 'https';
    host: string;
    port?: number | null;
}

export interface ApiBaseResponse {
    respStatusCode: string;
    respStatusMessage: {
        [name: string]: string,
    };
}
