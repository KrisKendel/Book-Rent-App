import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router'; 
import { AuthService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})

export class LoginComponent implements OnInit {
  
  public loginForm: FormGroup
  loginUserData : {username: string, password:string}
  

  constructor(private auth: AuthService,
              private router: Router
    ) {}

  ngOnInit() {
    console.log(this.auth)
    this.loginUserData = {username :'', password : ''}
  }

  loginUser() {
    
    this.auth.loginUser(this.loginUserData)
     .subscribe(
       res => {console.log(res)
       localStorage.setItem('token', res.token)
       this.router.navigate(['/dashboard'])
      },
       err => console.log(err)
     )
     
  }
}