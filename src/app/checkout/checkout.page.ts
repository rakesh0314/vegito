import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage.service';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
declare var RazorpayCheckout:any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  total=0.00;
  price:number;
  delChargesell:number;
  totalAmountsell:number;
  delChargemrp:number;
  totalAmountmrp:number;
  mrp:number;
  totalmrp=0.00;
  saveAmount=0;
  amount:any;
  product:"";
  session:any;
  address:"";
  userData={
    firstname:"",
    mobile:"",
    email:""
  };

  order = {
    pay_op:"",
  }
  constructor(private storageService:StorageService,
    private apiService:ApiService,
    private router:Router) { }

  ngOnInit() {
  }

  products()
  {
    this.storageService.getdata("vegicart").then(res=>
      { 
        this.product = res;
        this.total=0.00;
        for(let i=0;i<res.length;i++)
        {
          this.price =  res[i].sellprice*res[i].qty;
          this.mrp = res[i].mrpprice*res[i].qty;
          this.totalmrp = +this.mrp+ +this.totalmrp;
          this.total = +this.price + +this.total;
        }
          this.delChargesell = this.total*0/100;
          this.delChargemrp = this.totalmrp*0/100;
          this.totalAmountsell = this.total+ this.delChargesell;
          this.totalAmountmrp = this.totalmrp+ this.delChargemrp;
          this.saveAmount = this.totalAmountmrp - this.totalAmountsell;
          this.amount = this.saveAmount.toFixed(2);
          console.log(this.product);
      });
  }

  ionViewWillEnter()
  {
    this.storageService.getdata('vegisession').then(res=>
      {
        this.session = res;
        this.apiService.profile(res).subscribe(res2=>
          {
            this.userData.firstname = res2.clt_name;
            this.userData.email = res2.clt_email;
            this.userData.mobile = res2.clt_conno;
          })
      });
      this.products();
      this.currAdd();
  }

  currAdd()
  {
    this.storageService.getdata('useradd').then(res=>
      {
        if(res==null)
        {
          this.apiService.clientlastAddress(this.session).subscribe(res1=>
            {
              this.address = res1;
            })
        }else{
          this.address = res;
        }
      });
  }

  validinput()
  {
    var payment = this.order.pay_op;
    return(this.order.pay_op&&payment);
  }

  placeOrder()
  {
    if(this.validinput())
    {
      this.storageService.getdata("vegisession").then(res=>
        {
          if(this.order.pay_op=='1' && this.address!='')
          {
            this.placeOrders();
          }else{
            this.apiService.makeOrder(res,this.order,this.product,this.address).subscribe(res=>
              {
                let msg = 'Order Successfully';
                this.apiService.showmsg(msg);
                this.router.navigate(['order-confirmation']);
              });
            }
        });
    }else{
      let msg = 'Please select payment option and address';
      this.apiService.showmsg(msg);
    }
  }

  placeOrders()
  {

    var options = {
      description: 'Credits',
      image: 'https://vegito.in/assets/user/images/vegito.png',
      currency: 'INR',
      key: 'rzp_test_qvZi0jfBDGzKzg',
      amount: this.totalAmountsell*100,
      name: this.userData.firstname,
      prefill: {
        email: this.userData.email,
        contact: this.userData.mobile,
        name: this.userData.firstname
      },
      theme: {
        color: '#24EF0E'
      },
      modal: {
        ondismiss: function() {
          this.restapiService.showMsg('Payment Canecelled')
        }
      }
    };

    var successCallback = (payment_id) => {
      alert('payment_id: ' + payment_id);
    };

    var cancelCallback = (error) => {
      if(error.code=="2")
      {
        this.apiService.showmsg("Payment cancelled");
      }
    };

    RazorpayCheckout.open(options, successCallback, cancelCallback);
  }

}
