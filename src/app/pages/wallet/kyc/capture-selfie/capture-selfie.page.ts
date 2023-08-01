import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions } from '@capacitor-community/camera-preview';

@Component({
  selector: 'app-capture-selfie',
  templateUrl: './capture-selfie.page.html',
  styleUrls: ['./capture-selfie.page.scss'],
})
export class CaptureSelfiePage implements OnInit {
  @Output() sendSelfieData: EventEmitter<any> = new EventEmitter();
  captureStatus=1;
  selfie: any;
  selfieBg='assets/imgs/selfie-bg.png';
  constructor() { }

  ngOnInit() {
    this.startCapture();
  }
  startCapture() {
    this.selfie='';
    this.captureStatus=1;
    CameraPreview.stop().then(() => {
      this.openCameraPreview();
    }).catch(err=> {
      this.openCameraPreview();
    });
  }
  captureSelfie() {
    console.log('Selfie captured called');
    // this.sendSelfieData.emit('Captured Selfie');
  }
  back() {
    this.sendSelfieData.emit('BACK');
  }
  /*

      x: 0,
      y: 0,
      width: window.screen.width - 1,
      height: window.screen.height / 2,
      camera: 'front',
      tapPhoto: true,
      toBack: false,
      alpha: 1

  */
  async openCameraPreview() {
    const cameraPreviewOptions: CameraPreviewOptions = {
      position: 'back',
      parent: 'cameraPreview',
      x: 0, y: 130,
      height: window.screen.height / 3,
      className: 'selfie-preview',
      toBack: true,
      enableOpacity: true
    };
    CameraPreview.start(cameraPreviewOptions);
  }
  async takePicture() {
    const cameraPreviewOptions: CameraPreviewPictureOptions = {
      height: 300, width:300,quality: 100,
    };
    CameraPreview.capture(cameraPreviewOptions).then(res=> {
      console.log('Camera Picture: ' + JSON.stringify(res));
      this.selfie='data:image/png;base64,' + res.value;
      this.stopCamera();
    });
  }
  stopCamera() {
    CameraPreview.stop().then(() =>{
      this.proceedIdCard();
    });
  }

  closePreview() {
    CameraPreview.stop().catch(() =>{
      console.log('Already closed');
    });
  }
  proceedIdCard() {
    this.sendSelfieData.emit(this.selfie);
  }
}
