import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/User';
import { UserService } from 'src/app/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  //dit it figure out any changes?

  selectedUser = new User();
  passwordMismatch : boolean = false;
  cPassword: string = "";
  constructor(private userService: UserService, private router: Router) { }
  serverErrorMessages: string = "";
  
  ngOnInit(): void {}

  signUp(): void {
    console.log('sign up clicked');
    console.log(this.selectedUser);
    this.passwordMismatch = false;
    if(this.selectedUser.password!= this.cPassword){
        this.passwordMismatch = true;
        this.serverErrorMessages = 'passwords mismatch!';
        return;
    }
    
    this.userService.postUser(this.selectedUser).subscribe(
      res => {
        this.router.navigateByUrl('dashboard');
      },
      err => {
        if(err.status == 422){
          this.serverErrorMessages = err.error.join('<br/>');

        }
        else{
          this.serverErrorMessages = "Something went wrong";
        }
      }
    )
    //this.router.navigate(['login']);
  }

  resetForm(){
    this.selectedUser.fullName = "";
    this.selectedUser.email = "";
    this.selectedUser.address = "";
    this.selectedUser.phoneNumber = "";
    this.selectedUser.password = "";
    this.cPassword = "";
    this.serverErrorMessages = "";
  }

  hasAccount(){
    this.router.navigateByUrl('login');
  }

}
