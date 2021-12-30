import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/models/user';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  addCreateForm: FormGroup;
  firstName: string;
  lastName: string;
  dateCreated: string;
  newUser: User;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.addCreateForm = this.formBuilder.group({
      firstName: [this.firstName, [Validators.required]],
      lastName: [this.lastName, [Validators.required]],
      dateCreate: [this.dateCreated, [Validators.required]],
    });
  }

  onCreateUser(): void {
    this.newUser = this.addCreateForm.value;
    this.userService.createUser(this.newUser).subscribe();
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

}
