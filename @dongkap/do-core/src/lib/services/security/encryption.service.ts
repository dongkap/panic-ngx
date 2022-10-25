import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class EncryptionService {

    private ivSize: number = 128;

    public getHmacSha256(secret: string, message: string, hex?: boolean): string {
        const hash = CryptoJS.HmacSHA256(message, secret);
        if (hex) {
            return CryptoJS.enc.Hex.stringify(hash).toUpperCase();
        }
        return CryptoJS.enc.Base64.stringify(hash);
    }

    public encryptAES(secretKey: string, message: string): string {
        const iv = CryptoJS.lib.WordArray.random(this.ivSize / 8);
        const key = CryptoJS.enc.Utf8.parse(secretKey);
        const encrypted = CryptoJS.AES.encrypt(message, key, {
            iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC,
        });
        const encryptMessage = iv.toString() + encrypted.toString();
        return encryptMessage;
    }

    public decryptAES(secretKey: string, encryptMessage: string): string {
        if (encryptMessage) {
            const iv = CryptoJS.enc.Hex.parse(encryptMessage.substr(0, 32));
            const key = CryptoJS.enc.Utf8.parse(secretKey);
            const encrypted = encryptMessage.substring(32);
            const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
              iv,
              padding: CryptoJS.pad.Pkcs7,
              mode: CryptoJS.mode.CBC,
            });
            try {
                return decrypted.toString(CryptoJS.enc.Utf8);
            } catch (error) {
                return null;
            }
        }
        return null;
    }

}
