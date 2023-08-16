import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ContactService } from 'src/app/services/global/contact.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';
import { ConfirmTransferPage } from '../../confirm-transfer/confirm-transfer.page';
import { TxnResultPage } from '../../txn-result/txn-result.page';

@Component({
  selector: 'app-bic-umoney',
  templateUrl: './bic-umoney.component.html',
  styleUrls: ['./bic-umoney.component.scss'],
})
export class BicUmoneyComponent implements OnInit {
  @Input() fromAccDetail: any;
  @Input() accList: any;
  @Input() userDetail: any;
  @Input() exchangeRate: any;

  ftForm = new FormGroup({
    toAccount: new FormControl('2052592794', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]),
    toAccountHolder: new FormControl('Suryakant Kumar'),
    txnAmount: new FormControl('10000'),
    remarks: new FormControl('Test'),
    txnFee: new FormControl('1000'),
    toBankId: new FormControl('UMONEY'),
    toAccCurrency: new FormControl('418'),
  });
  constructor(
    public global: GlobalService,
    private rest: RestService,
    private alertService:AlertService,
    private contactService: ContactService,
    private translate: TranslateService
  ) { }

  ngOnInit() { 
  }
  selectContact() {
    this.contactService.selectContact([]).then(res=> {
      console.log('Contact List: ' + JSON.stringify(res));
      this.ftForm.controls['toAccount'].setValue(res);
    });
  }
  clearForm() {
    this.ftForm.controls['toAccount'].setValue('');
    this.ftForm.controls['toAccountHolder'].setValue('');
    this.ftForm.controls['txnAmount'].setValue('');
  }
  get txnAmount() {
    return this.ftForm.controls['txnAmount'].value;
  }
  get toAccountName() {
    return this.ftForm.controls['toAccountHolder'].value;
  }
  get toAccount() {
    return this.ftForm.controls['toAccount'].value;
  }
  searchMobileNumber() {
    console.log('');
    const mobNum=this.ftForm.controls['toAccount'].value + '';
    this.rest.umoneyAccInfo(mobNum).then(res => {
      if (res.RESP_CODE === 'MPAY1019') {
        this.global.timeout();
      } else if (res.RESP_STATUS == 'SUCCESS') {
        this.ftForm.controls['toAccountHolder'].setValue(res.accountName);
      } else {
        this.alertService.showAlert('ALERT', res?.REASON || res?.RESP_CODE || 'SMTHNG_WENT_WRNG');
      }
    }).catch(err =>{
      this.rest.closeLoader();
    });
  }

  validateFields() {
    const amount:any= this.global.formatToNumeric(this.ftForm.controls['txnAmount'].value);
    console.log(amount);
		const minLimit = 5000;
		const maxLimit = 20000000;
		if (amount < minLimit) {
      console.log('amount < minLimit: ' + (amount < minLimit));
			this.alertService.showAlert('ALERT', this.translate.instant('MINIMUM_TXN_LIMIT_ALERT', { amount: 'LAK ' + this.global.formatNumber(minLimit+'')}));
		} else if (amount > maxLimit) {
      console.log('amount > minLimit: ' + (amount > maxLimit));
			this.alertService.showAlert('ALERT', this.translate.instant('MAXIMUM_TXN_LIMIT_ALERT', { amount: 'LAK ' + this.global.formatNumber(maxLimit+'')}));
		} else {
			this.fetchFeeAmount(amount);
		}
	}
  fetchFeeAmount(amount:string) {
    this.rest.txnFeeAmount(amount, 'UMONEY_FEE').then(res=>{
      if (res.RESP_CODE === 'MPAY1019') {
        this.global.timeout();
      } else if (res.RESP_STATUS == 'SUCCESS') {
        if(!res.FEE || res.FEE === 'NODATA') {
          this.ftForm.controls['txnFee'].setValue('0');
        }
        this.ftForm.controls['txnFee'].setValue(res.FEE);
      } else {
        this.alertService.showAlert('ALERT', res?.REASON || res?.RESP_CODE || 'SMTHNG_WENT_WRNG');
      }
    }).catch(err =>{
      this.rest.closeLoader();
    });
  }
  async showConfirmScreen() {
    const cnfData:any = {
      txnDate: new Date().toISOString(),
			remarks: this.ftForm.controls['remarks'].value,
			fromAccount: this.fromAccDetail.accountNo,
			fromAccName: this.userDetail.fromAccName || 'NA',
			fromCurrency: this.fromAccDetail.accountCCY,
			curCode: this.fromAccDetail.accountCCY,
			fromAccType: '',
			toAccount: this.ftForm.controls['toAccount'].value,
			toAccName: this.ftForm.controls['toAccountHolder'].value,
			toCurrency: 'LAK',
			toAccType: '',
			txnFee: this.ftForm.controls['txnFee'].value,
			feeAmount: this.ftForm.controls['txnFee'].value,
			amount: this.ftForm.controls['txnAmount'].value,
			toBankId: this.ftForm.controls['toBankId'].value,
      fromAccountHolder: this.userDetail.nickName || 'Test'
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
    if (data === 'Y') {
      // this.proceedPay(cnfData);
      this.umoneyTransferResp({TXN_ID:'21321313213121321'}, cnfData, 'S');
    }
  }
	proceedPay(cnfData:any) {
    const amount:any= this.global.formatToNumeric(this.ftForm.controls['txnAmount'].value);
    const postData={
      phoneNumber: this.ftForm.controls['toAccount'].value,
			bankAccount: this.fromAccDetail.accountNo,
			amount: amount,
			feeAmount: this.ftForm.controls['txnFee'].value,
			content: this.ftForm.controls['remarks'].value,
			txnCurrency: this.ftForm.controls['toAccCurrency'].value
    };
    this.rest.umoneyAccTransfer(postData).then(res=>{
      if (res.RESP_CODE === 'MPAY1019') {
        this.global.timeout();
      } else if (res.RESP_STATUS == 'SUCCESS') {
        this.umoneyTransferResp(res, cnfData, 'S');
      } else {
        this.alertService.showAlert('ALERT', res?.REASON || res?.RESP_CODE || 'SMTHNG_WENT_WRNG');
      }
    }).catch(err =>{
      this.rest.closeLoader();
    });
  }
  async umoneyTransferResp(resp:any, txnData:any, status:string) {
    txnData.txnId = resp.TXN_ID || resp.transId;
    txnData.txnStatus = status;
    txnData.txnDate = new Date().toISOString();
    const result = await this.global.modalCtrl.create({
      component: TxnResultPage,
      componentProps: { txnData },
      animated: true
    });
    await result.present();
    const { data } = await result.onDidDismiss();
    console.log('FT Result screen closed: ' + data);
    this.global.pop();
  }
}
