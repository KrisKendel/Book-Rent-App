import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from '../../components/delete-user-modal/delete-user.component';
import { EditUserModalComponent } from '../../components/edit-user-modal/edit-user.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  public usersUrl: string = 'http://localhost:3000/users';
  public userID: number;
  public fetchedUser: User;
  
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    
    this.userID = this.activatedRoute.snapshot.params['userID'];
    this.fetchUser(this.userID);
  }

  private async fetchUser(userID: number) {
    await this.http.get<User>(`${this.usersUrl}/${userID}`).toPromise()
    .then((user: User) => {
      this.fetchedUser = user
    }).catch(err => {
      console.log(err)
    });
  }

  openEditModal() {
    this.dialog.open(EditUserModalComponent,{width: '640px',disableClose: true, data: { userID: this.userID }});
  }

  openDeleteModal() {
    this.dialog.open(DeleteUserComponent,{width: '640px',disableClose: true,  data: { userID: this.userID }});
  }

}
