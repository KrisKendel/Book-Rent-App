import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication/authentication.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})

export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  public isLoggined = false;
  public isSubmitted = false;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  login(): void {
    this.auth.login().then(res => {
      for (const user of res) {
        if (this.username === user.username && this.password === user.password) {
          this.isLoggined = true;
          this.isSubmitted = true;
          this.storage.set('user', user);
          return this.router.navigate(['dashboard']);
        }
        else {
          this.isSubmitted = true;
          this.isLoggined = false;
        }
      }
    });
  }
}
