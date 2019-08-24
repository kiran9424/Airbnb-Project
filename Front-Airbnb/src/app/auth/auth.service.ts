import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import * as moment from 'moment';

const jwt = new JwtHelperService();

class DecodeToken {
    exp: number = 0;
    username: string = '';
}
@Injectable({ providedIn: 'root' })
export class AuthService {

    private decodedToken;

    constructor(private http: HttpClient) {
        this.decodedToken = JSON.parse(localStorage.getItem('booking-meta')) || new DecodeToken();
    }

    private saveToken(token: any): string {

        this.decodedToken = jwt.decodeToken(token);
        localStorage.setItem('booking', token);
        localStorage.setItem('booking-meta', JSON.stringify(this.decodedToken));
        return token;
    }

    register(data): Observable<any> {
        return this.http.post('api/v1/users/register', data);
    }

    login(data: any): Observable<any> {
        return this.http.post('api/v1/users/auth', data).pipe(map(
            (token: string) => this.saveToken(token)));

    }

    private getExpirtaion() {
        return moment.unix(this.decodedToken.exp);
    }
    public isAuthenticated(): boolean {
        return moment().isBefore(this.getExpirtaion());
    }

    public logout() {
        localStorage.removeItem('booking');
        localStorage.removeItem('booking-meta');
        this.decodedToken = new DecodeToken();

        //return this.http.post('/api/signout');
    }
    public getUsername() {
        return this.decodedToken.username;
    }
    public getAuthToken(): string {
        return localStorage.getItem('booking');
    }
}