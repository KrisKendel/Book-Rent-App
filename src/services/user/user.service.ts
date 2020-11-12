import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    public usersUrl = 'http://localhost:3000/users';

    constructor(private http: HttpClient) { }

    async getAllUsers(): Promise<User[]> {
        return this.http.get<User[]>(`${this.usersUrl}`).toPromise();
    }

    async getUser(userID: number): Promise<User> {
        return this.http.get<User>(`${this.usersUrl}/${userID}`).toPromise();
    }

    async createUser(newUser: User): Promise<void> {
        await this.http.post(`${this.usersUrl}`, newUser).toPromise();
    }

    async deleteUser(userID: number): Promise<void> {
        await this.http.delete(`${this.usersUrl}/${userID}`).toPromise();
    }

    async editUser(userID: number, editFormValue): Promise<any> {
        await this.http.patch<User>(`${this.usersUrl}/${userID}`, editFormValue).toPromise();
    }
}
