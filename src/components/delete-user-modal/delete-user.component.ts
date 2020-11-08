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
  public userIDValue: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: object,
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    for (const id in this.user){
      if (this.user.hasOwnProperty(id)) {
        this.userIDValue = this.user[id];
      }
    }
  }

  public async onDeleteUser(): Promise<void> {
    this.userService.deleteUser(this.userIDValue)
      .then(() => this.router.navigateByUrl('/dashboard/all-users'))
      .catch(err => console.log(err));
 }

  closeDialog(): void {
    this.dialog.closeAll();
  }

}
