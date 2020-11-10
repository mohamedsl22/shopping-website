import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {user} from './user'


interface logInStatus{
  success:Boolean;
  userInfo:user;
}
interface status{
  success:Boolean;
}
interface carts{
  number:Number;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public admin = false;
  userInfo: user =JSON.parse(localStorage.getItem('lastLogedIn'))

  constructor(private http:HttpClient) { }


  registerUser(usr:user):Observable<status>{
    return this.http.post<status>('/api/posts/users',usr)
  }


  logInUser(usr){
    return this.http.post<logInStatus>('/api/posts/users/login',usr)
  }
  
  onPurchae(number){
    return this.http.post<status>('/api/posts/carts',{"number":number,"_id":"12341234"})
  }
  
  getPurchaseNum():Observable<carts>{
    return this.http.get<carts>('/api/posts/carts')
  }

}
