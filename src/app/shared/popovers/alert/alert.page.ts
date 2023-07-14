import { Component, Input, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
})
export class AlertPage implements OnInit {
  // @Input() alertData:AlertData;
  alertData: any;
  constructor(
    private translate: TranslateService,
    private navParam: NavParams,
    private popoverCtrl: PopoverController
  ) { 
    this.alertData = this.navParam.data;
  }

  ngOnInit() {
  }
  close(data:string) {
    this.popoverCtrl.dismiss(data);
  }
}