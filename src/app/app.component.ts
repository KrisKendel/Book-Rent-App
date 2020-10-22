import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'books-app';
  public loginUrl = "http://localhost:3000/login";
  public userID: number;

  constructor(
    public router: Router,
    public http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: StorageService,) {}

  logout() {
    this.userID = (JSON.parse(this.storage.get('user'))).id;
    this.http.delete(`${this.loginUrl}/${this.userID}`).toPromise()
    this.storage.clear();
    this.router.navigate(['']);
  }
}
