import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  product:any;
  productsx:any;
  imgurl="https://vegito.in";
  cart:any;
  constructor(private apiService:ApiService,
    private activeRoute:ActivatedRoute,
    private storageService:StorageService,
    private router:Router) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    this.apiService.productdetails(id).subscribe(res=>
      {
        this.product = res.myproduct;
        this.productsx = res.products;
        if(this.product)
        {
          this.product.unitid = this.product.units[0].unit_id;
          this.product.mrp = this.product.units[0].mrpprice;
          this.product.sell = this.product.units[0].sellprice;
          console.log(this.product)
        }
        for(let i=0;i<4;i++)
        {
          this.productsx[i].unitid = this.productsx[i].units[0].unit_id;
          this.productsx[i].mrp = this.productsx[i].units[0].mrpprice;
          this.productsx[i].sell =this.productsx[i].units[0].sellprice;
        }
      });
      this.cartcount();
  }

  changeUnit(event)
  {
    let e = event.target.value;
    this.product.unitid = this.product.units[e].unit_id;
    this.product.mrp = this.product.units[e].mrpprice;
    this.product.sell = this.product.units[e].sellprice;
  }

  productsUnits(event,row)
  {
    let e = event.target.value;
    this.productsx[row].unitid = this.productsx[row].units[e].unit_id;
    this.productsx[row].mrp = this.productsx[row].units[e].mrpprice;
    this.productsx[row].sell =this.productsx[row].units[e].sellprice;
  }

  addtoCart(data)
  {
    console.log(data);
    this.storageService.getdata('vegisession').then(res=>
      {
        if(res==null)
        {
          this.apiService.showmsg('Login First');
        }else{
          let product = {'Product_id':data.id,'unit':data.unitid}
          this.apiService.addtocart(res,product).subscribe(res=>
            {
              if(res.status=='true')
              {
                this.cart = res.cart;
              }else{
                this.apiService.showmsg('This Product is also in your cart');
              }
            })
        }
      })
  }

  checkLogin()
  {
    this.storageService.getdata('vegisession').then(res=>
      {
        if(res==null)
        {
          this.apiService.showmsg('Login First');
          this.router.navigate(['/login']);
        }
        else{
          this.router.navigate(['/cart']);
        }
      });
  }

  cartcount()
  {
    this.storageService.getdata('vegisession').then(res=>
    {
      if(res==null){
        this.cart = 0;
      }else{
        this.apiService.cart(res).subscribe(result=>
          {
            if(result.cart == "0")
            {
              this.cart = "0";
            }else{
              this.cart = result.cart;
            }
          });
      }
    });
  }

}
