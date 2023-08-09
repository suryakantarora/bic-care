import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';
import { ConfirmTransferPage } from '../../confirm-transfer/confirm-transfer.page';
import { TxnResultPage } from '../../txn-result/txn-result.page';
import { VerifyOtpPage } from 'src/app/shared/modals/verify-otp/verify-otp.page';

@Component({
  selector: 'app-bic-acc-transfer',
  templateUrl: './bic-acc-transfer.component.html',
  styleUrls: ['./bic-acc-transfer.component.scss'],
})
export class BicAccTransferComponent  implements OnInit {
  @Input() fromAccDetail:any;
  @Input() userDetail:any;
  @Input() accList:any;
  @Input() exchangeRate:any=1;
  @Output() sendDetail: EventEmitter<any>= new EventEmitter();
  // fromAccDetail:any={};
  // accList:any=[];
  ftForm:FormGroup = new FormGroup({
    fromAccount: new FormControl(''),
    fromCurrency: new FormControl(''),
    toAccount: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(20)]),
    toCurrency: new FormControl(''),
    txnAmount: new FormControl('', [Validators.required]),
    remarks: new FormControl(''),
    benefType: new FormControl('N', [Validators.required]),
    toAccountHolder: new FormControl(''),
    toAccType: new FormControl(''),
  });
  feeAmount: any;
  otpReference: any;
  constructor(
    private global: GlobalService,
    private alertService: AlertService,
    private rest: RestService
  ) { }

  ngOnInit() {

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
  checkBenefType() {
    const benefType= this.ftForm.controls['benefType'].value;
    if (benefType === 'N') {
			this.validateToAccNumber('S', 'BIC');
		} else {
			this.checkCrossCurrencyForBICAccTransfer();
		}
  }
  openBicBeneficiary() {

  }
  validateToAccNumber(type:string, bankId:string) {
		const toAccount = this.global.getNumericCurrency(this.ftForm.controls['toAccount'].value);
		const postData = {
			accNo: toAccount,
			bankId: bankId,
			beneficiaryType: type
		};
		console.log('accountInfo PostData : ' + JSON.stringify(postData));
		this.rest.accountInfo(postData).then(res => {
      if (res.RESP_CODE === 'MPAY1019') {
        this.global.timeout();
      } else if (res.RESP_STATUS == 'SUCCESS') {
        this.ftForm.controls['toAccountHolder'].setValue(res.accountName);
        this.ftForm.controls['toCurrency'].setValue(res.accountCCY);
        this.ftForm.controls['toAccType'].setValue(res.accountType);
        this.checkCrossCurrencyForBICAccTransfer();
      } else {
        this.alertService.showAlert('ALERT', res?.REASON || res?.RESP_CODE || 'SMTHNG_WENT_WRNG');
      }
    }).catch(err => {
      this.rest.closeLoader();
    });
	} 

	checkCrossCurrencyForBICAccTransfer() {
    console.log('Form Data: ' + JSON.stringify(this.ftForm.value));
    const fromCurrency = this.global.getTextCurrency(this.fromAccDetail.accountCCY);
    const toCurrency = this.global.getTextCurrency(this.ftForm.controls['toCurrency'].value);
    if (this.global.getTextCurrency(fromCurrency) === this.global.getTextCurrency(toCurrency)) {
			// same to same currency allowed
			console.log('Same to same currency allowed');
			this.showBICAccTransferCnfPage();
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
			this.showBICAccTransferCnfPage();
		} else if (fromCurrency !== 'LAK' && toCurrency === 'LAK') {
			// Other currency to LAK allowed
			console.log('Other currency to LAK allowed');
			this.showBICAccTransferCnfPage();
		}
	}
	showBICAccTransferCnfPage() {
    const bnfType=(this.ftForm.controls['benefType'].value==='N'?'new':'old');
		const fromCurrency = this.global.getTextCurrency(this.fromAccCur);
    const toCurrency = this.global.getNumericCurrency(this.ftForm.controls['toCurrency'].value);
    const txnAmount = this.ftForm.controls['txnAmount'].value;
    const formattedAmount = this.formattedAmount(txnAmount, fromCurrency);
    const cnfData = {
			fromAccount: this.fromAccNo,
			curCode: fromCurrency,
      fromAccountHolder: this.userDetail.userName,
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
			transferType: 'bic',
			mode: "M",
			bankId: "BIC",
			beneficiaryType: bnfType,
			fromAccountName: 'Self',
			benfType: 'own'
		};
    console.log(cnfData);
    this.openConfirmPage(cnfData);
  }

  test() {
    const data = {
      fromAccount: '65186258e6152633',
			curCode: '418',
			txnCurrency: '418',   // can be changed based on which currency exchange rate is to be applied
			toAccount: '95697859779679687',
			toCurCode: '418',
			nickName: 'Suryakant Kumar',
			amount: '10000',
			remarks: 'Test Remarks',
			accType: '10',
			feeAmount: '1000',
			exchangeRate: 1,
			transferType: 'own',
			mode: "M",
			bankId: "BIC",
			beneficiaryType: 'own',
			fromAccountName: 'Self',
			benfType: 'own'
    };
    const resp={
      TXN_ID: 'TXNID6556769786798689678'
    }
    this.displayTxnResult('S', data, resp)
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
      this.generateOtp(cnfData);
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
    if(data.otpStatus==='V'){
      this.initFundTransfer(cnfData, data);
    }
  }

  async initFundTransfer(cnfData:any, otpResp:any) {
    this.rest.fundTransfer(cnfData).then(resp=> {
      if (resp.RESP_CODE === 'MPAY1019') {
        this.global.timeout();
      } else if (resp.RESP_STATUS === 'SUCCESS' && resp.txnStatus == '00') {
        this.displayTxnResult('S', cnfData, resp);
      } else if (resp.txnStatus !== '00') {
        if (resp.RESP_CODE === 'MPAY1051' || resp.RESP_CODE === 'MPAY1034' || resp.RESP_CODE === 'MPAY1047') {
          this.alertService.showAlert('ALERT', resp.REASON || resp.RESP_CODE);
          // this.alertService.showAlert('INSUFFICIENT_BALANCE','ALERT_MSG_BALANCE');
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
}
