import { Injector } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { API, APIModel, HttpFactoryService, HTTP_SERVICE } from '@dongkap/do-core';

export abstract class BaseComponent<T> {

    protected response: T;
    protected api: APIModel;
    protected http: HttpFactoryService;
    protected destroy$: Subject<any> = new Subject<any>();
    protected progressDOM: HTMLElement;

    constructor(protected injector: Injector) {
        this.api = injector.get(API);
        this.http = injector.get(HTTP_SERVICE);
    }

    protected exec(
        serviceName: string, apiName: string, body?: any, headers?: HttpHeaders,
        params?: HttpParams, pathVariable?: string[], responseType?: any): Observable<any> {
        return this.http.HTTP_AUTH(
            this.api[serviceName][apiName],
            body,
            headers,
            params,
            pathVariable,
            responseType);
    }

    protected initProgress(): void {
        document.querySelectorAll('.pace-done').forEach(pace => {
        pace.className = pace.className.replace('pace-done pace-done', 'pace-running');
        pace.className = pace.className.replace('pace-done', 'pace-running');
        });
        document.querySelectorAll('.pace-inactive').forEach(pace => {
        pace.className = pace.className.replace('pace-inactive pace-inactive', 'pace-active');
        pace.className = pace.className.replace('pace-inactive', 'pace-active');
        });
        this.progressDOM = document.getElementsByClassName('pace-progress').item(0) as HTMLElement;
    }

    protected doneProgress() {
        document.querySelectorAll('.pace-running').forEach(pace => {
        pace.className = pace.className.replace('pace-running', 'pace-done');
        });
        document.querySelectorAll('.pace-active').forEach(pace => {
        pace.className = pace.className.replace('pace-active', 'pace-inactive');
        });
    }

    protected setProgress(progress: number) {
        this.progressDOM.style.transform = 'translate3d(' + progress + '%, 0px, 0px)';
        this.progressDOM.getAttributeNode('data-progress-text').value = progress + '%';
        this.progressDOM.getAttributeNode('data-progress').value = progress.toString();
    }

}
