import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './services/storage/storage.service';
import { register } from 'swiper/element/bundle';
import { StatusBar, Style } from '@capacitor/status-bar';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    private storageService: StorageService
  ) {
    // this.storageService.initStorage();
    register(); // for swiper
    StatusBar.setBackgroundColor({color: '#2E368D'}).catch(err=> {
      console.log('Status bar will not work')
    });
    this.initializeApp();
  }
  async initializeApp() {
    const lang = await this.storageService.getData('lang');
    console.log('default lang: ' + lang);
    if (!lang) {
      this.translate.setDefaultLang('en');
      this.translate.use('en');
      this.storageService.setData('lang', 'en');
    } else {
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);
    }
  }
}
