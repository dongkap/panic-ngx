import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { HttpBaseModel } from '../../models';

export interface HttpFactoryService {

    HTTP_AUTH(
        api: HttpBaseModel,
        body?: any,
        headers?: HttpHeaders,
        params?: HttpParams,
        pathVariable?: string[],
        responseType?: any): Observable<any>;

    HTTP_BASE(
        api: HttpBaseModel,
        body?: any,
        headers?: HttpHeaders,
        params?: HttpParams,
        pathVariable?: string[],
        responseType?: any): Observable<any>;

    GET(
        url: string,
        headers?: HttpHeaders,
        params?: HttpParams,
        responseType?: any): Observable<any>;

    POST(
        url: string,
        body: any,
        headers?: HttpHeaders,
        params?: HttpParams,
        responseType?: any): Observable<any>;

    PUT(url: string, body: any, headers?: HttpHeaders, params?: HttpParams): Observable<any>;

    DELETE(url: string, headers?: HttpHeaders, params?: HttpParams): Observable<any>;

    API(api: HttpBaseModel, pathVariable?: string[]): string;

}
