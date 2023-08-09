import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';
import { ConfirmTransferPage } from '../../confirm-transfer/confirm-transfer.page';
import { VerifyOtpPage } from 'src/app/shared/modals/verify-otp/verify-otp.page';
import { TxnResultPage } from '../../txn-result/txn-result.page';

@Component({
  selector: 'app-own-acc-transfer',
  templateUrl: './own-acc-transfer.component.html',
  styleUrls: ['./own-acc-transfer.component.scss'],
})
export class OwnAccTransferComponent  implements OnInit {
  @Input() fromAccDetail:any;
  @Input() accList:any;
  @Input() userDetail:any;
  @Input() exchangeRate:any=1;
  @Output() sendDetail: EventEmitter<any>= new EventEmitter();
  // fromAccDetail:any={};
  // accList:any=[];
  ftForm:FormGroup = new FormGroup({
    toAccount: new FormControl('', [Validators.required]),
    toAccountHolder: new FormControl(''),
    toCurrency: new FormControl('', [Validators.required]),
    txnAmount: new FormControl('', [Validators.required]),
    remarks: new FormControl(''),
  });
  feeAmount: any;
  otpReference: any;
  constructor(
    private global: GlobalService,
    private alertService: AlertService,
    private rest: RestService
  ) { }

  ngOnInit() {
    // this.test();
  }
  get accType() {
    return this.global.getAccType(this.fromAccDetail.accountType);
  }
  get accTypeCode() {
    return this.fromAccDetail.accountType;
  }
  get fromAccNo() {
    return this.fromAccDetail.accountNo;
  }
  get fromAccCur() {
    return this.fromAccDetail.accountCCY;
  }
  maskAcc(acc: string) {
    return this.global.maskedAccountNumber(acc);
  }
  getCurrency(accountCCY:string) {
    return this.global.getTextCurrency(accountCCY);
  }
  maskBalance(accountBalance:any) {
    return this.global.formatAmmount(accountBalance);
  }
  async openOwnToAccount() {
    await this.global.selectFromAccount(this.accList, this.fromAccDetail.accountNo).then(res => {
      if(!res) return;
      console.log(JSON.stringify(res));
      this.ftForm.controls['toAccount'].setValue(res.accountNo);
      this.ftForm.controls['toCurrency'].setValue(res.accountCCY);
    });
  }
  // BIC to BIC Own account transfer
  checkCrossCurrencyForOwnAccTransfer() {
    console.log('Form Data: ' + JSON.stringify(this.ftForm.value));
    const fromCurrency = this.global.getTextCurrency(this.fromAccDetail.accountCCY);
    const toCurrency = this.global.getTextCurrency(this.ftForm.controls['toCurrency'].value);
    if (this.global.getTextCurrency(fromCurrency) === this.global.getTextCurrency(toCurrency)) {
			// same to same currency allowed
			console.log('Same to same currency allowed');
			this.showOwnAccTransferCnfPage();
		} else if (fromCurrency === 'LAK' && toCurrency !== 'LAK') {
			// LAK to other currency not allowed
			console.log('LAK to other currency not allowed');
			this.alertService.showAlert('ALERT', 'CROSSCUR_MISSMATCH');
			return;
		} else if (fromCurrency !== 'LAK' && toCurrency !== 'LAK') {
			// other currency to other currency not allowed
			console.log('other currency to other currency not allowed');
			this.alertService.showAlert('ALERT', 'CROSSCUR_MISSMATCH');
			return;
		} else if (fromCurrency === 'LAK' && toCurrency === 'LAK') {
			// LAK to LAK allowed
			console.log('LAK to LAK allowed');
			this.showOwnAccTransferCnfPage();
		} else if (fromCurrency !== 'LAK' && toCurrency === 'LAK') {
			// Other currency to LAK allowed
			console.log('Other currency to LAK allowed');
			this.showOwnAccTransferCnfPage();
		}
  }
  formatNumber(num:string){
    return this.global.formatNumber(num);
  }
  formattedAmount(amount:any, fromCurrency:string) {
    let v=this.global.formatToNumeric(amount, 0);
    console.log('Amount: ' + v);
    if(this.global.getTextCurrency(fromCurrency) === 'LAK') {
      return v;
    }
    // code for usd/thb amount
    v=this.global.formatUsdAmount(amount);
    console.log('Amount: ' + v);
    return v;
  }
  getTextCurrency(currency:string) {
    return this.global.getTextCurrency(currency);
  }
  showOwnAccTransferCnfPage() {
    const fromCurrency = this.global.getTextCurrency(this.fromAccCur);
    const toCurrency = this.global.getNumericCurrency(this.ftForm.controls['toCurrency'].value);
    const txnAmount = this.ftForm.controls['txnAmount'].value;
    const formattedAmount = this.formattedAmount(txnAmount, fromCurrency);
    const cnfData = {
			fromAccount: this.fromAccNo,
      fromAccountHolder: this.userDetail.userName,
			curCode: fromCurrency,
			txnCurrency: fromCurrency,   // can be changed based on which currency exchange rate is to be applied
			toAccount: this.ftForm.controls['toAccount'].value,
			toCurCode: toCurrency,
			toAccountHolder: this.ftForm.controls['toAccountHolder'].value,
			nickName: this.ftForm.controls['toAccountHolder'].value,
			amount: formattedAmount,
			remarks: this.ftForm.controls['remarks'].value,
			accType: this.accTypeCode,
			feeAmount: this.feeAmount || '0',
			exchangeRate: this.exchangeRate || 1,
			transferType: 'own',
			mode: "M",
			bankId: "BIC",
			beneficiaryType: 'own',
			fromAccountName: 'Self',
			benfType: 'own'
		};
    console.log(cnfData);
    this.openConfirmPage(cnfData);
  }
  async openConfirmPage(cnfData:any) {
    const modal= await this.global.modalCtrl.create( {
      component: ConfirmTransferPage,
      componentProps: {cnfData},
      initialBreakpoint: 0.8,
      breakpoints: [0.4,0.5,0.6,0.7,0.8, 0.9],
      handle: true,
      backdropDismiss: false,
      showBackdrop: true,
      backdropBreakpoint: 0.2
    });
    await modal.present();
    const {data} = await modal.onDidDismiss();
    if(data==='Y') {
      this.initFundTransfer(cnfData);
    }
  }
  generateOtp(cnfData:any) {
    // FTR = Fund transfer, ABF = Add bnf, DBF = Delete BNF
    console.log('Generate OTP');
    this.rest.generateOtpForTransfer('FTR').then(res=>{
      if (res.RESP_CODE === 'MPAY1019') {
        this.global.timeout()
      } else if (res.RESP_STATUS == 'SUCCESS') {
        this.otpReference=res.otpRefId;
        this.showOtpScreen(cnfData);
      } else {
        this.alertService.showAlert('ALERT', res?.REASON || res?.RESP_CODE || 'SMTHNG_WENT_WRNG');
      }
    }).catch(() =>{
      this.rest.closeLoader();
      this.alertService.showAlert('ALERT', 'SMTHNG_WENT_WRNG');
    })
  }
  async showOtpScreen(cnfData:any) {
    console.log('Opening OTP Page');
    const modal=await this.global.modalCtrl.create({
      component: VerifyOtpPage,
      componentProps: {otpReference: this.otpReference},
      cssClass: 'action-sheet-modal',
      backdropDismiss: false,
      backdropBreakpoint: 0.1,
      showBackdrop: true,
      breakpoints: [0.5],
      initialBreakpoint: 0.4,
      handle: false
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log('OTP: ' + data);
    if(data){
      this.initFundTransfer(cnfData);
    }
  }
  async initFundTransfer(cnfData:any) {
    this.rest.fundTransfer(cnfData).then(resp=> {
      if (resp.RESP_CODE === 'MPAY1019') {
        this.global.timeout();
      } else if (resp.RESP_STATUS === 'SUCCESS' && resp.txnStatus == '00') {
        this.displayTxnResult('S', cnfData, resp);
      } else if (resp.txnStatus !== '00') {
        if (resp.RESP_CODE === 'MPAY1051' || resp.RESP_CODE === 'MPAY1034' || resp.RESP_CODE === 'MPAY1047') {
          this.alertService.showAlert('ALERT', resp.REASON || resp.RESP_CODE);
          this.alertService.showAlert('INSUFFICIENT_BALANCE','ALERT_MSG_BALANCE');
        } else {
          this.displayTxnResult('F', cnfData, resp);
        }
      } else {
        this.alertService.showAlert('ALERT', resp.REASON || resp.RESP_CODE);
      }
    }).catch(()=>{
      this.rest.closeLoader();
    });
  }

  async displayTxnResult(status:string, txnData:any, resp:any) {
    txnData.txnId= resp.TXN_ID;
    txnData.txnStatus=status;
    txnData.txnDate= new Date().toISOString();
    const result = await this.global.modalCtrl.create({
      component: TxnResultPage,
      componentProps: {txnData},
      animated: true
    });
    await result.present();
    const {data} = await result.onDidDismiss();
    console.log('FT Result screen closed: ' + data);
    this.global.pop();
  }
  get formStatus() {
    if(this.ftForm.valid) {
      return true;
    }
    return false;
  }
}
