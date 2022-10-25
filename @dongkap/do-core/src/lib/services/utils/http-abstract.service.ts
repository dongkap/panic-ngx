import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { HttpFactoryService } from './http-factory.service';
import { HttpBaseModel } from '../../models';

export abstract class HttpAbstractService implements HttpFactoryService {

  public abstract HTTP_AUTH(
    api: HttpBaseModel,
    body?: any,
    headers?: HttpHeaders,
    params?: HttpParams,
    pathVariable?: string[],
    responseType?: any): Observable<any>;
  public abstract HTTP_BASE(
    api: HttpBaseModel,
    body?: any,
    headers?: HttpHeaders,
    params?: HttpParams,
    pathVariable?: string[],
    responseType?: any): Observable<any>;
  public abstract GET(
    url: string,
    headers?: HttpHeaders,
    params?: HttpParams,
    responseType?: any): Observable<any>;
  public abstract POST(
    url: string,
    body: any,
    headers?: HttpHeaders,
    params?: HttpParams,
    responseType?: any): Observable<any>;
  public abstract PUT(url: string, body: any, headers?: HttpHeaders, params?: HttpParams): Observable<any>;
  public abstract DELETE(url: string, headers?: HttpHeaders, params?: HttpParams): Observable<any>;

  public API(api: HttpBaseModel, pathVariable?: string[]): string {
    let url: string = api.server.protocol +
                    '://' +
                    api.server.host +
                    ((api.server.port) ? ':' + api.server.port : '') +
                    api.path;
    if (pathVariable) {
      pathVariable.forEach(path => {
        url = url + '/' + path;
      });
    }
    return url;
  }

}
