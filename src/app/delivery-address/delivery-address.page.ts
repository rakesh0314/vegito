import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../service/storage.service';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.page.html',
  styleUrls: ['./delivery-address.page.scss'],
})
export class DeliveryAddressPage implements OnInit {

  type:any;
  userdata:any;
  address:any;
  curaddress:any;

  constructor(private activeRoute:ActivatedRoute,
    private storageService:StorageService,
    private apiService:ApiService,
    private router:Router) { }

  ngOnInit() {
    this.type = this.activeRoute.snapshot.paramMap.get('type');
  }

  ionViewWillEnter()
  {
    this.type = this.activeRoute.snapshot.paramMap.get('type');
    
    this.storageService.getdata('vegisession').then(result=>
      {
        this.userdata = result;
        console.log(this.userdata);
        
      this.addresses();
      this.currAdd();
      });
  }

  addresses()
  {
    this.apiService.getAddresses(this.userdata).subscribe(res=>
      {
        this.address = res;
        console.log(this.address);
      })
  }

  currAdd()
  {
    this.storageService.getdata('useradd').then(res=>
      {
        if(res==null)
        {
          this.apiService.clientlastAddress(this.userdata).subscribe(res1=>
            {
              this.curaddress = res1;
            })
        }else{
          this.curaddress = res;
        }
        console.log(this.curaddress);
      });
  }

  addSession(data)
  {
    this.storageService.setdata('useradd',data).then(()=>
    {
      if(this.type=='pay')
      {
        this.router.navigateByUrl('/checkout');
      }
    })
    this.currAdd();
  }

}
