import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ContactService } from 'src/app/services/global/contact.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';
import { BankListPage } from 'src/app/shared/modals/bank-list/bank-list.page';
import { SelectFavoritePage } from 'src/app/shared/modals/select-favorite/select-favorite.page';

@Component({
  selector: 'app-bic-lapnet',
  templateUrl: './bic-lapnet.component.html',
  styleUrls: ['./bic-lapnet.component.scss'],
})
export class BicLapnetComponent implements OnInit {
  @Input() fromAccDetail: any;
  @Input() accList: any;
  @Input() userDetail: any;
  @Input() exchangeRate: any;
  ftForm = new FormGroup({
    toAccount: new FormControl('2052592794', [Validators.required, Validators.minLength(10)]),
    toAccountHolder: new FormControl('Suryakant Kumar', [Validators.required]),
    toCurrency: new FormControl('418'),
    txnAmount: new FormControl('10000'),
    remarks: new FormControl('Test'),
    txnFee: new FormControl('1000'),
    toBankId: new FormControl('LAPNET'),
    memberIIN: new FormControl(''),
    memberName: new FormControl(''),
    memberId: new FormControl(''),
    benefType: new FormControl('NEW'),
  });
  constructor(
    public global: GlobalService,
    private rest: RestService,
    private alertService: AlertService,
  ) { }

  ngOnInit() { }
  get f() { return this.ftForm.controls; }
  get memberName() { return this.f['memberName'].value; }
  get toAccount() { return this.f['toAccount'].value; }
  get toCurrency() { return this.f['toCurrency'].value + ''; }

  get toBankLogo() {
    const toBankId= this.f['toBankId'].value + '';
    return this.global.getLogoPath(toBankId)
  }
  onChangeAccNum(){
    this.f['toAccountHolder'].setValue('');
  }
  async openBeneficiaryBank() {
    const modal = await this.global.modalCtrl.create({
      component: BankListPage,
      handle: false,
      mode: 'ios',
      initialBreakpoint: 1.0,
      breakpoints: [0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      backdropDismiss: false
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if(!data) return;
    console.log(data);
    this.f['memberId'].setValue(data.memberId);
    this.f['toBankId'].setValue(data.memberId);
    this.f['memberIIN'].setValue(data.memberIIN);
    this.f['memberName'].setValue(data.memberName);
  }

  async openBeneficiary() {
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
      this.ftForm.controls['toAccount'].setValue(data.accountNo);
      this.ftForm.controls['toAccountHolder'].setValue(data.accountName);
      this.ftForm.controls['toCurrency'].setValue(data.accountCurrency);
    } else {
      this.alertService.showToast('NO_BENEF_FOUND');
    }
  }
  searchBeneficiary() {
    const accNum= this.f['toAccount'].value;
    this.f['toAccountHolder'].setValue('Suryakant Kumar');
  }
}
