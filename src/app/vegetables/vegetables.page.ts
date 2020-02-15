import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-vegetables',
  templateUrl: './vegetables.page.html',
  styleUrls: ['./vegetables.page.scss'],
})
export class VegetablesPage implements OnInit {
  
    product:any;
    cate:any;
  imgurl = "https://vegito.in";
  cart: number;
  constructor(private apiService:ApiService,
    private activeRoute:ActivatedRoute,
    private storageService:StorageService,
    private router:Router) { }

  ngOnInit() {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    this.apiService.productByCate(id).subscribe(res=>
      {
        
        this.cate = res.cate;
        this.product = res.product;
      });
      this.cartcount();
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
              this.cart = 0;
            }else{
              this.cart = result.cart;
            }
          });
      }
    });
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

}
