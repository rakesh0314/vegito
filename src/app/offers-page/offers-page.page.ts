import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage.service';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers-page',
  templateUrl: './offers-page.page.html',
  styleUrls: ['./offers-page.page.scss'],
})
export class OffersPagePage implements OnInit {

  cart:number;
  constructor(private storageService:StorageService,
    private apiService:ApiService,
    private router:Router) { }

  ngOnInit() {
    this.cartcount();
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
              this.cart = 0;
            }else{
              this.cart = result.cart;
            }
          });
      }
    });
  }

}
