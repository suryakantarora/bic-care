import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController, NavController, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from 'src/app/services/global/global.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { PinLoginPage } from '../pin-login/pin-login.page';
import { AlertService } from 'src/app/services/alert/alert.service';
import { LoadingPage } from 'src/app/shared/popovers/loading/loading.page';
import { RestService } from 'src/app/services/rest/rest.service';
import { BiometryType, NativeBiometric } from "capacitor-native-biometric";
import { Browser, OpenOptions } from '@capacitor/browser';
import { Device } from '@capacitor/device';
// import { IonicSlides } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  // swiperModules = [IonicSlides];
  flagImage: string = 'assets/imgs/logo/enflag.png';
  defaultLang = 'en';
  reversedSentence: string = '';
  position = 0;
  pin = '';
  randomKey: string = '';
  deviceId: any;
  constructor(
    private translate: TranslateService,
    public global: GlobalService,
    public storage: StorageService,
    private modalCtrl: ModalController,
    private alertService: AlertService,
    private popoverCtrl: PopoverController,
    private rest: RestService,
    private navCtrl: NavController

  ) {
    const data = [{ data: { students: { name: 'surya' } } }];
  }
  cancelModal() {
    this.modal.dismiss()
  }
  async getDeviceId() {
    await Device.getId().then(res => {
      console.log('Device ID: ' + JSON.stringify(res));
      this.deviceId = res.identifier;
    }).catch((err) => {
      console.error(err)
    });
  }
  openTnC = async () => {
    const option: OpenOptions = {
      url: 'https://biclaos.com/policy/T&C.html',
      presentationStyle: 'fullscreen'
    }
    await Browser.open(option);
  };
  async ngOnInit() {
    const name = await this.storage.getData('app');
    console.log('App Status: ' + name);
    this.global.getDefaultLang();
    this.getDeviceId();
    this.randomKey = this.global.generateRandomKey();
  }

  openUserLogin() {
    this.navCtrl.navigateForward(['/user-login']);
  }
  async openPinLoginModal() {
    const modalCtrl = await this.modalCtrl.create({
      component: PinLoginPage,
      breakpoints: [0, 0.1, 0.3, 0.5, 0.6, 0.8, 0.9, 1.0],
      initialBreakpoint: 1,
      animated: true,
      backdropBreakpoint: 0.1,
      id: 'alert-modal'
    });
    await modalCtrl.present();
    await modalCtrl.onDidDismiss().then(val => {
      console.log('Login data: ' + JSON.stringify(val));
    });
  }

  async countPin(pin: string) {
    if (pin && this.position < 6) {
      this.position++;
      this.pin += pin;
      console.log(this.pin);
      if (this.position === 6) {
        this.initPinLogin('MP', this.pin);
      }
    }
  }
  async initPinLogin(type: string, pin: string) {
    this.modal.dismiss();
    this.deleteAll();
    // this.navCtrl.navigateRoot(['/tabs']);
    // this.navCtrl.navigateRoot(['/wallet-dashboard']);
    this.initLogin(type, pin);
  }
  deletePin() {
    if (this.position) {
      this.position--;
      this.pin = this.pin.substring(0, this.pin.length - 1);
      console.log(this.pin);
    }
  }
  deleteAll() {
    this.position = 0;
    this.pin = '';
  }
  async forgotPin() {
    const alert = await this.alertService.showConfirmAlert('Alert!', 'Do you want to reset your PIN?');
    await alert.present();
    await alert.onDidDismiss().then((data: any) => {
      console.log('Data returned: ' + JSON.stringify(data.data));
      if (data.data === 'Y') {
        this.navCtrl.navigateForward(['/forgot-pin']);
      }
    });
  }
  async testLoading() {
    const popover = await this.popoverCtrl.create({
      component: LoadingPage,
      cssClass: 'custom-loading',
      backdropDismiss: false,
      showBackdrop: true
    });
    popover.present();
    /* this.restService.getService().subscribe(res=> {
      console.log(JSON.stringify(res))
    }, err => {
      console.log('Caught Error: ' + err)
    }); */
    setTimeout(() => {
      popover.dismiss();
    }, 3000);
  }
  openPage(page: string) {
    this.navCtrl.navigateForward([page]).catch(err => {
      console.log('No page found');
    });
  }
  // delete this method after testing and use performBiometricVerificatin()
  testBiometric() {
    this.initPinLogin('FP', '');
  }

  async performBiometricVerificatin() {
    const result = await NativeBiometric.isAvailable();

    if (!result.isAvailable) {
      console.log('Biometric isn\'t availble')
      return;
    }
    const isFaceID = result.biometryType == BiometryType.FACE_ID;

    const verified = await NativeBiometric.verifyIdentity({
      reason: "For easy log in",
      title: "Biometric",
      subtitle: "Place your finger on the fingerprint scanner",
    }).then(() => true).catch(() => false);

    if (!verified) return;
    this.initPinLogin('FP', '');
    this.saveCredentials();

  }
  async getCredentials() {
    const credentials = await NativeBiometric.getCredentials({
      server: "www.bicbank.com",
    });
    console.log('credentials: ' + JSON.stringify(credentials));
  }
  saveCredentials() {
    // Save user's credentials
    NativeBiometric.setCredentials({
      username: "bicbank",
      password: "bicbank",
      server: "www.bicbank.com",
    }).then(() => {
    });

  }
  deleteCredentials() {
    // Delete user's credentials
    NativeBiometric.deleteCredentials({
      server: "www.example.com",
    }).then();
  }

  async initLogin(type: string = 'FP', pin: string = '') {
    console.log('Plain PIN: ' + pin);
    if(type==='MP' && (pin==='' || !pin)) {
      console.log('Invalid PIN');
      return;
    }
    const hashedPin = this.global.getHashData(this.global.getHashData(pin), this.randomKey);
    console.log('Hashed PIN: ' + hashedPin);
    const postData = {
      loginType: type,
      mpin: hashedPin,
      deviceId: this.deviceId,
      loginKey: this.randomKey
    };
    this.rest.loginUser(postData).then(resp => {
      if (resp.RESP_CODE == 'MPAY1008') {
				this.global.setRoot('home');
			} else if (resp.RESP_STATUS === 'SUCCESS') {
        this.rest.authToken= resp.TOKEN;
        this.storage.setData('walletid', resp.walletId);
        this.storage.setData('custId', resp.custId);
        const userDetail= {
          lastLogin: resp.lastLogin,
          kycStatus: resp.kycStatus,
          walletId: resp.walletId,
          custId: resp.custId,
        };
        this.storage.setData('kycStatus', resp.kycStatus);
        this.rest.userDetail=userDetail;
        if (resp?.custId) {
          console.log("wallet id" + resp.walletId);
          this.global.setRoot('tabs/dashboard');
        } else {
          this.storage.remove('custId');
          this.global.setRoot('wallet-dashboard');
        }
      } else {
        this.alertService.showAlert('ALERT', resp.REASON || resp.RESP_CODE);
      }
    }).catch(err => {
      console.log(err);
      this.rest.closeLoader();
    });
  }
}
