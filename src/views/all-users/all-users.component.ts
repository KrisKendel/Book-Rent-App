import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  public usersUrl: string = 'http://localhost:3000/users';
  public users: any;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  public async getAllUsers() {
    await this.http.get(`${this.usersUrl}`).toPromise()
      .then((users) => {
        this.users = users;
        console.log(this.users)
      })
     .catch(err => {
        console.log(err)
     })
  }

}
