import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { StorageService } from '../service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  userdata={
    mobile:"",
    pass1:"",
    pass2:"",
    otp:""
  }

  mobilevalid=true;
  pass1valid=true;
  pass2valid=true;

  validation={
    mobileblank:true,
    mobilemin:true,
    mobilepat:true,
    pass1b:true,
    pass1min:true,
    pass2b:true,
    pass2min:true,
    matchpass:true,
    duplicate:true
  }

  constructor(private apiService:ApiService,
    private storageService:StorageService,
    private router:Router) { }

  ngOnInit() {

  }

  mobileinput()
  {
    let mobile = this.userdata.mobile.trim();
    if(mobile.length>0)
    {
      this.mobilevalid = true;
      this.validation.mobileblank=true;
      if(mobile.length==10)
      {
        this.mobilevalid = true;
        this.validation.mobilemin= true;
        return true;
      }else{
        this.mobilevalid = false;
        this.validation.mobilemin= false;
        return false;
      }
    }else{
      this.mobilevalid = false;
      this.validation.mobileblank=false;
      this.validation.mobilemin= true;
      return false;
    }
    
  
  }

  password1()
    {
      let password = this.userdata.pass1.trim();
      if(password.length>0)
      {
        this.pass1valid = true;
        this.validation.pass1b = true;
        if(password.length<8)
        {
          this.pass1valid = false;
          this.validation.pass1min=false;
          return false;
        }else{
          this.pass1valid = true;
          this.validation.pass1min=true;
          return true;
        }
      }else{
        this.pass1valid = false;
        this.validation.pass1b = false;
        this.validation.pass1min=true;
        return false;
      }
    }

    password2()
    {
      let password = this.userdata.pass2.trim();
      let password1 = this.userdata.pass1.trim();
      if(password.length>0)
      {
        this.pass2valid = true;
        this.validation.pass2b = true;
        if(password!=password1)
        {
          this.validation.matchpass=false;
          this.pass2valid=false;
          return false;
        }else{
          this.validation.matchpass=true;
          this.pass2valid=true;
          return true;
        }
      }else{
        this.pass2valid = false;
        this.validation.pass2b = false;
        this.validation.matchpass=true;
        return false;
      }
    }
  registration()
  {
    if(this.mobileinput()&&this.password1()&&this.password2())
    {
      this.apiService.sendotp(this.userdata.mobile).subscribe(res=>
        {
          console.log(res);
          if(res.responce=="success")
          {
            this.userdata.otp = res.otp;
            this.storageService.setdata("regdata",this.userdata).then(()=>
            {
              this.router.navigate(['/verify-otp/reg']);
            })
          }else if(res.responce=='duplicate'){
            this.mobilevalid = false;
            this.validation.duplicate=false;
          }else{
            this.mobilevalid = false;
            this.validation.mobilepat = false;
          }
        })
    }
  }

}
