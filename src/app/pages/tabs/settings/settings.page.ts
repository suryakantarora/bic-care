import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraPluginPermissions, CameraOptions, ImageOptions, CameraSource } from '@capacitor/camera';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

	appVerNum: any='1.0.0';
	touch: boolean = false;
	base64Image: any;
	selectedImage: any = 'assets/imgs/setting.png';
	postData: any;
	userId: any;
	userName: any;
	mobile: any;
	email: any;
	walletAccount: any;
	imageData: any;
	deviceId: any;
  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { 
    this.storage.create();
  }

  ngOnInit() {
    // this.checkProfilePic();
  }
  openPage(page:string){
    this.navCtrl.navigateForward(['/' + page]).catch(() =>{
      console.log('Page not found');
      this.alertService.showToast('Page not found');
    });
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

    Camera.checkPermissions().then((res) => {
      console.log('Permission is given: ' + res);
      let options: ImageOptions = {
        resultType: CameraResultType.Base64,
        correctOrientation: true,
        source: CameraSource.Camera
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
        this.selectedImage='assets/imgs/contactavatar.png';
      });
    }).catch((er:any) => {
      console.error('Permission is not given: ' + er)
      this.selectedImage='assets/imgs/contactavatar.png';
    });
	}

  openActionSheet() {

  }
  async changeLanguage() {

  }
  async enableDisableTouchId() {

  }
}
