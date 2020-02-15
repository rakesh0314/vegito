import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage.service';
import { ApiService } from '../service/api.service';
import { Crop } from '@ionic-native/crop/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  profile:any;
  resData:any;
  fileUrl:any;
  constructor(private storageService:StorageService,
    private apiService:ApiService,
    private crop:Crop,
    private imagePicker:ImagePicker,
    private transfer:FileTransfer) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.storageService.getdata('vegisession').then(res=>
      {
        this.apiService.profile(res).subscribe(result=>
        {
          this.profile = result;
        })
      })
  }

}
