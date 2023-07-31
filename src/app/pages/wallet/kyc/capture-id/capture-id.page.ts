import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions } from '@capacitor-community/camera-preview';

@Component({
  selector: 'app-capture-id',
  templateUrl: './capture-id.page.html',
  styleUrls: ['./capture-id.page.scss'],
})
export class CaptureIdPage implements OnInit {
  idCard:string;
  @Output() sendIdData: EventEmitter<any> = new EventEmitter();
  captureStatus=1;
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
    this.sendIdData.emit('BACK');
  }
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
      this.idCard='data:image/png;base64,' + res.value;
      this.stopCamera();
    });
  }
  stopCamera() {
    CameraPreview.stop().then(() =>{
      this.proceedIdCard();
    });
  }
  proceedIdCard() {
    this.sendIdData.emit(this.idCard);
  }
}
