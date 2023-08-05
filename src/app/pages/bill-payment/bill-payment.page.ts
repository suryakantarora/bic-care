import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-bill-payment',
  templateUrl: './bill-payment.page.html',
  styleUrls: ['./bill-payment.page.scss'],
})
export class BillPaymentPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }
  openPage(page:string) {
    this.navCtrl.navigateForward(['/' + page]).catch(() => {
      this.alertService.showToast('Page not found');
    })
  }
}
