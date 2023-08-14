import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';
import { SelectFavoritePage } from 'src/app/shared/modals/select-favorite/select-favorite.page';

@Component({
  selector: 'app-bic-bcel',
  templateUrl: './bic-bcel.component.html',
  styleUrls: ['./bic-bcel.component.scss'],
})
export class BicBcelComponent  implements OnInit {
  @Input() fromAccDetail:any;
  @Input() accList:any;
  @Input() userDetail:any;
  @Input() exchangeRate:any;

  selectedTab='OLD';
  benefDetail:any={};
  ftForm= new FormGroup({
    toAccount: new FormControl(''),
    toAccountHolder: new FormControl(''),
    toCurrency: new FormControl(''),
  })
  constructor(
    public global: GlobalService,
    private rest: RestService,
    private alertService: AlertService
  ) { }

  ngOnInit() {}
  changeActiveTab(data:string) {
    this.selectedTab=data;
  }
  async loadBeneficiary(benefBank:string) {
    console.log('this.fromAccDetail: ' + JSON.stringify(this.fromAccDetail));
    /* if (this.global.getTextCurrency(this.fromAccDetail.accountCCY) === 'LAK') {
			this.alertService.showAlert('ALERT', 'FROM_CUR_IS_NOT_ALLOWED');
			return;
		} */

    const modal = await this.global.modalCtrl.create({
      component: SelectFavoritePage,
      handle: false,
      breakpoints: [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      showBackdrop: true,
      backdropDismiss: false,
      initialBreakpoint: 0.9
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      this.benefDetail = data;
      this.ftForm.controls['toAccount'].setValue(data.accountNo);
      this.ftForm.controls['toAccountHolder'].setValue(data.accountName);
      this.ftForm.controls['toCurrency'].setValue(data.accountCurrency);
    } else {
      this.alertService.showToast('NO_BENEF_FOUND');
    }
  }
}
