import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from 'src/services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserModalComponent implements OnInit {
  userFetch: any;
  usersUrl = 'http://localhost:3000/users';
  userEdit: any;
  addEditForm: FormGroup;
  userID: number;
  userEdited: User;
  firstName: string;
  lastName: string;
  dateCreate: Date;
  error: Error;

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: object,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    for (const id in this.user) {
      if (this.user.hasOwnProperty(id)) {
        this.userID = this.user[id];
        if (this.userID) {
          this.userFetch = this.fetchUser(this.userID);
        }
      }
    }
  }

  private async fetchUser(userID: number): Promise<any> {
    this.userService.getUser(userID)
      .subscribe(user => {
        this.userEdit = user;
        this.addEditForm = this.formBuilder.group({
          firstName: [this.userEdit.firstName, [Validators.required]],
          lastName: [this.userEdit.lastName, [Validators.required]],
          dateCreate: [this.userEdit.dateCreate, [Validators.required]]
        });
      },
        (err => {
          console.log(err);
        }));
  }

  onEditUser(e): void {
    e.preventDefault();
    this.userService.editUser(this.userID, this.addEditForm.value)
      .subscribe((user: User) => {
        this.userEdited = user;
        this.dialog.closeAll();
        this.router.navigateByUrl('/dashboard/all-users');
        this.snackBar.open('User sucessfully edited!', undefined, {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
      }, (error) => this.error = error);
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
