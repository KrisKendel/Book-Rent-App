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

  ngOnInit() {
   
  }
  login() {
    this.auth.getAuthToken(this.username, this.password).then(res => {
      this.storage.set('user', res);
      this.router.navigate(['dashboard'])
    })
  }
}