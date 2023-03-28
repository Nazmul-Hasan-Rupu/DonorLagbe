import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../User';
import { UserService } from '../users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
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

  back(){
    this.router.navigateByUrl('dashboard');
  }

}
