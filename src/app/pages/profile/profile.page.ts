import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraPluginPermissions, CameraOptions, ImageOptions, CameraSource } from '@capacitor/camera';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user:any={};
	base64Image: any;
	selectedImage: any = 'assets/imgs/contactavatar.png';
  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private global: GlobalService,
    private rest: RestService,
    private alertService: AlertService
  ) { 
    this.storage.create();
   }

  ngOnInit() {
    this.checkProfilePic();
    // this.navCtrl.navigateRoot('login');
    this.initProfile();
  }
  async checkProfilePic() {
    await this.storage.get('profilePic').then(data => {
      if(data) {
        this.selectedImage = data;
        console.log('Profile pic read success: ' + data);
      } else {
        this.selectedImage='assets/imgs/contactavatar.png';
      }
    }).catch((e) => {
      console.log('Error while reading profile pic: ' + e);
      this.selectedImage='assets/imgs/contactavatar.png';
    });
  }
  openCamera(source:any) {
    try{
      Camera.checkPermissions().then((res) => {
        console.log('Permission is given: ' + res);
        let options: ImageOptions = {
          resultType: CameraResultType.Base64,
          correctOrientation: true,
          source: CameraSource.Prompt,
        }
        Camera.getPhoto(options).then(res => {
          console.log('Camera is open: ' + JSON.stringify(res));
          if(res?.base64String) {
            const img='data:image/jpeg;base64,' + res.base64String;
            this.selectedImage = img;
            this.storage.set('profilePic', img);
          }
        }).catch((err:Error) =>{
          console.log('Error in camera: ' + err);
        });
      }).catch((er:any) => {
        console.error('Permission is not given: ' + er)
      });
    } catch(er) {
      console.log('Error occured and carched: ' + er);
    }
	}

  openActionSheet() {

  }
  async initProfile() {
    this.user=this.rest.completeUserInfo;
  }
}
