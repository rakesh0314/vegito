import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { StorageService } from '../service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart:any;
  imgUrl="https://vegito.in";
  price : any;
  delcharge:any;
  total:any;
  totalprice:any;
  nocart:boolean;
  constructor(private apiService:ApiService,
    private storage:StorageService,
    private router:Router) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.storage.getdata('vegisession').then(res=>
      {
        this.apiService.cartdata(res).subscribe(result=>
          {
            this.cart = result;
            if(this.cart!=null)
            {
              this.nocart = false;
              for(let i=0;i<this.cart.length;i++)
              {
                this.cart[i].qty = 1;
                this.cart[i].price = this.cart[i].sellprice * 1;
              }
              this.contTotal();
            }else{
              this.nocart = true;
            }
          })
      })
  }

  contTotal()
  {
    this.delcharge= "00";
    this.total = "";
    this.totalprice ="";
    for(let i=0;i<this.cart.length;i++)
    {
      this.price = "";
      this.price = this.cart[i].qty*this.cart[i].sellprice;
      this.total = +this.price + +this.total;
    }
    
    this.totalprice = +this.total+ +this.delcharge;
  }

  qtyplus(row)
  {
    this.cart[row].qty = this.cart[row].qty + 1; 
    this.cart[row].price = this.cart[row].sellprice * this.cart[row].qty;
    this.contTotal();
  }

  qtyminus(row)
  {
    if(this.cart[row].qty-1==0)
    {
      this.apiService.deletecart(this.cart[row].cart_id).subscribe(res=>
        {
          this.ionViewWillEnter();
        })
    }else{
      this.cart[row].qty = this.cart[row].qty - 1; 
      this.cart[row].price = this.cart[row].sellprice * this.cart[row].qty;
      this.contTotal();
    }
  }

  payment_option()
  {
    this.storage.setdata("vegicart",this.cart).then(()=>
    {
      this.router.navigate(['/checkout']);
    });
  }

}
