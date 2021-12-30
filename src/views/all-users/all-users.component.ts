import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from 'src/components/create-user-modal/create-user.component';
import { UserService } from 'src/services/user/user.service';
import { User } from 'src/models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  users$: Observable<User[]>;
  displayedColumns: string[] = ['firstName', 'lastName', 'dateCreate', 'deleteUser'];
  userID: number;

  constructor(
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.users$ = this.userService.getAllUsers();
  }

  openCreateModal(): void {
    this.dialog.open(CreateUserComponent, { width: '640px', disableClose: true });
  }
}
