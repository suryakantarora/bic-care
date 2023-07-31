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
  constructor() { }

  ngOnInit() {
    this.stopCamera();
    setTimeout(() => {
      this.openCameraPreview();
    }, 1000);
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
      position: 'front',
      parent: 'cameraPreview',
      x: 0, y: 130,
      height: window.screen.height / 2,
      className: 'selfie-preview',
      toBack: false,
      enableOpacity: true
    };
    CameraPreview.start(cameraPreviewOptions);
  }
  async takePicture() {
    const cameraPreviewOptions: CameraPreviewPictureOptions = {
      height: 512, width:512,quality: 100
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
  proceedIdCard() {
    this.sendSelfieData.emit(this.selfie);
  }
}
