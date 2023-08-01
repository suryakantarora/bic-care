import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions } from '@capacitor-community/camera-preview';

@Component({
  selector: 'app-capture-id',
  templateUrl: './capture-id.page.html',
  styleUrls: ['./capture-id.page.scss'],
})
export class CaptureIdPage implements OnInit {
  idCard: string;
  @Output() captureIdCard: EventEmitter<any> = new EventEmitter();
  captureStatus = 1;
  idCardBg = 'assets/imgs/id-card-bg.png';
  constructor() { }

  ngOnInit() {
    this.captureId();

  }
  captureId() {
    this.idCard = '';
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
    this.captureIdCard.emit('BACK');
  }
  async openCameraPreview() {
    const cameraPreviewOptions: CameraPreviewOptions = {
      position: 'back',
      parent: 'cameraPreview',
      x: 0, y: 130,
      height: window.screen.height / 3,
      width: window.screen.width,
      className: 'selfie-preview',
      toBack: true,
      enableOpacity: true
    };
    CameraPreview.start(cameraPreviewOptions);
  }
  async takePicture() {
    const cameraPreviewOptions: CameraPreviewPictureOptions = {
      height: 256, width: 512, quality: 100
    };
    CameraPreview.capture(cameraPreviewOptions).then(res => {
      console.log('Camera Picture: ' + JSON.stringify(res));
      this.idCard = 'data:image/png;base64,' + res.value;
      this.stopCamera();
    });
  }
  stopCamera() {
    CameraPreview.stop().then(() => {
      this.proceedIdCard();
    });
  }
  proceedIdCard() {
    this.captureIdCard.emit(this.idCard);
  }
  closePreview() {
    CameraPreview.stop().catch(() =>{
      console.log('Already closed');
    });
  }
}
