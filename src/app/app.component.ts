import { Component, Inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { fader } from '../app/route-animations';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
     fader,
  ]
})
export class AppComponent {
  title = 'books-app';
  public userID: number;

  constructor(
    public router: Router,
    public http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: StorageService, ) {}

  logout(): void {
    this.userID = (this.storage.get('user')).id;
    this.storage.clear();
    this.router.navigate(['']);
  }

  prepareRoute(outlet: RouterOutlet): void {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
