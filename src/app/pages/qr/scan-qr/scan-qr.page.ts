import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
// import { Camera, CameraResultType, CameraPluginPermissions, CameraOptions, ImageOptions, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit {
  imgPath = '';
  constructor(
  ) { }

  ngOnInit() {
    /* Camera.checkPermissions().then((res) => {
      console.log('Permission is given: ' + res);
      let options: ImageOptions = {
        resultType: CameraResultType.Base64,
        correctOrientation: true,
        source: CameraSource.Camera
      }
      Camera.getPhoto(options).then(res => {
        console.log('Camera is open: ' + JSON.stringify(res));
        if(res?.base64String) {
          this.imgPath='data:image/jpeg;base64,'+res.base64String;
        }
      }).catch(err =>{
        console.log('Error in camera: ' + err);
      });
    }).catch(er => {
      console.error('Permission is not given: ' + er)
    }); */
    this.startScan();
  }
  startScan() {
    console.log('start scanning');
    const didUserGrantPermission = async () => {
      console.log('check if user already granted permission');
      const status = await BarcodeScanner.checkPermission({ force: false });

      if (status.granted) {
        console.log('user granted permission');
        return true;
      }

      if (status.denied) {
        console.log('user denied permission');
        const c = confirm('If you want to grant permission for using your camera, enable it in the app settings.');
        if (c) {
          BarcodeScanner.openAppSettings();
        }
        return false;
      }

      if (status.asked) {
        console.log('user asked permission');
      }

      if (status.neverAsked) {
        console.log('user never asked permission');
        const c = confirm('We need your permission to use your camera to be able to scan barcodes');
        if (!c) {
          return false;
        }
      }

      if (status.restricted || status.unknown) {
        console.log('status restricted or unknown');
        return false;
      }

      const statusRequest = await BarcodeScanner.checkPermission({ force: true });

      if (statusRequest.asked) {
        console.log('permission is asked: ' + statusRequest.asked);
      }

      if (statusRequest.granted) {
        console.log('permission granted: ' + statusRequest.granted);
        return true;
      }
      console.log('user did not grant the permission, so he must have declined the request');
      return false;
    };

    didUserGrantPermission().then(value => {
      console.log('Permission Granted Value: ' + value);
      if (value) {
        askUser();
      }
    });

    const stopScan = () => {
      BarcodeScanner.showBackground();
      BarcodeScanner.stopScan();
    };

    const startScan = async () => {
      BarcodeScanner.hideBackground();
      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        console.log('Scanned Something: ' + result.content);
        stopScan();
      }
    };
    
    const askUser = () => {
      const c = confirm('Do you want to scan a barcode?');
    
      if (c) {
        startScan();
      } else{
        stopScan();
      }
    };
    
  }
  ionViewWillLeave() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  }
}
