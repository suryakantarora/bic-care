import { Injectable, NgZone } from '@angular/core';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { TranslateService } from '@ngx-translate/core';
import { SelectLangPage } from 'src/app/shared/popovers/select-lang/select-lang.page';
import { Device } from '@capacitor/device';
import { Toast } from '@capacitor/toast';
import { SHA512 } from 'crypto-js';
import { AccountListPage } from 'src/app/shared/modals/account-list/account-list.page';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  defaultLang: string = 'en';
  flagImage: string = 'assets/imgs/logo/enflag.png';
  profilePicAvatar = 'assets/imgs/home/man-icon-256x256.png';
  transferTo='';
  constructor(
    private translate: TranslateService,
    private storage: Storage,
    private popover: PopoverController,
    private navCtrl: NavController,
    public modalCtrl: ModalController,
    private ngZone: NgZone
  ) {
    this.storage.create();
    this.getDefaultLang();
  }
  showToast = async (msg: string) => {
    msg = (msg || 'Internal Server Error');
    await Toast.show({
      text: msg,
      duration: 'long',
      position: 'top'
    });
  };
  push(page: string) {
    console.log('Open Page: ' + page);
    this.ngZone.run(() => {
      this.navCtrl.navigateForward(['/' + page]).catch(err => {
        this.showToast('Page not found: ' + page);
      });
    });
  }
  getAccType(accType: any) {
    if (accType === '10' || accType === 10) {
      return 'SAVING_ACC';
    } else if (accType === '20' || accType === 20) {
      return 'CREDIT_ACC';
    } else if (accType===30 || accType==='30') {
      return 'FIXED_ACC';
    } else {
      return accType +' Account';
    }
  }
  async selectFromAccount(accList: any, disabledAcc:string='') {
    const modal = await this.modalCtrl.create({
      component: AccountListPage,
      cssClass: 'action-sheet-modal',
      componentProps: { accList:accList, disabledAcc:disabledAcc },
      initialBreakpoint: 0.5,
      breakpoints: [0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
      backdropBreakpoint: 0.3
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(JSON.stringify(data));
    return data;
  }
 
  setRoot(page: string) {
    this.ngZone.run(() => {
      this.navCtrl.navigateRoot(['/' + page]).catch(err => {
        this.showToast('Page not found: ' + page);
      });
    });
  }
  timeout() {
    this.ngZone.run(() => {
      this.navCtrl.navigateRoot(['/login']);
    });
  }
  pop() {
    this.ngZone.run(() => {
      this.navCtrl.pop().catch(err => {
        this.showToast('No page to remove');
      });
    });
  }
  getDefaultLang() {
    const lang = this.translate.getDefaultLang();
    console.log('Default Lang: ' + lang);
    this.defaultLang = lang;
    if (lang === 'ls') {
      this.flagImage = 'assets/imgs/logo/laoflag.png';
    } else if (lang === 'zh') {
      this.flagImage = 'assets/imgs/logo/chinaflag.png';
    } else if (lang === 'en') {
      this.flagImage = 'assets/imgs/logo/enflag.png';
    }
  }
  async setDefaultLang(lang: string) {
    console.log('Set default lang: ' + lang);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    await this.storage.set('lang', lang);
  }
  async changeLanguage(e: Event) {
    const popover = await this.popover.create({
      component: SelectLangPage,
      event: e,
      arrow: true,
      mode: 'ios'
    });
    await popover.present();
    await popover.onDidDismiss().then((data) => {
      console.log('Selected Lang: ' + JSON.stringify(data));
      if (data.data) {
        this.flagImage = data.data.logo;
        this.setDefaultLang(data.data.code);
      }
    });
  }
  deviceInfo = async () => {
    const info = await Device.getInfo();
    console.log('Device Info: ' + JSON.stringify(info));
  };
  maskAccNumber(number: string) {
    if (number) {
      // Ex:- 00001-02-XXXXXX-03
      let num = '' + number;
      const firstFour = num.substring(0, 5);
      const secondTwo = num.substring(5, 7);
      const lastTwo = num.substr(num.length - 2);
      let masked = firstFour + '-' + secondTwo + '-' + 'XXXXXXX' + '-' + lastTwo;
      //console.log('Raw Data : '+num + ' Masked : '+masked);
      return masked;
    }
    return '';
  }
  maskedMobile(number: string) {
    if (number) {
      let num = '' + number;
      const firstTwo = num.substring(0, 2);
      const lastThree = num.substr(num.length - 3);
      let masked = firstTwo + ' ' + 'XX XXX' + ' ' + lastThree;
      return masked;
    }
    return '';
  }
  maskedNumber(number: string) {
    // Ex:- 00001-02-XXXXXX-03
    let num = '' + number;
    const firstFour = num.substring(0, 4);
    const lastTwo = num.substr(num.length - 4);
    let masked = firstFour + '-' + 'XXXX' + '-' + 'XXXX' + '-' + lastTwo;
    //console.log('Raw Data : '+num + ' Masked : '+masked);
    return masked;
  }
  maskedCardNumber(number: string) {
    // Ex:- 00001-02-XXXXXX-03
    let num = '' + number;
    const firstFour = num.substring(0, 4);
    const lastTwo = num.substr(num.length - 4);
    let masked = firstFour + '' + '-XXXX-' + ' ' + 'XXXX-' + '' + lastTwo;
    //console.log('Raw Data : '+num + ' Masked : '+masked);
    return masked;
  }
  maskedAccountNumber(number: string) {
    let num = '' + number;
    const firstTwo = num.substring(0, 2);
    const lastFour = num.substring(num.length - 4);
    let masked = firstTwo + '' + '-XXXX-' + ' ' + 'XXXX-' + '' + lastFour;
    return masked;
  }
  getNumericCurrency(currency: string) {
    // console.log("Numeric Currency: " + currency);
    if (currency == "USD" || currency == "840") {
      return "840";
    } else if (currency === "LAK" || currency === "418") {
      return "418";
    } else if (currency === "THB" || currency === "764") {
      return "764";
    } else if (currency === "EUR" || currency === "954") {
      return "954";
    } else {
      return currency;
    }
  }
  getTextCurrency(currency: string) {
    // console.log("Text Currency: " + currency);
    if (currency == "USD" || currency == "840") {
      return "USD";
    } else if (currency === "LAK" || currency === "418") {
      return "LAK";
    } else if (currency === "THB" || currency === "764") {
      return "THB";
    } else if (currency === "EUR" || currency === "954") {
      return "EUR";
    } else {
      return currency;
    }
  }
  formatNumber(num:string) {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return num_parts.join(",");
  }

  // Amount Masking code
  formatAmmount(num: any) {
    if(!num) return;
    const num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return num_parts.join(",");
  }


  thousandSeperator(data: any) {
    data = data.toString().replace(/[.]*/g, '');
    return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  actualAmount(data: any) {
    let item = data;
    const dots = /./gi;
    const commas = /,/gi;
    let data1 = item.toString().replace(/[.]*/g, '');
    data1 = data1.toString().replace(/[,]*/g, '.');
    return data1;
  }
  getInteger(data: any) {
    const re = /./gi;
    let data1 = data.replace(re, "");
    return data1;
  }
  formatToNumeric(intNum: any, floatNum: any) {
    let data1 = Number(intNum.toString().replace(/[.]*/g, ''));
    let data2 = Number(floatNum);
    let amount = data1;
    if (data2 !== 0) {
      const countDigits = this.digits_count(data2);
      if (countDigits == 1) {
        amount = data1 + (data2 / 10);
      } else if (countDigits == 2) {
        amount = data1 + (data2 / 100);
      }
    }
    return amount;
  }
  formatUsdAmount(num:any) {
    const num_parts = num.toString().split(",");
    num_parts[0] = num_parts[0].replaceAll(".", "");
    return num_parts.join(".");
  }
  digits_count(n: any) {
    var count = 0;
    if (n >= 1) ++count;
    while (n / 10 >= 1) {
      n /= 10;
      ++count;
    }
    return count;
  }
  checkValidMobileNo(contact: any) {
    return contact.match(/^[^a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/) ? false : true;
  }
  getMobileNum(num: any) {
    console.log('Num: ' + num);
    let mobileNum = num.replace(/\s/g, '');
    mobileNum = mobileNum.replace('+856', '');
    console.log('Mobile: ' + mobileNum)
    return mobileNum;
  }
  getHashData(data: string, key: string = 'BICBANK') {
    return SHA512(data + key) + '';
  }
  generateRandomKey() {
    var resultKey = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    var length = 10;
    for (var i = 0; i < length; i++) {
      resultKey += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return resultKey;
  }

  async getPrimaryAccount(accList: any) {
    let primaryAcc = '';
    accList.forEach((acc: any) => {
      if (acc.accountState === 'P') {
        primaryAcc = acc;
      }
    });
    console.log('primaryAcc: ' + JSON.stringify(primaryAcc));
    return primaryAcc;
  }
  async getDefaultAccNumber(accList: any) {
    let accDetail: any = {};
    await accList.forEach((acc: any) => {
      if (acc.accountState === 'P') {
        accDetail = acc;
      }
    });
    return accDetail;
  }
  getProfilePic() {
    let res = '';
    this.storage.get('profilePic').then(res => {
      return res;
    }).catch(() => {
      return this.profilePicAvatar;
    });
  }

  getLogoPath(data:string) {
		if (data == "BCEL") {
			return 'assets/imgs/bank-logo/27710418.png';
		} else if (data == "LDB") {
			return 'assets/imgs/bank-logo/70030418.png';
		} else if (data == "JDB") {
			return 'assets/imgs/bank-logo/32170418.png';
		} else if (data == "LVB") {
			return 'assets/imgs/bank-logo/70050418.png';
		} else if (data == "APB") {
			return 'assets/imgs/bank-logo/70020418.png';
		} else if (data == "MJB") {
			return 'assets/imgs/bank-logo/70040418.png';
		} else if (data == "ICBC") {
			return 'assets/imgs/bank-logo/70070418.png';
		} else if (data == "BOC") {
			return 'assets/imgs/bank-logo/70100418.png';
		} else if (data == "VTB") {
			return 'assets/imgs/bank-logo/70120418.png';
		} else if (data == "IDB") {
			return 'assets/imgs/bank-logo/70140418.png';
		} else if (data == "ACLE") {
			return 'assets/imgs/bank-logo/70080418.png';
		} else if (data == "SACOM") {
			return 'assets/imgs/bank-logo/70130418.png';
		} else if (data == "STB") {
			return 'assets/imgs/bank-logo/70150418.png';
		} else if (data == "BIC") {
			return 'assets/imgs/bank-logo/70110418.png';
		} else if (data == "VMB") {
			return 'assets/imgs/bank-logo/70190418.png';
		} else if (data == "PSV") {
			return 'assets/imgs/bank-logo/29110418.png';
		} else if (data == "BFL") {
			return 'assets/imgs/bank-logo/37160418.png';
		} else if (data == "CAMBODIA") {
			return 'assets/imgs/bank-logo/CAMBODIA.png';
		}
    return 'assets/imgs/bank-logo/bank-logo.png';
	}
}
