import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User = new User();
  loginStatus: boolean = false;
  constructor(private http: HttpClient) { }

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  postUser(user: User){
    return this.http.post( environment.apiBaseUrl+'/register' , user, this.noAuthHeader)
  }

  login(authCredentials: any){
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials, this.noAuthHeader);
  }

  getUserProfile(){
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }

  getSingleUser(ID: string){
    //console.log()
    return this.http.get(environment.apiBaseUrl+'/requester/'+ID);
  }

  //helper methods

  setToken(token: string){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  deleteToken(){
    localStorage.removeItem('token');
  }

  getUserPayload(){
    var token = this.getToken();
    console.log('payload: ', token);
    if(token){
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

    isLoggedIn(){
      var userPayload = this.getUserPayload();
      if(userPayload){
        return userPayload.exp > Date.now()/1000;
      }
      else
        return false;
    }
}
