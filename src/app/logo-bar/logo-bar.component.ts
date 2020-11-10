import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-logo-bar',
  templateUrl: './logo-bar.component.html',
  styleUrls: ['./logo-bar.component.css']
})
export class LogoBarComponent implements OnInit {

  constructor(private router:Router,public _user:UsersService) {

   }

  ngOnInit(): void {
  }

  registerOrSignout(){
    if(this._user.userInfo==null){
      this.router.navigate(['/signUp'])
    }
    else{
      localStorage.removeItem('lastLogedIn');
      this._user.userInfo=null
      this.router.navigate(['/LogIn'])
    }
  }

}
