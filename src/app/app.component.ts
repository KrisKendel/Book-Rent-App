import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'books-app';
  userID: number;

  constructor(
    public router: Router,
  ) { }

  logout(): void {
    this.userID = JSON.parse(localStorage.getItem('user')).id;
    localStorage.clear();
    this.router.navigate(['']);
  }
}
