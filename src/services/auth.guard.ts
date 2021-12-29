import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
  ) { }

  canActivate(): boolean {
    if (localStorage.getItem('user')) {
      return true;
    }
    else {
      alert('Not logged in!');
      this.router.navigate(['']);
      return false;
    }
  }
}
