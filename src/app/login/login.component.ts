import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  lastLogedIn = JSON.parse(localStorage.getItem('lastLogedIn'))
  numOfProducts=-1
  numOfPurchases:Number=-1
  constructor(private _user:UsersService,private _p:ProductsService,private router:Router) {
    _user.admin=false
    if(this.lastLogedIn!=null)
      {
        this._user.userInfo=this.lastLogedIn
        this.router.navigate(['/Main'])
      }
   }

  ngOnInit(): void {
    this._p.getProducts().subscribe(data=>this.numOfProducts=data.length)
    this._user.getPurchaseNum().subscribe(data=>{this.numOfPurchases=data[0].number}
    )
  }


  checkUserInfo(event){

    if(event.target.userName.value==""){
      event.target.userName.focus()
      return
    }
    if( event.target.password.value==""){
      event.target.password.focus()
      return
    }

    let userInfo={
      email:event.target.userName.value,
      password:event.target.password.value
    }

    this._user.logInUser(userInfo).subscribe(data=>{
      if (data.success){
        this._user.userInfo=data.userInfo
        localStorage.setItem("lastLogedIn", JSON.stringify(data.userInfo));
        this.router.navigate(['/Main'])
      }
      else{
        alert("Invaild email or password!")
      }
    }
    ) 
    

  }

}
