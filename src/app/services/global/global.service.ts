import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { TranslateService } from '@ngx-translate/core';
import { SelectLangPage } from 'src/app/shared/popovers/select-lang/select-lang.page';
import { Device } from '@capacitor/device';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  defaultLang: string='en';
  flagImage: string='assets/imgs/logo/enflag.png';

  constructor(
    private translate: TranslateService,
    private storage: Storage,
    private popover: PopoverController
  ) {
    this.storage.create();
    this.getDefaultLang();
  }

  getDefaultLang() {
    const lang = this.translate.getDefaultLang();
    console.log('Default Lang: ' + lang);
    this.defaultLang = lang;
    if(lang==='ls') {
      this.flagImage='assets/imgs/logo/laoflag.png';
    } else if (lang==='zh') {
      this.flagImage='assets/imgs/logo/chinaflag.png';
    } else if (lang==='en') {
      this.flagImage='assets/imgs/logo/enflag.png';
    }
  }
  async setDefaultLang(lang:string){
    console.log('Set default lang: '+ lang);
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
      if(data.data) {
        this.flagImage= data.data.logo;
        this.setDefaultLang(data.data.code);
      }
    });
  }
  deviceInfo = async () => {
    const info = await Device.getInfo();
    console.log('Device Info: ' + JSON.stringify(info));
  };
}
