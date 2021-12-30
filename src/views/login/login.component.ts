import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})

export class LoginComponent implements OnInit {
  username: string;
  password: string;
  isLoggined = false;
  isSubmitted = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  login(): void {
    this.auth.login().then(res => {
      for (const user of res) {
        if (btoa(this.username) === user.username && btoa(this.password) === user.password) {
          this.isLoggined = true;
          this.isSubmitted = true;
          localStorage.setItem('user', JSON.stringify(user));
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
