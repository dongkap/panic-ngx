import { Injectable, Inject, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
    API,
    APIModel,
    HttpFactoryService,
    HTTP_SERVICE,
    UserModel,
    UserService,
} from '@dongkap/do-core';
import { ProfileIndexedDBService } from './storage/profile-indexeddb.service';

@Injectable()
export class AuthUserService extends UserService implements OnDestroy {

    constructor(
        private profileIndexedDB: ProfileIndexedDBService,
        @Inject(API)private apiPath: APIModel,
        @Inject(HTTP_SERVICE)private httpBaseService: HttpFactoryService) {
        super();
    }

    private loaderUserSubject$ = new Subject<UserModel>();
    private destroy$: Subject<any> = new Subject<any>();

    ngOnDestroy(): void {
      this.destroy$.next(true);
      this.destroy$.complete();
      this.destroy$.unsubscribe();
    }

    public loadUser(): void {
        this.profileIndexedDB.get('image').then((checksum: string) => {
            this.putImageBase64(checksum);
        });
        this.httpBaseService.HTTP_AUTH(
            this.apiPath['profile']['get-profile'])
            .pipe(takeUntil(this.destroy$))
            .subscribe((response: any) => {
                Promise.all([
                    this.profileIndexedDB.put('name', response['name']),
                    this.profileIndexedDB.put('email', response['email']),
                    this.profileIndexedDB.put('image', response['image']),
                ]).then();
            });
    }

    public updateName(name: string): Observable<UserModel> {
        this.profileIndexedDB.put('name', name).then(() => {
            this.awaitUser();
        });
        return this.loaderUserSubject$.asObservable();
    }

    public updatePhoto(checksum: string): Observable<UserModel> {
        this.profileIndexedDB.put('image', checksum).then(() => {
            this.putImageBase64(checksum);
        });
        return this.loaderUserSubject$.asObservable();
    }

    public get onUserChange(): Observable<UserModel> {
        this.awaitUser();
        return this.loaderUserSubject$.asObservable();
    }

    private awaitUser(): void {
        Promise.all([
          this.profileIndexedDB.get('name'),
          this.profileIndexedDB.get('image-base64'),
        ]).then((value: any[]) => {
            const user: UserModel = {
                name: value[0],
                image: value[1],
            };
            this.loaderUserSubject$.next(user);
        });
    }

    private putImageBase64(checksum: any): void {
        if (checksum) {
            this.httpBaseService.HTTP_AUTH(
            this.apiPath['profile']['get-photo-profile'], null, null, null,
            [checksum], 'arraybuffer')
            .pipe(takeUntil(this.destroy$))
            .subscribe((response: any) => {
                const imageBlob = new Blob([response], {
                    type: 'image/png',
                });
                const reader: FileReader = new FileReader();
                reader.readAsDataURL(imageBlob);
                reader.onloadend = () => {
                    const imageBase64: string = reader.result.toString();
                    this.profileIndexedDB.put('image-base64', imageBase64).then(() => {
                        this.awaitUser();
                    });
                };
            });
        }
    }

}
