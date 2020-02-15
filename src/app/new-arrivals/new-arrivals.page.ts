import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { StorageService } from '../service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.page.html',
  styleUrls: ['./new-arrivals.page.scss'],
})
export class NewArrivalsPage implements OnInit {
  cart:number;
  latest_prod:any;
  imgurl="https://vegito.in";
  constructor(private apiService:ApiService,
    private storageService:StorageService,
    private router:Router) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.apiService.latest().subscribe(res=>
      {
        this.latest_prod = res;
        console.log(this.latest_prod);
      });
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
