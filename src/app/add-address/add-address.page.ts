import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { StorageService } from '../service/storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {

  button=false;
  housevalid=true;
  streetvalid=true;
  areavalid=true;
  cityvalid=true;
  zipvalid=true;
  userdata:any;
  validation =
  {
    houseb:true,
    housemin:true,
    housep:true,
    streetb:true,
    streemin:true,
    streetp:true,
    areab:true,
    areamin:true,
    city:true,
    zipb:true,
    zipmin:true,
    zipp:true
  }

  address={
    house_no:"",
    street_no:"",
    landmark:"",
    city:"",
    zip_code:"",
    category:"Home"
  }

  constructor(private apiService:ApiService,
    private storageService:StorageService,
    private router:Router,
    private activeRoute:ActivatedRoute) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.storageService.getdata('vegisession').then(res=>
      {
        this.userdata = res;
        console.log(this.userdata);
      })
  }

  housef()
  {
    let house = this.address.house_no.trim();
    if(house.length==0)
    {
      this.housevalid = false;
      this.validation.houseb=false;
      return false;
    }else if(!parseInt(house)){
      this.housevalid= false;
      this.validation.houseb=true;
      this.validation.housep=false;
      return false;
    }else if(house.length<2)
      {
        this.housevalid = false;
        this.validation.houseb=true;
        this.validation.housep = true;
        this.validation.housemin= false;
        return false;
    }else{
      this.housevalid = true;
      this.validation.houseb=true;
      this.validation.housemin= true;
      this.validation.housep = true;
      return true;
    }
    
  
  }

  streetf()
  {
    let street = this.address.street_no.trim();
    if(street.length==0)
    {
      this.streetvalid = false;
      this.validation.streetb=false;
      this.validation.streetp=true;
      this.validation.streemin=true;
      return false;
    }else if(!parseInt(street))
    {
      this.streetvalid=false;
      this.validation.streetb=true;
      this.validation.streetp=false;
      this.validation.streemin=true;
      return false;
    }else if(street.length<2)
    {
        this.streetvalid = false;
        this.validation.streetb=true;
        this.validation.streetp=true;
        this.validation.streemin=false;
        return false;
    }else{
      this.streetvalid = true;
      this.validation.streemin = true;
      this.validation.streetb=true;
      this.validation.streetp=true;
      return true;
    }
  }

  areaf()
  {
    let area = this.address.landmark.trim();
    if(area.length==0)
    {
      this.areavalid = false;
      this.validation.areab = false;
      return false;
    }else if(area.length<6){
      this.areavalid = false;
      this.validation.areab=true;
      this.validation.areamin = false;
      return false;
    }else{
      this.areavalid = true;
      this.validation.areab = true;
      this.validation.areamin=true;
      return true;
    }
  }

  cityf()
  {
    let city = this.address.city.trim();
    if(city.length>0)
    {
      this.cityvalid=true;
      this.validation.city=true;
      return true;
    }else{
      this.cityvalid=false;
      this.validation.city=false;
      return false;
    }
  }

  zipcodef()
  {
    let zip = this.address.zip_code.trim();
    if(zip.length<1)
    {
      this.zipvalid=false;
      this.validation.zipb=false;
      return false;
    }else if(!parseInt(zip))
    {
      this.zipvalid=false;
      this.validation.zipb=true;
      this.validation.zipp=false;
      return false;
    }else if(zip.length<6)
    {
      this.zipvalid=false;
      this.validation.zipb=true;
      this.validation.zipp=true;
      this.validation.zipmin=false;
      return false;
    }else{
      this.zipvalid=true;
      this.validation.zipb=true;
      this.validation.zipp=true;
      this.validation.zipmin=true;
      return true;
    }
  }

  addAddress()
  {
    let type = this.activeRoute.snapshot.paramMap.get('type');
    this.button = true;
    if(this.housef() && this.streetf() && this.areaf() && this.cityf() && this.zipcodef())
    {
      this.apiService.addAddress(this.address,this.userdata.user_id).subscribe((res)=>
        {
          if(res.status==true)
          {
            if(type=="home")
            {
              this.storageService.setdata('useradd',this.address).then(()=>
              {
                this.router.navigateByUrl('delivery-address/home');
              })
            }else if(type=="pay")
            {
              this.storageService.setdata('useradd',this.address).then(()=>
              {
                this.router.navigateByUrl('/checkout');
              })
            }
          }else{
            this.apiService.showmsg('Network error..! try again later');
          }
        },(error)=>
        {
          this.apiService.showmsg('Network error..! try again later');
        })
    }else{
      this.button = false;
    }
  }

  changeCate(cate)
  {
    this.address.category = cate;
    console.log(this.address.category);
  }
}
