import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vegetables',
  templateUrl: './vegetables.page.html',
  styleUrls: ['./vegetables.page.scss'],
})
export class VegetablesPage implements OnInit {
  products={
    product:"",
    cate:""};
  imgurl = "https://vegito.in";
  constructor(private apiService:ApiService,
    private activeRoute:ActivatedRoute) { }

  ngOnInit() {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    this.apiService.productByCate(id).subscribe(res=>
      {
        
        this.products.cate = res.cate;
        this.products.product = res.product;
        console.log(this.products);
      })
  }

}
