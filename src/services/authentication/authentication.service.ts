import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

    private loginUrl = 'http://localhost:3000/login';
    constructor(private http: HttpClient) {}


    getAuthToken(username, password): any {
       return this.http.post(this.loginUrl, {username, password})
        .toPromise()
        .then(res => {
           return JSON.stringify(res);
    }).catch((err) => {
        console.log(err);
    });
    }
}
