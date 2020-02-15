import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

const apiUrl = "https://vegito.in/APICI";
const httpOptions = {
  headers: new HttpHeaders({
    'Auth_key': 'InfinityTest',
    'Service':'Vegito'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  constructor(private httpClient:HttpClient,
    private toastctrl:ToastController) { }
 
  async showmsg(msg)
  {
    const toast = await this.toastctrl.create({
      duration:1500,
      message:msg,
      position:'bottom',
      color:'dark'
    });
     toast.present();
  }

  getAllProducts():Observable<any>
  {
    const url=`${apiUrl}/get_product`;
    return this.httpClient.get(url,httpOptions);
  }

  seractproduct(prod):Observable<any>
  {
    const url = `${apiUrl}/serachProduct/${prod}`;
    return this.httpClient.get(url,httpOptions);
  }

  getcategory():Observable<any>
  {
    const url= `${apiUrl}/View_Category`;
    return this.httpClient.get(url,httpOptions);
  }

  productByCate(id):Observable<any>
  {
    const url = `${apiUrl}/get_Product_Bycategory/${id}`;
    return this.httpClient.get(url,httpOptions);

  }

  productdetails(id):Observable<any>
  {
    const url = `${apiUrl}/get_product_detail/${id}`;
    return this.httpClient.get(url,httpOptions);
  }

  login(data):Observable<any>
  {
    const url = `${apiUrl}/login`;
    return this.httpClient.post(url,data,httpOptions);
  }

  cartdata(res):Observable<any>
  {
    const url = `${apiUrl}/view_cart`;
    const header = new HttpHeaders({'Auth_key': 'InfinityTest','Service':'Vegito','ID':`${res.user_id}`,'Api_key':`${res.API_key}`});
    return this.httpClient.get(url,{headers:header});
  }

  cart(res):Observable<any>
  {
    const url = `${apiUrl}/countCart`;
    const header = new HttpHeaders({'Auth_key': 'InfinityTest','Service':'Vegito','ID':`${res.user_id}`,'Api_key':`${res.API_key}`});
    return this.httpClient.get(url,{headers:header});
  }

  addtocart(res,data):Observable<any>
  {
    const url = `${apiUrl}/Add_cart`;
    const header = new HttpHeaders({'Auth_key': 'InfinityTest','Service':'Vegito','ID':`${res.user_id}`,'Api_key':`${res.API_key}`});
    return this.httpClient.post(url,data,{headers:header});
  }

  deletecart(id):Observable<any>
  {
    const url = `${apiUrl}/delete_cart/${id}`;
    return this.httpClient.delete(url,httpOptions);
  }

  sendotp(mobile):Observable<any>
  {
    const url = `${apiUrl}/regotp`;
    return this.httpClient.post(url,{'mobile':mobile},httpOptions);
  }

  reguser(data):Observable<any>
  {
    const url = `${apiUrl}/create_account`;
    return this.httpClient.post(url,data,httpOptions);
  }

  resendRegOTP(data):Observable<any>
  {
    const url = `${apiUrl}/resendRegOTP`;
    return this.httpClient.post(url,data,httpOptions);
  }

  getOrders(res):Observable<any>
  {
    const url = `${apiUrl}/get_order_history`;
    const header = new HttpHeaders({'Auth_key': 'InfinityTest','Service':'Vegito','ID':`${res.user_id}`,'Api_key':`${res.API_key}`});
    return this.httpClient.get(url,{headers:header});
  }

  orederdetail(res,id):Observable<any>
  {
    const url = `${apiUrl}/order_details/${id}`;
    const header = new HttpHeaders({'Auth_key': 'InfinityTest','Service':'Vegito','ID':`${res.user_id}`,'Api_key':`${res.API_key}`});
    return this.httpClient.get(url,{headers:header});
  }

  profile(res):Observable<any>
  {
    const url = `${apiUrl}/profile`;
    const header = new HttpHeaders({'Auth_key': 'InfinityTest','Service':'Vegito','ID':`${res.user_id}`,'Api_key':`${res.API_key}`});
    return this.httpClient.get(url,{headers:header});
  }

  makeOrder(res,method,product,address):Observable<any>
  {
    const url = `${apiUrl}/order/${method}`;
    const header = new HttpHeaders({'Auth_key': 'InfinityTest','Service':'Vegito','ID':`${res.user_id}`,'Api_key':`${res.API_key}`});
    return this.httpClient.post(url,{'products':product,'address':`${address.id}`},{headers:header});
  }

  latest():Observable<any>
  {
    const url = `${apiUrl}/latest_product`;
    return this.httpClient.get(url,httpOptions);
  }

  addAddress(data,id):Observable<any>
  {
    const url = `${apiUrl}/AddClientNewAddress`
    const header = new HttpHeaders({'Auth_key': 'InfinityTest','Service':'Vegito','ID':`${id}`});
    return this.httpClient.post(url,data,{headers:header});
  }

  getAddresses(res):Observable<any>
  {
    const url = `${apiUrl}/getaddress`
    const header = new HttpHeaders({'Auth_key': 'InfinityTest','Service':'Vegito','ID':`${res.user_id}`});
    return this.httpClient.get(url,{headers:header});
  }

  clientlastAddress(res):Observable<any>
  {
    const url = `${apiUrl}/clientaddress`
    const header = new HttpHeaders({'Auth_key': 'InfinityTest','Service':'Vegito','ID':`${res.user_id}`});
    return this.httpClient.get(url,{headers:header});
  }

  banners():Observable<any>
  {
    const url = `${apiUrl}/banner`;
    return this.httpClient.get(url,httpOptions);
  }

  updateOrder(data):Observable<any>
  {
    const url = `${apiUrl}/updateOrder`;
    const header = {'Auth_key': 'InfinityTest','Service':'Vegito'};
    return this.httpClient.put(url,data,{headers:header});
  }
}
