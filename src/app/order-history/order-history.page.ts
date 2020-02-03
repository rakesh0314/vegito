import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {
  orders:any;
  noorder:any;
  constructor(private apiService:ApiService,
    private storageService:StorageService) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.storageService.getdata("vegisession").then(res=>
      {
        this.apiService.getOrders(res).subscribe(ressult=>
          {
            if(ressult.length>0)
            {
              this.orders = ressult;
            }else{
              this.noorder = ressult;
            }
          })
      })
  }

}
