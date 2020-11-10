import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import {  of } from "rxjs";
import { ProductsService } from '../products.service';
import { jsPDF } from "jspdf";
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderSuccessfuly=false
  numOfPurchases=0

  constructor(private _user:UsersService,private _product:ProductsService,private router:Router) { }

  ngOnInit(): void {
    this._user.getPurchaseNum().subscribe(data=>this.numOfPurchases= data[0].number)
  }


  autoFill(event){
    console.log(event.name);
    if(event.name=='street'){
      console.log("in strrrrrreeeet");
      
      event.value=this._user.userInfo.street
    }
    else if(event.name=='city'){
      event.value=this._user.userInfo.city
    }
    // else {

    // }
  }

  ValidateCreditCardNumber(ccNum) {
    var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    var mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    var amexpRegEx = /^(?:3[47][0-9]{13})$/;
    var discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
    var isValid = false;
    if (visaRegEx.test(ccNum)) {
      isValid = true;
    } else if(mastercardRegEx.test(ccNum)) {
      isValid = true;
    } else if(amexpRegEx.test(ccNum)) {
      isValid = true;
    } else if(discovRegEx.test(ccNum)) {
      isValid = true;
    }
    if(isValid) {
       return 1
    }
    return -1
  }



  downloadPDF(){
    const doc = new jsPDF();
    let textToWrite="";
    let totalprice=0
    for (let i = 0; i < this._product.orders.length; i++) {
      textToWrite+="Name: "+this._product.orders[i].pData.name;
      textToWrite+='\t';
      textToWrite+="Price: "+this._product.orders[i].pData.price;
      textToWrite+='\t';
      textToWrite+="Amount: "+this._product.orders[i].amount;
      textToWrite+='\n';

      totalprice+=this._product.orders[i].pData.price * this._product.orders[i].amount;
    } 
    textToWrite+="Total Price: " + totalprice

    
    doc.text(textToWrite, 10, 10);
    doc.save("bill.pdf");
  }


  onOrder(event){

    if(event.target.city.value==""){
      event.target.city.focus()
      return
    }
    if(event.target.street.value==""){
      event.target.street.focus()
      return
    }
    if(event.target.sDate.value==""){
      event.target.sDate.focus()
      return
    }
    if(event.target.cc.value==""){
      event.target.cc.focus()
      return
    }
    
    let cardNum = event.target.cc.value
    // if(this.ValidateCreditCardNumber(cardNum)==-1){
    //   alert("invaid credit number!")
    //   return
    // }

    this.orderSuccessfuly=true
    this._user.onPurchae(this.numOfPurchases+1).subscribe()
    localStorage.removeItem(this._user.userInfo.email+"");
  }


  afterOrder(){
    this.router.navigate(['/Main'])
  }
}
