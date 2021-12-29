import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  userIDValue: number;
  error: Error;

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: object,
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    for (const id in this.user) {
      if (this.user.hasOwnProperty(id)) {
        this.userIDValue = this.user[id];
      }
    }
  }

  onDeleteUser(event): void {
    event.stopPropagation();
    this.userService.deleteUser(this.userIDValue)
      .subscribe(() => {
        this.router.navigateByUrl('/dashboard/all-users');
      }, (error) => this.error = error);
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

}
