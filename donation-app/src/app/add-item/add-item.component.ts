import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../Item';
import { ItemsService } from '../items.service';
import { User } from '../User';
import { UserService } from '../users.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  constructor(private userService: UserService,private router: Router, private itemService: ItemsService) { }

  userDetails = new User();
  item = new Item();

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (res:any) => {
        this.userDetails = res['user'];
        this.item.uploaderID = this.userDetails._id;
        console.log(this.userDetails._id);
        //this.userid = res._id;
        console.log(this.userDetails);
        //console.log(res._id);
      },
      (err:any) => {}
    );
    
    this.item.uploadDate = new Date().toString();
    this.item.isAvailable = true;
  }

  onSubmit(){
    this.itemService.addItem(this.item).subscribe(
      (res)=>{
        console.log('successful');
        this.router.navigateByUrl('dashboard');
      }
    )
  }

}
