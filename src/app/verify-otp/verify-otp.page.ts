import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { StorageService } from '../service/storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.page.html',
  styleUrls: ['./verify-otp.page.scss'],
})
export class VerifyOtpPage implements OnInit {

  otp={
    first:'',
    second:'',
    third:'',
    fourth:''
  }

  error = {
    otpvalid:true,
    otpblank:true
  }

  constructor(private apiService:ApiService,
    private storageService:StorageService,
    private router:Router,
    private activeRoute:ActivatedRoute) { }

  ngOnInit() {
  }
  otpController(event,next,prev){
   if(event.target.value.length < 1 && prev){
     prev.setFocus()
   }
   else if(next && event.target.value.length>0){
     next.setFocus();
   }
   else {
    return 0;
   }
   }

   validInputs()
   {
     let first = this.otp.first.trim();
     let second = this.otp.second.trim();
     let third = this.otp.third.trim();
     let fourth = this.otp.fourth.trim();
     return(this.otp.first&&this.otp.second&&this.otp.third&&this.otp.fourth&&first.length>0&&second.length>0&&third.length>0&&fourth.length>0);
   }

   verifyotp()
   {
    this.error.otpblank = true;
    this.error.otpvalid = true;
     let type = this.activeRoute.snapshot.paramMap.get('type');
     let enterotp  = this.otp.first+this.otp.second+this.otp.third+this.otp.fourth;
     if(this.validInputs())
     {
       if(type == 'reg')
       {
         this.storageService.getdata('regdata').then(res=>
          {
            if(res.otp == enterotp)
            {
              this.apiService.reguser(res).subscribe(result=>
                {
                  this.storageService.removedata("regdata");
                  this.storageService.setdata("vegisession",result).then(()=>
                  {
                    this.router.navigate(['/home']).then(()=>
                    {
                      window.location.reload();
                    })
                  })
                })
            }else{
              this.error.otpvalid=false;
            }
          })
       }
     }else{
       this.error.otpblank = false;
     }
   }

   resendotp()
   {
    let type = this.activeRoute.snapshot.paramMap.get('type');
    if(type=='reg')
    {
      this.storageService.getdata('regdata').then(res=>
        {
          this.apiService.resendRegOTP(res).subscribe(result=>
            {
              if(result.responce=="success")
              {
                this.apiService.showmsg('OTP send');
              }
            })
        });
    }
   }

}
