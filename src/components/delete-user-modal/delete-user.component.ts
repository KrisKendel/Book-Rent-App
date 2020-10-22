import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  public usersUrl: string = 'http://localhost:3000/users';
  public userIDValue: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: Object,
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    for(let id in this.user){
      
      if(this.user.hasOwnProperty(id)) {
        this.userIDValue = this.user[id]
        console.log(this.userIDValue)
      }
    }
  }

  public async onDeleteUser() {
    await this.http.delete(`${this.usersUrl}/${this.userIDValue}`).toPromise()
      .then(() => {
        this.router.navigateByUrl('/dashboard/all-users');
      }).catch(err =>{
        console.log(err);
      })
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

}
