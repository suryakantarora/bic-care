import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';
import { SelectFavoritePage } from 'src/app/shared/modals/select-favorite/select-favorite.page';
import { ConfirmTransferPage } from '../../confirm-transfer/confirm-transfer.page';

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

  selectedTab='NEW';
  benefDetail:any={};
  ftForm= new FormGroup({
    toAccount: new FormControl('1234567890', [Validators.required, Validators.minLength(10)]),
    toAccountHolder: new FormControl('Ashutosh Kumar'),
    toCurrency: new FormControl('USD'),
    txnAmount: new FormControl('10000'),
    remarks: new FormControl('test'),
    toAccType: new FormControl('O'),
    txnFee: new FormControl('1000'),
    toBankId: new FormControl('BCEL'),
  })
  fromAccType: any;
  constructor(
    public global: GlobalService,
    private rest: RestService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.showConfirm();
  }
  changeActiveTab(data:string) {
    this.selectedTab=data;
    this.clearBeneficiaryDetail();
  }
  clearBeneficiaryDetail() {
    this.ftForm.controls['toAccount'].setValue('');
    this.ftForm.controls['toCurrency'].setValue('');
    this.ftForm.controls['toAccountHolder'].setValue('');
  }
  get toAccountNo() {
    return this.ftForm.controls['toAccount'].value + '';
  }
  get toCurrency() {
    return this.ftForm.controls['toCurrency'].value + '';
  }
  get toAccHolder() {
    return this.ftForm.controls['toAccountHolder'].value + '';
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

  validateAccountNumber(){
    console.log(this.ftForm.value);
    const accNum = this.ftForm.controls['toAccount'].value;

    this.ftForm.controls['toAccountHolder'].setValue('Ashutosh Kumar');
    this.ftForm.controls['toCurrency'].setValue('USD');
    return;
    const postData = {
			accountNumber: accNum,
			bankId: 'BCEL',
			beneficiaryType: 'O'
		};
    this.rest.accountInfo(postData).then(res => {
      if (res.RESP_CODE === 'MPAY1019') {
        this.global.timeout();
      } else if (res.RESP_STATUS == 'SUCCESS') {
        this.ftForm.controls['toAccountHolder'].setValue(res.accountName);
        this.ftForm.controls['toCurrency'].setValue(res.accountCCY);
      } else {
        this.alertService.showAlert('ALERT', res?.REASON || res?.RESP_CODE || 'SMTHNG_WENT_WRNG');
      }
    }).catch(err =>{
      this.rest.closeLoader();
    });
  }
  checkCrossCurrencyForOtherAccTransfer() {
    this.accountFeeLimit();
    /* if (this.global.getTextCurrency(this.fromAccDetail.accountCCY) === this.global.getTextCurrency(this.toCurrency)) {
			this.accountFeeLimit();
		} else if (this.global.getTextCurrency(this.fromAccDetail.accountCCY) === 'USD' && this.global.getTextCurrency(this.toCurrency) === 'LAK') {
			this.accountFeeLimit();
		} else if (this.global.getTextCurrency(this.fromAccDetail.accountCCY) === 'THB' && this.global.getTextCurrency(this.toCurrency) === 'LAK') {
			this.accountFeeLimit();
		} else {
			this.alertService.showAlert('ALERT','CUR_MISMATCH');
		} */
  }
  async accountFeeLimit() {
    const postData = {
			accountNo: this.fromAccDetail.accountNo,
			txnCurrency: this.fromAccDetail.accountCCY,
			txnAmount: this.ftForm.controls['txnAmount'].value,
			paymentMode: "A",
			txnType: "FTR",
			toBank: this.ftForm.controls['toBankId'].value
		};
    this.rest.fetchFeeLimit(postData).then(res => {
      if (res.RESP_CODE === 'MPAY1019') {
        this.global.timeout();
      } else if (res.RESP_STATUS == 'SUCCESS') {
        this.ftForm.controls['txnFee'].setValue(res.feeAmount);
        this.showTxnFeeAlert(res.feeAmount);
      } else {
        this.alertService.showAlert('ALERT', res?.REASON || res?.RESP_CODE || 'SMTHNG_WENT_WRNG');
      }
    }).catch(err =>{
      this.rest.closeLoader();
    });
  }
  async showTxnFeeAlert(txnFee:any) {
		console.log('Showing txn fee alert');
		let curCode = this.global.getTextCurrency(this.fromAccDetail.accountCCY);
		const msg = 'Amount : ' + this.global.formatNumber((txnFee * 1.0).toFixed(2)) + ' ' + curCode +
			', will be deducted as Transaction Fee. Do you want to proceed?';
		const alert= await this.alertService.showConfirmAlert('ALERT', msg);
    await alert.present();
    const {data} = await alert.onDidDismiss();
    console.log(data);
    if(data === 'Y') {
      this.showConfirm();
    }
	}
  async showConfirm() {
    const cnfData: any = {
			txnDate: new Date().toISOString(),
			remarks: this.ftForm.controls['remarks'].value,
			fromAccount: this.fromAccDetail.accountNo,
			fromAccName: this.userDetail.fromAccName || 'NA',
			fromCurrency: this.fromAccDetail.accountCCY,
			curCode: this.fromAccDetail.accountCCY,
			fromAccType: this.fromAccType || '',
			toAccount: this.ftForm.controls['toAccount'].value,
			toAccName: this.ftForm.controls['toAccountHolder'].value,
			toCurrency: this.ftForm.controls['toCurrency'].value,
			toAccType: this.ftForm.controls['toAccType'].value,
			txnFee: this.ftForm.controls['txnFee'].value,
			amount: this.ftForm.controls['txnAmount'].value,
			toBankId: this.ftForm.controls['toBankId'].value,
		};
    console.log(cnfData);
    const modal = await this.global.modalCtrl.create({
      component: ConfirmTransferPage,
      componentProps: { cnfData },
      initialBreakpoint: 0.8,
      breakpoints: [0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
      handle: true,
      backdropDismiss: false,
      showBackdrop: true,
      backdropBreakpoint: 0.2,
      cssClass: 'action-sheet-modal'
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data);
    if (data === 'Y' && cnfData.beneficiaryType === 'new') {
      // this.generateOtp(cnfData);
    } else if (data === 'Y' && cnfData.beneficiaryType === 'old') {
      // this.initFundTransfer(cnfData);
    }
  }
  async initFundtRansfer() {

  }
}
