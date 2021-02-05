import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { AuthService } from 'src/services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {
  public username: string;
  public password: string;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  register(): void {
    this.auth.register(this.username, this.password).then(() => {
      this.router.navigate(['']);
    });
  }

}
