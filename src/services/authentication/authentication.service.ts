import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

    private loginUrl = 'http://localhost:3000/login';
    constructor(private http: HttpClient) {}


    async register(username, password): Promise<any> {
       return this.http.post(this.loginUrl, {username, password})
        .toPromise()
        .then(res => {
           return JSON.stringify(res);
    }).catch((err) => {
        console.log(err);
    });
    }

    async login(): Promise<any> {
        return this.http.get(this.loginUrl)
         .toPromise()
         .then(res => {
             return res;
         }).catch((err) => {
             console.log(err);
         });
    }
}
