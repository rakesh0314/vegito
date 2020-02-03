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

  cropUpload()
  {
    this.imagePicker.getPictures({width: 500,height: 500,quality: 75,maximumImagesCount: 10}).then((result)=>
    {
      for(let i=0;i<result.length;i++)
      {
        console.log('image url :'+result[i]);
        this.crop.crop(result[i],{quality:100}).then(newImage =>
          {
            console.log('New image path :'+newImage);
            const fileTransfer: FileTransferObject = this.transfer.create();
            const uploadoOption: FileUploadOptions =
            {
              fileKey:'file',
              fileName: newImage.substr(newImage.lastIndexOf('/')+1)
            };

            fileTransfer.upload(newImage,'https://vegito.in/assets/images/users',uploadoOption).then((data)=>
            {
              console.log('upload Data : '+data);
              this.resData = JSON.parse(data.response);
              console.log('response: '+this.resData);
              this.fileUrl = this.resData.fileUrl;
            },(error)=>
            {
              console.log('upload error '+error);
            });
          },(err)=>
          {
            console.log('crop error '+err);
          }
        )
      }
    },(erro)=>
    {
      console.log('Imagepicker '+erro);
    });
  }

}
