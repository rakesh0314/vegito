import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.page.html',
  styleUrls: ['./new-arrivals.page.scss'],
})
export class NewArrivalsPage implements OnInit {

  latest_prod:any;
  imgurl="https://vegito.in";
  constructor(private apiService:ApiService) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.apiService.latest().subscribe(res=>
      {
        this.latest_prod = res;
        console.log(this.latest_prod);
      })
  }

}
