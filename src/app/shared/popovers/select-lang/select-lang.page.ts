import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-select-lang',
  templateUrl: './select-lang.page.html',
  styleUrls: ['./select-lang.page.scss'],
})
export class SelectLangPage implements OnInit {
  languages = [
    { logo: 'assets/imgs/logo/laoflag.png', name: 'Lao', code: 'ls' },
    { logo: 'assets/imgs/logo/enflag.png', name: 'English', code: 'en' },
    { logo: 'assets/imgs/logo/chinaflag.png', name: 'Chiniese', code: 'zh' },
  ];
  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
  }
  close(value: any) {
    this.popoverCtrl.dismiss(value);
  }
}
