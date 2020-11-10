import { Component, OnInit,Input } from '@angular/core';
import {ProductsService} from '../products.service'
import { IProduct } from '../product';
import { UsersService } from '../users.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() admin
  @Input() productToEdit
  @Input() isOrder

  addNewProduct = false
  imageUrl=""
  totalPrice=0
  lsData =[]
  progress=false

  constructor(public _product:ProductsService,private _usr:UsersService) {
    this._product.orders=[]

    this._product.checkRemainedProducts=true
   }

  ngOnInit(): void {
    this.lsData=JSON.parse(localStorage.getItem(this._usr.userInfo.email+""))
    if(this._product.checkRemainedProducts){
      this.remainedOrders()
      this._product.checkRemainedProducts=false
    }
  }

  remainedOrders(){
    if(this.lsData == null){
      return
    }


    for(let i=0 ;i<this.lsData.length;i++){
      this._product.orders.push(this.lsData[i])
    }
    
  }

  addProduct(event: any){
    this.progress=true
    let newProduct:IProduct={
      "name":event.target.pName.value,
      "_id":event.target.pID.value,
      "price":event.target.pPrice.value,
      "category":event.target.pCategory.value,
      "image":(this.imageUrl=="" ? this._product.allProducts[this.productToEdit].image : this.imageUrl)
    }

    
    this._product.newProduct(newProduct).subscribe(data=>{if(data.success){ this._product.allProducts.push(newProduct);alert("Added successfully")};if(!data.success) {alert("Failed, try again")};this.progress=false;this.imageUrl=""})
  }

  editProduct(event){
    this.progress=true
    let updateProduct:IProduct={
      "name":(event.target.pName.value=="" ? this._product.allProducts[this.productToEdit].name :event.target.pName.value),
      "_id":this._product.allProducts[this.productToEdit]._id,
      "price":(event.target.pPrice.value=="" ? this._product.allProducts[this.productToEdit].price :event.target.pPrice.value),
      "category":(event.target.pCategory.value=="" ? this._product.allProducts[this.productToEdit].category:event.target.pCategory.value),
      "image":(this.imageUrl=="" ? this._product.allProducts[this.productToEdit].image : this.imageUrl)
    }
    
    this._product.updateProduct(updateProduct).subscribe(data=>{this.progress=false;if(data.success) alert("updated Successfully"); else alert("Failed! Try again");this.imageUrl=""})
  }

  onDecreaseAmount(o){
    const index = this._product.orders.indexOf(o);
    this._product.orders.splice(index,1)
    localStorage.setItem(this._usr.userInfo.email+"", JSON.stringify(this._product.orders));
  }

  onSelectImage(event,edit){
    if (event.target.files){
      let reader= new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload=(e:any)=>{
        if(!edit)
          this.imageUrl=e.target.result
        else
          this._product.allProducts[this.productToEdit].image=e.target.result

      }
    }
  }


  onAddOrder(){
    this.totalPrice=0
    for(let i=0 ;i<this._product.orders.length;i++){
      this.totalPrice+=this._product.orders[i].pData.price*this._product.orders[i].amount
    }
    return this.totalPrice
  }

  clearAll(){
    this._product.orders=[]
    localStorage.setItem(this._usr.userInfo.email+"", JSON.stringify(this._product.orders));
  }


}
