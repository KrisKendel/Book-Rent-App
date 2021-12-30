import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    usersUrl = 'http://localhost:3000/users';

    constructor(private http: HttpClient) { }

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.usersUrl}`);
    }

    getUser(userID: number): Observable<User> {
        return this.http.get<User>(`${this.usersUrl}/${userID}`);
    }

    createUser(newUser: User): Observable<any> {
        return this.http.post(`${this.usersUrl}`, newUser);
    }

    deleteUser(userID: number): Observable<any> {
        return this.http.delete(`${this.usersUrl}/${userID}`);
    }

    editUser(userID: number, editFormValue): Observable<User> {
        return this.http.patch<User>(`${this.usersUrl}/${userID}`, editFormValue);
    }
}
