import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../products.service'
import {IProduct} from '../product'
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  showCart:boolean=true

  public mainClasses={
    'col-md-9':this.showCart,
    'col-md-12':!this.showCart
  }

  public productsArr:IProduct []
  public admin: boolean
  productToEdit:number
  searchResult=[]
  showModal: boolean = false;
  currIndex = -1
  wrongInput=false
  isOrder=false
  lastLogedIn = JSON.parse(localStorage.getItem('lastLogedIn'))
  isLoaded=false

  constructor(private _product:ProductsService , public _user:UsersService,private router:Router) {
    
   }

  ngOnInit(): void {
    if(this.lastLogedIn==null){
      this.router.navigate(['LogIn'])
    }
    if(this.lastLogedIn.email=="admin"){
      this._user.admin=true
    }
    this._product.getProducts()
    this._product.getProducts().subscribe(data=>{this.productsArr=data;this._product.allProducts=data;this.isLoaded=true})
      this.productsArr=this._product.allProducts
    this.admin=this._user.admin
  }


  addOrder(indx){
    this.currIndex=indx
    this.showModal=true
  }

  onSubmitOrder(event:any){
    
    if(event.target.amount.value <1){
      event.target.amount.value=""
      this.wrongInput=true
      return
    }
    this.showModal=false
    this.wrongInput=false

    for(let i=0;i<this._product.orders.length;i++){
      if(this._product.orders[i].pData.id == this.productsArr[this.currIndex]._id){
        this._product.orders[i].amount += +event.target.amount.value
        event.target.amount.value=""
        return
      }
    }

    let p 
    p= {
      amount:+event.target.amount.value,
      pData:this.productsArr[this.currIndex]
    }
    this._product.orders.push(p)
    event.target.amount.value=""
    localStorage.setItem(this._user.userInfo.email+"", JSON.stringify(this._product.orders));
  }

  editProduct(i){
    this.productToEdit=i
  }

  productsToShow(category){
    switch(category){
      case 1:
        this.productsArr = this._product.allProducts.filter(p=>(p.category == "milk & eggs"))
        break
      case 2:
        this.productsArr = this._product.allProducts.filter(p=>(p.category == "Vegetables & Fruites"))
        break
      case 3:
        this.productsArr = this._product.allProducts.filter(p=>(p.category == "Meat & Fish"))
        break
      case 4:
        this.productsArr = this._product.allProducts.filter(p=>(p.category == "Drinks"))
        break
      default:
        this.productsArr = this._product.allProducts
        break
      

    }

  }

  onSearchChange(searchValue: string): void {  
    if(searchValue.length==0){
      this.productsArr=this._product.allProducts
    }
    else{
      this.productsArr=this._product.allProducts.filter(p => (p.name.includes(searchValue)))
    }
  }


}

