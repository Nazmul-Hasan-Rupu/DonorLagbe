import { Item } from './Item';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  items!: Item[];
  constructor(private http:HttpClient) {}

  itemToBeUpdated = new Item();
  selectedItem = new Item();
  itemToBeUpdatedIndex: any = 0;
  tempURL: string='';
  model = {
    userID: ''
  }

  getItems() {
    return this.http.get(environment.apiBaseUrl+ '/products');
  }

  deleteItem(givenItem: Item) {
    return this.http.delete(environment.apiBaseUrl+'/product/'+ givenItem._id);
  }

  claimItem(givenItem: Item, requesterID: string){
    this.tempURL = environment.apiBaseUrl + '/product/join/' + givenItem._id;
    this.model.userID = requesterID;
    console.log(this.model, this.tempURL);
    return this.http.put(this.tempURL,this.model);
  }

  setItemToBeUpdated(givenitem: Item, i: number) {
    this.itemToBeUpdated = givenitem;
    this.itemToBeUpdatedIndex = i;
  }

  getItemToBeUpdated(): Item {
    return this.itemToBeUpdated;
  }

  updateItem(givenItem: Item) {
    return this.http.put(environment.apiBaseUrl+'/product/'+ givenItem._id, givenItem);
  }

  addItem(givenItem: Item) {
    return this.http.post(environment.apiBaseUrl+'/addproduct', givenItem)
  }
}
