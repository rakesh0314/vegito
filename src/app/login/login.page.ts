import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { StorageService } from '../service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login ={
    username:"",
    password:""
  }
  logerror={
    field:false,
    log:false
  };

  constructor(private apiService:ApiService,
    private storage: StorageService,
    private router:Router) { }

  ngOnInit() {
  }

  validInputs()
  {
    let username = this.login.username.trim();
    let password = this.login.password.trim();
    return(this.login.username&&this.login.password&&username.length>0&&password.length>0)
  }

  logindata()
  {
    if(this.validInputs())
    {
      this.apiService.login(this.login).subscribe(res=>
        {
          if(res.status=='true')
          {
            this.apiService.showmsg('Login Success');
            this.storage.setdata("vegisession",res).then(()=>
            {
              this.router.navigate(['/home']).then(()=>
              {
                window.location.reload();
              });
            });
          }else{
            this.logerror.log = true;
          }
        });
    }else{
      this.logerror.field=true;
    }
  }

  error()
  {
    let username = this.login.username.trim();
    let password = this.login.password.trim();
    if(username.length>0&&password.length>0)
    {
      this.logerror.field = false;
    }
  }
}
