import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';

@Injectable()
export class AuthGuard implements CanActivate {

constructor(
  private router: Router,
  @Inject(LOCAL_STORAGE) private storage: StorageService
) { }

public canActivate(): boolean {
  if(this.storage.get('user')) {
    return true
  }
  else {
    alert("Not logged in!")
  this.router.navigate(['']);
  return false
  }
  }
}
