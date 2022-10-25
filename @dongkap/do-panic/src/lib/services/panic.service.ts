import { Injectable, Inject } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { PANIC_INDEXED_DB, IndexedDBFactoryService } from '@dongkap/do-core';

@Injectable()
export class PanicService {

    private loaderPanicSubject$ = new Subject<string>();

    constructor(@Inject(PANIC_INDEXED_DB) private panicIndexedDB: IndexedDBFactoryService) {
    }

    public notifyPanic(data: any): void {
        this.panicIndexedDB.put(data['panicCode'], data).then(() => {
            this.loaderPanicSubject$.next(data['panicCode']);
        });
    }

    public putAllPanic(datas: any[]): void {
        datas.forEach(data => {
            this.panicIndexedDB.put(data['panicCode'], data).then();
        });
    }

    public clearAllPanic(): Promise<void> {
        return this.panicIndexedDB.clearAll();
    }

    public getPanic(panicCode: string): Promise<any> {
        return this.panicIndexedDB.get(panicCode);
    }

    public getAllPanic(): Observable<any[]> {
        return this.panicIndexedDB.getAllOf();
    }

    public onCheckPanic(): Observable<string> {
        return this.loaderPanicSubject$.asObservable();
    }

}