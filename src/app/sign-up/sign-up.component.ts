import { Component, OnInit } from '@angular/core';
import {UsersService} from '../users.service'
import {user} from '../user'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  continue=false
  wrongPassword=false
  isDone=false

  newUser:user ={
    userID:0,
    firstName:"",
    lastName:"",
    city:"",
    street:"",
    logStatus:true,
    password:"",
    email:""
  }
  constructor(public _userSer:UsersService,private _router:Router) { }

  ngOnInit(): void {
  }


  submitFirstForm(event:any ){
    if(event.target.userID.value==""){
      event.target.userID.focus()
      return
    }
    if(event.target.email.value==""){
      event.target.email.focus()
      return
    }
    if(event.target.password.value==""){
      event.target.password.focus()
      return
    }
    if(event.target.confirmPassword.value==""){
      event.target.confirmPassword.focus()
      return
    }

    if(event.target.password.value != event.target.confirmPassword.value){
      this.wrongPassword=true
      return
    }
    else
    this.wrongPassword=false

    this.newUser.email=event.target.email.value
    this.newUser.userID=event.target.userID.value
    this.newUser.password=event.target.password.value


    this.continue = !this.continue

  }


  OnSubmit(event:any ){
    if(event.target.city.value==""){
      event.target.city.focus()
      return
    }
    if(event.target.street.value==""){
      event.target.street.focus()
      return
    }
    if(event.target.firstname.value==""){
      event.target.firstname.focus()
      return
    }
    if(event.target.lastname.value==""){
      event.target.lastname.focus()
      return
    }
    this.isDone=true

    this.newUser.city=event.target.city.value
    this.newUser.street=event.target.street.value
    this.newUser.firstName=event.target.firstname.value
    this.newUser.lastName=event.target.lastname.value
    
    this._userSer.registerUser(this.newUser).subscribe(data=>{if(data.success){ this._router.navigate(['/LogIn']);alert("Register is done successfully,\n Welcome to our Store!");this.isDone=false}}
    )
    
  }

}
