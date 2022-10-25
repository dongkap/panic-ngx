import { Injectable } from '@angular/core';

@Injectable()
export class AuthForceService {

    private user: string;
    private pass: string;

    public isEmpty(): boolean {
        return (this.user && this.pass) ? false: true;
    }

    public setData(user: string, pass: string) {
        this.user = user;
        this.pass = pass;
    }

    public get username(): string {
        return this.user;
    }

    public get password(): string {
        return this.pass;
    }

}
