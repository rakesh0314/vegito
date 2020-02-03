import { Component, ViewChildren, QueryList, OnDestroy } from '@angular/core';

import { Platform, IonRouterOutlet, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from './service/storage.service';
import { Router } from '@angular/router';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnDestroy {

  logstatus=false;
  backButtonsvar:any;
  @ViewChildren(IonRouterOutlet) routerOutlets:QueryList<IonRouterOutlet>;
  lastTimebackPress=0;
  timeperiodToexid =1000;
  dropdown:boolean;
  catrgories:any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage:StorageService,
    private router:Router,
    private apiService:ApiService,
    private toastCtrl:ToastController
  ) {
    this.initializeApp();
    this.loginstatus();
    this.allCategory();

  }

  allCategory()
  {
    this.apiService.getcategory().subscribe(res=>
      {
        this.catrgories = res;
        console.log(this.catrgories);
      })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.backButtonevent();
      this.splashScreen.hide();
    });
  }

  async showmsg(msg)
  {
    const toast = this.toastCtrl.create({
      color:"dark",
      message:msg,
      position:"bottom",
      duration:1000,
      animated:true,
      cssClass:"toastmsg",
    });
    (await toast).present();
  }

  loginstatus()
  {
    this.storage.getdata("vegisession").then(res=>
      {
        if(res==null)
        {
          this.logstatus = false;
        }else{
          this.logstatus = true;
        }
      })
  }

  logout()
  {
    this.storage.deleteStorage().then(()=>
      {
        this.router.navigate(['/home']).then(()=>
        {
          window.location.reload();
        })
      })
  }

  backButtonevent()
  {
    this.backButtonsvar = this.platform.backButton.subscribe(async()=>
    {
      this.routerOutlets.forEach((outlet:IonRouterOutlet)=>
      {
        if(outlet&&outlet.canGoBack())
        {
          outlet.pop();
        }else if(this.router.url==="/home")
        {
          if(new Date().getTime()-this.lastTimebackPress<this.timeperiodToexid)
          {
            navigator['app'].exitApp();
          }else{
            this.showmsg('double tap to exit app');
            this.lastTimebackPress = new Date().getTime();
          }
        }
      })
    })
  }


  ngOnDestroy()
  {
    this.backButtonsvar.unsubscribe();
  }

  dropdownMenu(data:boolean)
  {
    this.dropdown = data;
  }
}
