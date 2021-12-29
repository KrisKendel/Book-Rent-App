import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from 'src/components/create-user-modal/create-user.component';
import { UserService } from 'src/services/user/user.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  public users: User[];
  public displayedColumns: string[] = ['firstName', 'lastName', 'dateCreate', 'deleteUser'];
  public dataSource: any = [];
  public userID: number;

  constructor(
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  public async getUsers(): Promise<void> {
    this.userService.getAllUsers()
      .subscribe((users) => {
        this.users = users;
        this.dataSource = new MatTableDataSource(this.users);
      },
        (err => {
          console.log(err);
        }));

  }

  openCreateModal(): void {
    this.dialog.open(CreateUserComponent, { width: '640px', disableClose: true });
  }
}
