import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from '../../components/delete-user-modal/delete-user.component';
import { EditUserModalComponent } from '../../components/edit-user-modal/edit-user.component';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  usersUrl = 'http://localhost:3000/users';
  userID: number;
  fetchedUser: User;
  error: Error;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userID = this.activatedRoute.snapshot.params.userID;
    this.fetchUser(this.userID);
  }

  private async fetchUser(userID: number): Promise<void> {
    this.userService.getUser(userID)
      .subscribe((user: User) => {
        this.fetchedUser = user;
      },
        (error) => {
          this.error = error;
        });
  }

  openEditModal(): void {
    this.dialog.open(EditUserModalComponent, { width: '640px', disableClose: true, data: { userID: this.userID } });
  }

  openDeleteModal(): void {
    this.dialog.open(DeleteUserComponent, { width: '640px', disableClose: true, data: { userID: this.userID } });
  }

}
