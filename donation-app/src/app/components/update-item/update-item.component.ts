import { Router } from '@angular/router';
import { ItemsService } from './../../items.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css'],
})
export class UpdateItemComponent implements OnInit {
  constructor(private itemService: ItemsService, private router: Router) {}

  item = this.itemService.getItemToBeUpdated();

  ngOnInit(): void {}

  updateItem() {
    this.itemService.updateItem(this.item).subscribe(
      (res:any)=>{
        console.log('successful');
        this.router.navigateByUrl('dashboard');
      },
      (err)=>{
        console.log(err);
      }
    );
  }
}
