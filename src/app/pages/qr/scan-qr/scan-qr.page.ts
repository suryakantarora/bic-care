import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { NavController } from '@ionic/angular';
import { NavigationOptions } from '@ionic/angular/providers/nav-controller';
import { Storage } from '@ionic/storage-angular';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';
// import { Camera, CameraResultType, CameraPluginPermissions, CameraOptions, ImageOptions, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit {
  imgPath = '';
  kycStatus: any;
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private global: GlobalService,
    private rest: RestService,
    private storage: Storage
  ) { 
    this.storage.create();
  }

  ngOnInit() {
    this.rest.setQrCode('');
    this.startScan();
  }
  checkKycStatus() {
    this.storage.get('kycStatus').then((kycStatus) => {
      console.log('kycStatus : ' + kycStatus);
      this.kycStatus = kycStatus;
    }).catch(err=> {});
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
        this.alertService.showToast('PLACE_YOUR_CAMERA');
        startScan();
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
        this.getQRDetail(result.content);
      }
    };
    
    
  }
  ionViewWillLeave() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  }

  getQRDetail(code:any){
    if (code.substr(0, 1) !== '{') {
			console.log('Normal String : ' + code);
			this.navCtrl.pop().then(() => {
				// this.getMerchantInfo(code);
				if (code.length <= 27) {
					console.log('Properietary QR');
					this.getMerchantInfo(code);
				} else {
					console.log('BOL Standard QR');
					this.getBcelQRInfo(code);
					// this.getMerchantInfo(code);
				}
			});
		} else {
			console.log('JSON String : ' + (code));
			const qr = JSON.parse(code);
			if (qr.type == 'P2P') {
				this.navCtrl.pop().then(() => {
          const qrData={ qr: qr, account: qr.ACC, currency: qr.CURRENCY, amount: qr.AMOUNT, name: qr.NAME };
          this.rest.setQrCode(qrData);
					this.navCtrl.navigateForward(['/qr-details']);
				});
			} else if (qr.type == 'w2w') {
				console.log('W2W QR');
				this.openW2W(qr);
			} else if (qr.type === 'M') {
				console.log('Merchant QR Code');
				const qrId = qr.qrId;
				this.getMerchantInfo(qrId);
			} else {
				this.navCtrl.pop().then(() => {
					this.alertService.showToast('Invalid QR Code');
				});
			}
		}
  }
  openW2W(qrCode:any) {
    if (this.kycStatus === 'S') {
      this.navCtrl.pop().then(() => {
        const data={ qr: qrCode, mobile: qrCode.wallet, name: qrCode.name };
        // this.navCtrl.push(WalletQrpayPage, );
      });
    } else if (this.kycStatus === 'N') {
      this.alertService.showAlertsForKycVerification(this.kycStatus);
    }
  }
  getMerchantInfo(qrCode:any) {

  }
  getBcelQRInfo(qrCode:any) {

  }
}
