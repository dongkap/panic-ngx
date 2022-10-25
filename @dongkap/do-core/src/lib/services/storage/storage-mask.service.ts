import { Inject, Injectable } from '@angular/core';
import { SecurityResourceModel } from '../../models';
import { OAUTH_INFO } from '../../providers/shared/oauth.provider';
import { EncryptionService } from '../security/encryption.service';
import { StorageFactoryService } from './storage-factory.service';

@Injectable({
    providedIn: 'root',
})
export class StorageMaskService implements StorageFactoryService {

    constructor(
        protected enc: EncryptionService,
        @Inject(OAUTH_INFO) private oauthResource: SecurityResourceModel) {}

    public getSessionStorageEnc(key: string): string {
        const keyEncrypted = this.enc.getHmacSha256(this.oauthResource['private_key'], key, true);
        if (sessionStorage.getItem(keyEncrypted)) {
            return this.enc.decryptAES(this.oauthResource['aes_key'], sessionStorage.getItem(keyEncrypted));
        } else {
            return null;
        }
    }

    public setSessionStorageEnc(key: string, value: string): void {
        const keyEncrypted = this.enc.getHmacSha256(this.oauthResource['private_key'], key, true);
        const valueEncrypted = this.enc.encryptAES(this.oauthResource['aes_key'], value);
        sessionStorage.setItem(keyEncrypted, valueEncrypted);
    }

    public removeSessionStorageEnc(key: string): void {
        const keyEncrypted = this.enc.getHmacSha256(this.oauthResource['private_key'], key, true);
        sessionStorage.removeItem(keyEncrypted);
    }

    public getLocalStorageEnc(key: string): string {
        const keyEncrypted = this.enc.getHmacSha256(this.oauthResource['private_key'], key, true);
        if (localStorage.getItem(keyEncrypted)) {
            return this.enc.decryptAES(this.oauthResource['aes_key'], localStorage.getItem(keyEncrypted));
        } else {
            return null;
        }
    }

    public setLocalStorageEnc(key: string, value: string): void {
        const keyEncrypted = this.enc.getHmacSha256(this.oauthResource['private_key'], key, true);
        const valueEncrypted = this.enc.encryptAES(this.oauthResource['aes_key'], value);
        localStorage.setItem(keyEncrypted, valueEncrypted);
    }

    public removeLocalStorageEnc(key: string): void {
        const keyEncrypted = this.enc.getHmacSha256(this.oauthResource['private_key'], key, true);
        localStorage.removeItem(keyEncrypted);
    }

    public getSessionStorage(key: string): string {
        return (key) ? sessionStorage.getItem(key) : null;
    }

    public setSessionStorage(key: string, value: string): void {
        sessionStorage.setItem(key, value);
    }

    public removeSessionStorage(key: string): void {
        sessionStorage.removeItem(key);
    }

    public getLocalStorage(key: string): string {
        return (key) ? localStorage.getItem(key) : null;
    }

    public setLocalStorage(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    public removeLocalStorage(key: string): void {
        localStorage.removeItem(key);
    }

    public clearSessionStorage(): void {
        sessionStorage.clear();
    }

    public clearLocalStorage(): void {
        localStorage.clear();
    }

    public clearAll(): void {
        sessionStorage.clear();
        localStorage.clear();
    }

}
