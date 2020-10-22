import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from 'src/components/create-user-modal/create-user.component';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  public usersUrl: string = 'http://localhost:3000/users';
  public users: any;
  public displayedColumns: string[] = ['firstName', 'lastName', 'dateCreate', 'deleteUser'];
  public dataSource: any = [];
  public userID: number

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  public async getAllUsers() {
    await this.http.get(`${this.usersUrl}`).toPromise()
      .then((users) => {
        this.users = users;
        this.dataSource = new MatTableDataSource(this.users);
      })
     .catch(err => {
        console.log(err)
     })
  }
  
  openCreateModal() {
    this.dialog.open(CreateUserComponent,{ width: '640px',disableClose: true });
  }
}
