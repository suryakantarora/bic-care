import { Component, OnInit, ViewChild } from '@angular/core';
import { CaptureSelfiePage } from '../capture-selfie/capture-selfie.page';
import { AlertService } from 'src/app/services/alert/alert.service';
import { RestService } from 'src/app/services/rest/rest.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { CaptureIdPage } from '../capture-id/capture-id.page';
import "@lottiefiles/lottie-player";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Device } from '@capacitor/device';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-update-kyc',
  templateUrl: './update-kyc.page.html',
  styleUrls: ['./update-kyc.page.scss'],
})
export class UpdateKycPage implements OnInit {
  @ViewChild(CaptureSelfiePage, { static: false }) selfiePage: CaptureSelfiePage;
  @ViewChild(CaptureIdPage, { static: false }) idCardPage: CaptureIdPage;
  activeIndex = 1;
  kycStatus = 'P';
  selfie: string = '';
  idCard: string = '';
  deviceId: any;
  kycId: any;
  constructor(
    private alertService: AlertService,
    private rest: RestService,
    private global: GlobalService,
    private storage: Storage
  ) { 
    this.storage.create();
  }

  ngOnInit() {
    this.getDeviceDetail();
  }
  async getDeviceDetail() {
    await Device.getId().then(res => {
      console.log('Device ID: ' + JSON.stringify(res));
      this.deviceId = res.identifier;
    }).catch((err) => {
      console.error(err)
    });
  }
  goNext() {
    if (this.activeIndex >= 1) {
      this.activeIndex += 1;
    }
  }
  async openCamera() {
    console.log('Opening camera');
    this.goNext();
  }
  goBack() {
    if (this.activeIndex > 1) {
      this.activeIndex -= 1;
    }
  }
  captureSelfie(ev: any) {
    console.log('Captured Selfie: ');
    this.selfie = ev;
  }
  captureIdCard(ev: any) {
    console.log('Captured ID: ');
    this.idCard = ev;
  }
  triggerCaptureSelfie() {
    console.log('Clicked on capture selfie');
    this.selfiePage.captureSelfie();
  }
  triggerCaptureIdCard() {
    console.log('Clicked on capture id');
    this.idCardPage.captureSelfie();
  }
  takePicture() {
    this.selfie = '';
    this.selfiePage.takePicture();
  }
  reTakePicture() {
    this.selfie = '';
    this.selfiePage.startCapture();
  }
  stopCamera() {
    this.selfiePage.stopCamera();
  }
  proceedForIdCard() {
    this.idCard = '';
    this.goNext();
  }

  takeIdPicture() {
    this.idCard = '';
    this.idCardPage.takePicture();
  }
  reTakeIdPicture() {
    this.idCard = '';
    this.idCardPage.captureId();
  }
  openGallery() {
    Camera.requestPermissions().then(res => {
      console.log(res);
      if (res.photos === 'granted') {
        this.pickPhotoFromGallery();
      }
    });
  }
  async pickPhotoFromGallery() {
    // data:image/png;base64,
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      saveToGallery: false,
      correctOrientation: true,
      source: CameraSource.Photos
    });
    this.idCardPage.stopCamera();
    this.idCard = '' + image.dataUrl;
    this.idCardPage.idCard = '' + image.dataUrl;
  }
  submitForm() {
    console.log('Selfie Data: ' + this.selfie);
    console.log('Card Data: ' + this.idCard);
    this.goNext();
    if (this.selfie && this.idCard) {
      this.registerEKycDoc();
    } else {
      console.log('Invalid Data, Cannot submit kyc');
    }
  }
  async registerEKycDoc() {
    console.log('Valid Data, Proceed to submit kyc');
    const postData = {
      DATA: {
        deviceId: this.deviceId,
        kycFor: 'W',
        idproofImg: this.idCard,
        custImg: this.selfie
      }
    };
    this.rest.ekycRegister(postData).then((res) => {
      this.ekycRegisterRes(res);
    }).catch((err) => {
      this.rest.closeLoader();
      console.log(err);
    });
  }
  ekycRegisterRes(res: any) {
    if (res.RESP_CODE === 'MPAY1019') {
      this.global.timeout();
    } else if (res.RESP_STATUS == 'SUCCESS') {
      this.kycId = res.kycId;
      this.kycStatus = 'S';
      this.storage.set('kycStatus', 'N');
      this.storage.set('kycId', res.kycId);
    } else {
      this.alertService.showAlert('ALERT', res.REASON || res.RESP_CODE);
      this.kycStatus = 'F';
    }
  }
  goHome() {
    this.global.pop();
  }
  retry() {
    this.kycStatus = 'P';
    this.registerEKycDoc();
  }
  ionViewWillLeave() {
    this.idCardPage.closePreview();
    this.selfiePage.closePreview();
  }
}
