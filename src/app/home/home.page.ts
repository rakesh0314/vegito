import { Component, Input, Renderer2, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { StorageService } from '../service/storage.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  allproducts:any;
  imgurl="https://vegito.in";
  userdata:any;
  searchel:string;
  display=true;
  category:string;
  logstatus:boolean;
  cart:any;
  cartres:"";
  page:0;
  latest_prod:any;
  searchdata:any;
  imgdis=false;
  banners:any;

  lastX:any;

  @Input('header') header:any;
  @Input('search') searchbar:any;
  constructor(private apiService:ApiService,
    private storage: StorageService,
    private router: Router,
    private renderer:Renderer2,
    private alertctrl:AlertController,
    public keyboard:Keyboard,
    private loadingCtrl:LoadingController,
    private network:Network) 
    {
    }

  ngOnInit()
  {
    this.network.onDisconnect().subscribe(()=>
    {
      this.alertMsg();
    });
    this.network.onConnect().subscribe(()=>
    {
      this.ionViewWillEnter();
    })
  }

  async alertMsg()
  {
    const alert = await this.alertctrl.create({
      header:"Network Error",
      message:"No internet connection. Please connect to internet to continue..",
      keyboardClose:false,
      backdropDismiss:false,
      animated:true,
      buttons:[
        {
          text:"Ok",
          handler:()=>
          {
            this.ionViewWillEnter();
          }
        },{
          text:'Cancel',
          handler:()=>
          {
            navigator['app'].exitApp();
          }
        }
      ]
    });
    alert.present();
  }

  ionViewWillEnter()
  {
    if(this.network.type=="NONE")
    {
      this.alertMsg();
    }else{
      this.display=true;
      this.apiService.getcategory().subscribe(res=>
        {
          this.category = res;
        });
      this.cartcount();
      this.allproduct();
      this.loginStatus();
      this.latest_arrival();
      this.bannerFunc();
    }

  }

  bannerFunc()
  {
    this.apiService.banners().subscribe(res=>
    {
      this.banners = res;
    });
  }

  latest_arrival()
  {
    this.apiService.latest().subscribe(res=>
      {
        this.latest_prod = res;
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
    this.display=true;
    this.imgdis = false;
    this.searchel = "Loading..";
    this.apiService.getAllProducts().subscribe(res=>
      {
        this.allproducts = res;
        for(let i=0;i<this.allproducts.length;i++)
        {
          this.allproducts[i].mrp = this.allproducts[i].units[0].mrpprice;
          this.allproducts[i].sell = this.allproducts[i].units[0].sellprice;
          this.allproducts[i].unit = this.allproducts[i].units[0].unit_id;
        }
        this.imgdis = true;
      });
  }

  changeunit(event,row)
  {
    this.allproducts[row].mrp = this.allproducts[row].units[event.target.value].mrpprice;
    this.allproducts[row].sell = this.allproducts[row].units[event.target.value].sellprice;
    this.allproducts[row].unit = this.allproducts[row].units[event.target.value].unit_id;
  }

  searchproduct()
  {
    this.imgdis = false;
    this.searchel = "Searching '"+this.searchdata+"..'"
    if(this.searchdata!=''){
    this.allproducts ="";
      this.apiService.seractproduct(this.searchdata).subscribe(res=>
        {
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
            this.imgdis = true;
            this.searchel ="No product found on '"+this.searchdata+"'..";
          }
        });
      }else{
        this.display = true;
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
    if(event.detail.scrollTop >56)
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

  displaydata()
  {
    if(this.display==true)
    {
      this.display = false;
      this.allproducts ="";
      this.searchel = "Search Products";
      this.imgdis = true;
    }
  }

  displayAll(event)
  {
    if(event.target.value=="")
    {
      this.allproduct();
    }
  }

  doRefresh(event)
  {
    setTimeout(()=>{
      this.ionViewWillEnter();
      event.target.complete();
    },2000);
  }
}

