import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/users.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  userDetails = new User();

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (res:any) => {
        this.userDetails = res['user'];
        //this.userid = res._id;
        console.log(this.userDetails);
        //console.log(res._id);
      },
      (err:any) => {}
    );
  }

  logout(){
    this.userService.deleteToken();
    this.userService.loginStatus = false;
    this.userDetails = new User();
    this.router.navigateByUrl('/login');
  }

  viewProfile(){
    this.router.navigateByUrl('profile');
  }

  donate(){
    this.router.navigateByUrl('add');
  }
}
