import { Component, OnInit } from '@angular/core';
import { Item } from '../Item';
import { ItemsService } from '../items.service';
import { User } from '../User';
import { UserService } from '../users.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {

  constructor(private itemService: ItemsService, private userService: UserService) { }
  item = new Item();
  requesterIDSet = new Set<string>();
  requesters = new Set<User>();
  ngOnInit(): void {
    this.item = this.itemService.selectedItem;
    this.getUserList();
    
  }

  getUserList(){
    this.item.requesters.forEach(requesterID => {
      this.requesterIDSet.add(requesterID);
     } );
    this.requesterIDSet.forEach(requesterID => {
      this.userService.getSingleUser(requesterID).subscribe(
        res=>{
          this.requesters.add(res as User);
        },
        err=>{
          console.log(err);
        }
      )
    });
  }

}
