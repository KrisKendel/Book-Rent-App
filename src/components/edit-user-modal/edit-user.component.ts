import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserModalComponent implements OnInit {
  public userFetch: any;
  public usersUrl = 'http://localhost:3000/users';
  public userEdit: any;
  public addEditForm: FormGroup;
  public userID: number;
  public userEdited: User;
  public firstName: string;
  public lastName: string;
  public dateCreate: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: object,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
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
     .then(user => {
       this.userEdit = user;
       this.addEditForm = this.formBuilder.group({
         firstName: [this.userEdit.firstName, [Validators.required]],
         lastName: [this.userEdit.lastName, [Validators.required]],
         dateCreate: [this.userEdit.dateCreate, [Validators.required]]
       });
      }).catch(err => {
        console.log(err);
      });
  }

  public async onEditUser(): Promise <void> {
    this.userService.editUser(this.userID, this.addEditForm.value)
     .then((user: User) => {
       this.userEdited = user;
       this.router.navigateByUrl('/dashboard/all-users');
     })
     .catch(err => {
       console.log(err);
     });
 }

 closeDialog(): void {
    this.dialog.closeAll();
}}
