import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserModalComponent implements OnInit {
  public userFetch: any;
  public usersUrl: string = 'http://localhost:3000/users';
  public userEdit: any;
  public addEditForm: FormGroup;
  public userID: number;
  public userEdited: User;
  public firstName: string;
  public lastName: string;
  public dateCreate: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: Object,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    
  ) { }

  ngOnInit(): void {
    for (let id in this.user) {
      if (this.user.hasOwnProperty(id)) {
        this.userID = this.user[id];
        if (this.userID) {
          this.userFetch = this.fetchUser(this.userID);
        }
      }
    }
  }

  private async fetchUser(userID: number){
    this.userFetch = await this.http.get<User>(`${this.usersUrl}/${userID}`).toPromise()
     .then(user => {
       this.userEdit = user

       this.addEditForm = this.formBuilder.group({
         firstName: [this.userEdit.firstName, [Validators.required]],
         lastName: [this.userEdit.lastName, [Validators.required]],
         dateCreate: [this.userEdit.dateCreate, [Validators.required]]
       });
      }).catch(err => {
        console.log(err)
      })
  }

  public async onEditUser() {
    await this.http.patch<User>(`${this.usersUrl}/${this.userID}`, this.addEditForm.value)
     .toPromise()
     .then((user: User) =>{
       this.userEdited = user;
       this.router.navigateByUrl('/dashboard/all-users');
     })
     .catch(err =>{
       console.log(err)
     });
 }


  closeDialog(): void {
    this.dialog.closeAll();
  }
}