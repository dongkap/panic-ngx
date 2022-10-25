import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpAbstractService } from './http-abstract.service';
import { HttpBaseModel, signatureHeader, HttpMethod } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class HttpCommonService extends HttpAbstractService {

  constructor(protected http: HttpClient) {
    super();
  }

  public HTTP_AUTH(
                    api: HttpBaseModel,
                    body?: any,
                    headers?: HttpHeaders,
                    params?: HttpParams,
                    pathVariable?: string[],
                    responseType?: 'json' | 'arraybuffer'): Observable<any> {
    if (headers) {
      headers = headers.append(signatureHeader.mark, 'true');
    } else { headers = new HttpHeaders().append(signatureHeader.mark, 'true'); }
    responseType = responseType ? responseType : 'json';
    return this.HTTP_BASE(api, body, headers, params, pathVariable, responseType);
  }

  public HTTP_BASE(
                    api: HttpBaseModel,
                    body?: any,
                    headers?: HttpHeaders,
                    params?: HttpParams,
                    pathVariable?: string[],
                    responseType?: 'json' | 'arraybuffer'): Observable<any> {
    let response: Observable<any> = null;
    responseType = responseType ? responseType : 'json';
    switch (api.method) {
      case HttpMethod.POST:
        response = this.POST(this.API(api, pathVariable), body, headers, params, responseType);
        break;
      case HttpMethod.PUT:
        response = this.PUT(this.API(api, pathVariable), body, headers, params);
        break;
      case HttpMethod.DELETE:
        response = this.DELETE(this.API(api, pathVariable), headers, params);
        break;
      default:
        response = this.GET(this.API(api, pathVariable), headers, params, responseType);
        break;
    }
    return response;
  }

  public GET(url: string, headers?: HttpHeaders, params?: HttpParams, responseType?: any): Observable<any> {
    return this.http.get(url, {headers, params, responseType});
  }

  public POST(url: string, body: any, headers?: HttpHeaders, params?: HttpParams, responseType?: any):
    Observable<any> {
    return this.http.post(url, body, {headers, params, responseType});
  }

  public PUT(url: string, body: any, headers?: HttpHeaders, params?: HttpParams): Observable<any> {
    return this.http.put(url, body, {headers, params});
  }

  public DELETE(url: string, headers?: HttpHeaders, params?: HttpParams): Observable<any> {
    return this.http.delete(url, {headers, params});
  }

}
