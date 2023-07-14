import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController, NavController, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from 'src/app/services/global/global.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { SelectLangPage } from 'src/app/shared/popovers/select-lang/select-lang.page';
import { PinLoginPage } from '../pin-login/pin-login.page';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/services/alert/alert.service';
import { LoadingPage } from 'src/app/shared/popovers/loading/loading.page';
import { RestService } from 'src/app/services/rest/rest.service';
import { BiometryType, NativeBiometric } from "capacitor-native-biometric";
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

  constructor(
    private translate: TranslateService,
    public global: GlobalService,
    public storage: StorageService,
    private modalCtrl: ModalController,
    private alertService: AlertService,
    private popoverCtrl: PopoverController,
    private restService: RestService,
    private navCtrl: NavController

  ) {
    const data = [{ data: { students: { name: 'surya' } } }];
  }
  cancelModal() {
    this.modal.dismiss()
  }
  async ngOnInit() {
    const name = await this.storage.getData('app');
    console.log('App Status: ' + name);
    this.global.getDefaultLang();
    const sentence = 'Hello, worlds! This is a tests sentences';
    this.reversedSentence = this.reverseWordsWithOddLength(sentence);
    console.log('Reverse Word: ' + this.reversedSentence);
  }
  reverseWordsWithOddLength(sentence: string): string {
    const words = sentence.split(' ');
    const reversedWords = words.map(word => {
      if (word.length % 2 === 1) {
        // return word.split('').reverse().join('');
        return this.reverseWord(word);
      }
      return word;
    });
    return reversedWords.join(' ');
  }
  reverseWord(word: string) {
    const chars = word.split('');
    const revWord = chars.map(char => {
      console.log(char);
    });
    let start = 0;
    let end = chars.length - 1;

    while (start < end) {
      const temp = chars[start];
      chars[start] = chars[end];
      chars[end] = temp;
      start++;
      end--;
    }

    return chars.join('');
  }
  async test() {
    // Promise
    const delay = (ms: any) => {
      return new Promise((resolve, reject) => {
        resolve('Delayed value');
        reject('Delayed value error');
      });
    };

    delay(3000).then((result) => {
      console.log('Result: ' + result); // Output: Delayed value
    }).catch((error) => {
      console.error('Error: ' + error);
    });

    // Ovservable
    const numberObservable = new Observable((observer) => {
      let count = 0;
      const interval = setInterval(() => {
        observer.next(count);
        count++;
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    });

    /* const subscription = numberObservable.subscribe((value) => {
      console.log(value); // Output: 0, 1, 2, 3, ...
    });

     */


    const observer = {
      next: (value: any) => {
        console.log(value);
      },
      error: (error: any) => {
        console.error(error);
      },
      complete: () => {
        console.log('Completed');
      },
    };

    const subscription = numberObservable.subscribe(observer);
    // Unsubscribe after 5 seconds
    setTimeout(() => {
      subscription.unsubscribe();
    }, 5000);
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
        this.initPinLogin();
      }
    }
  }
  async initPinLogin() {
    this.modal.dismiss();
    this.navCtrl.navigateRoot(['/tabs']);
    // this.navCtrl.navigateRoot(['/wallet-dashboard']);
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

  async performBiometricVerificatin(){
    const result = await NativeBiometric.isAvailable();
  
    if(!result.isAvailable) {
      console.log('Biometric isn\'t availble')
      return;
    }
    const isFaceID = result.biometryType == BiometryType.FACE_ID;
  
    const verified = await NativeBiometric.verifyIdentity({
      reason: "For easy log in",
      title: "Biometric",
      subtitle: "Place your finger on the fingerprint scanner",
    }).then(() => true).catch(() => false);
  
    if(!verified) return;
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
    }).then();
    
  }
  deleteCredentials() {
    // Delete user's credentials
    NativeBiometric.deleteCredentials({
      server: "www.example.com",
    }).then();
  }
}
