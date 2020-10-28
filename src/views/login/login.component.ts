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
  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  login(): void {
    this.auth.login().then(res => {
      for (const user of res) {
        if (this.username === user.username && this.password === user.password) {
          console.log('Uspjesno!!');
          this.storage.set('user', user);
          this.router.navigate(['dashboard']);
        }
        else {
          console.log('neuspjesno!!');
          alert('User does not exist, please register!!');
        }
      }
    });
  }
}
