import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  model ={
    email: '',
    password: ''

  }
  serverErrorMessages: string = '';

  ngOnInit(): void {}

  signIn(): void {
    this.userService.login(this.model).subscribe(
      (res:any) => {
        if(res['token']){
          localStorage.setItem('token', res['token']);
          this.userService.setToken(res['token']);
          this.userService.loginStatus = true;
          this.router.navigateByUrl('dashboard');
        }
        console.log(res);
        
        //localStorage.setItem('token', res.token);
      },
      err => {
        this.serverErrorMessages = err.error.message;

      }
    );
  }
}
