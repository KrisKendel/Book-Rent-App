import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/models/user';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  public usersUrl: string = 'http://localhost:3000/users';
  public addCreateForm: FormGroup;
  public firstName: string;
  public lastName: string;
  public dateCreated: string
  public newUser: User;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.addCreateForm = this.formBuilder.group({
      firstName: [this.firstName, [Validators.required]],
      lastName: [this.lastName, [Validators.required]],
      dateCreate: [this.dateCreated, [Validators.required]],
    });
  }

  public async onCreateUser() {
    this.newUser = this.addCreateForm.value;
   await this.http.post(this.usersUrl, this.newUser).toPromise()
 }

 closeDialog(): void {
  this.dialog.closeAll();
}

}
