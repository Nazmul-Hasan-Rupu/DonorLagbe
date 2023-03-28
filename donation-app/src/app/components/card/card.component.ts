import { Router } from '@angular/router';
import { ItemsService } from './../../items.service';
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/Item';
import { User } from 'src/app/User';
import { UserService } from 'src/app/users.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  constructor(private itemsService: ItemsService, private router: Router, private userService: UserService) {}
  items!: Item[];
  userDetails = new User();
  selectedItem = new Item();

  ngOnInit(): void {
    this.refreshItemList();
    this.userService.getUserProfile().subscribe(
      (res:any) => {
        this.userDetails = res['user'];
        //this.userid = res._id;
        console.log(this.userDetails);
        console.log(this.userDetails._id);
        //console.log(res._id);
      },
      (err:any) => {}
    );
  }

  refreshItemList(){
    console.log('called')
    this.itemsService.getItems().subscribe(
      (res:any) => {
        this.itemsService.items = res as Item[];
        this.items = this.itemsService.items;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteItem(item: Item): void {
    //this.items = this.ItemsService.deleteItem(item);
  }

  updateItem(item: Item, i: any): void {
    this.itemsService.setItemToBeUpdated(item, i);
    this.router.navigate(['update-item']);
  }

  onClick(givenItem: Item){
    this.selectedItem = givenItem;
  }

  delete(){
    this.itemsService.deleteItem(this.selectedItem).subscribe(
      (res)=>{
        this.refreshItemList();
      }
    );
  }

  claim(){
    console.log('claimed');
    this.itemsService.claimItem(this.selectedItem, this.userDetails._id).subscribe(
      (res)=>{
        console.log(res);
        console.log('successfully requested')
      }
    )
  }

  onClickViewDetails(givenItem: Item){
    this.itemsService.selectedItem = givenItem;
    this.router.navigateByUrl('view-details');
  }
  

}
