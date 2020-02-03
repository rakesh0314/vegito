import { Component, Input, Renderer2 } from '@angular/core';
import { ApiService } from '../service/api.service';
import { StorageService } from '../service/storage.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  allproducts:any;
  imgurl:"https://vegito.in";
  userdata:any;
  search:any;
  category:string;
  logstatus:boolean;
  cart:any;
  cartres:"";
  page:0;
  latest_prod:any;
  

  lastX:any;

  @Input('header') header:any;
  @Input('search') searchbar:any;
  constructor(private apiService:ApiService,
    private storage: StorageService,
    private router: Router,
    private renderer:Renderer2,
    private alertctrl:AlertController) 
    {
    }

    async presentAlert() {
      const alert = await this.alertctrl.create({
        message: 'This is an alert message.',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              this.apiService.showmsg('Confirm Cancel: blah');
            }
          }, {
            text: 'Okay',
            handler: () => {
              this.apiService.showmsg('Confirm Okay');
            }
          }
        ]
      });
  
      await alert.present();
    }
  ionViewWillEnter()
  {
    this.apiService.getcategory().subscribe(res=>
      {
        this.category = res;
      });
    this.cartcount();
    this.allproduct();
    this.loginStatus();
    this.latest_arrival();
  }

  latest_arrival()
  {
    this.apiService.latest().subscribe(res=>
      {
        this.latest_prod = res;
        console.log(this.latest_prod);
      })
  }

  loginStatus()
  {
    this.storage.getdata('vegisession').then(res=>
      {
        if(res!=null)
        {
          this.userdata = res;
          this.logstatus = true;
        }else{
          this.logstatus = false;
        }
      })
  }

  allproduct()
  {
    this.apiService.getAllProducts().subscribe(res=>
      {
        this.allproducts = res;
        for(let i=0;i<this.allproducts.length;i++)
        {
          this.allproducts[i].mrp = this.allproducts[i].units[0].mrpprice;
          this.allproducts[i].sell = this.allproducts[i].units[0].sellprice;
          this.allproducts[i].unit = this.allproducts[i].units[0].unit_id;
        }
      });
  }

  changeunit(event,row)
  {
    this.allproducts[row].mrp = this.allproducts[row].units[event.target.value].mrpprice;
    this.allproducts[row].sell = this.allproducts[row].units[event.target.value].sellprice;
    this.allproducts[row].unit = this.allproducts[row].units[event.target.value].unit_id;
  }

  searchproduct(e)
  {
    this.search ="Searching Products";
    if(e.target.value!=''){
      
    this.allproducts ="";
      this.apiService.seractproduct(e.target.value).subscribe(res=>
        {
          this.search ="";
          if(res!="no")
          {
            this.allproducts = res;
            for(let i=0;i<this.allproducts.length;i++)
            {
              this.allproducts[i].mrp = this.allproducts[i].units[0].mrpprice;
              this.allproducts[i].sell = this.allproducts[i].units[0].sellprice;
              this.allproducts[i].unit = this.allproducts[i].units[0].unit_id;
            }
          }else{
            this.search ="No product found on '"+e.target.value+"'";
          }
        });
      }else{
        this.allproduct();
      }
  }

  cartcount()
  {
    this.storage.getdata('vegisession').then(res=>
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

  checkLogin()
  {
    this.storage.getdata('vegisession').then(res=>
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

  addtoCart(data)
  {
    if(this.userdata==null)
    {
      this.apiService.showmsg('Login First');
    }else{
      let product = {'Product_id':data.id,'unit':data.unit}
      this.apiService.addtocart(this.userdata,product).subscribe(res=>
        {
          if(res.status=='true')
          {
            this.cart = res.cart;
          }else{
            this.apiService.showmsg('This Product is also in your cart');
          }
        })
    }
  }

  
  contentScroll(event)
  {
    if(event.detail.scrollTop > Math.max(0, this.lastX))
    {
      this.renderer.setStyle(this.header,'margin-top',`-${this.header.clientHeight}px`);
      this.renderer.setStyle(this.header,'transition','margin-top 300ms');
    }else{
      this.renderer.setStyle(this.header,'margin-top','0');
    }

    this.lastX = event.detail.scrollTop;
  }

  scrollStart(header)
  {
    this.header = header.el;
  }
}

