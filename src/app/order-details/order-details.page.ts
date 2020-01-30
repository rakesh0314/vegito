import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  product:any;
  constructor(private activeRoute:ActivatedRoute,
    private apiService:ApiService,
    private storageService:StorageService) { }

  ngOnInit() {
    let orderId = this.activeRoute.snapshot.paramMap.get('id');
    this.storageService.getdata('vegisession').then(res=>
      {
        this.apiService.orederdetail(res,orderId).subscribe(result=>
          {
            this.product = result;
          })
      })
  }


}
