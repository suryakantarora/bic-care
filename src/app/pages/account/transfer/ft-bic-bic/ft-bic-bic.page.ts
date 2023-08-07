import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-ft-bic-bic',
  templateUrl: './ft-bic-bic.page.html',
  styleUrls: ['./ft-bic-bic.page.scss'],
})
export class FtBicBicPage implements OnInit {
  accList: any=[{"accountState":"P","accountCCY":"418","accountPriority":"1","accountNo":"000010200667601","accountType":"10"},
  {"accountState":"S","accountCCY":"418","accountPriority":"2","accountNo":"000030200181803","accountType":"10"}];
  transferType='BIC';
  fromAccDetail: any={
    accountType: '10', 
    accountCCY:'418',
    accountNo:'000010200667601'
  };
  userDetail: any={};
  selectedCurrency: any='418';
  ftForm:FormGroup = new FormGroup({
    fromAccount: new FormControl(''),
    fromCurrency: new FormControl(''),
    toAccount: new FormControl(''),
    toCurrency: new FormControl(''),
    txnAmount: new FormControl(''),
    remarks: new FormControl(''),
    benefType: new FormControl('N'),
    toAccountHolder: new FormControl(''),
  });
  accountBalance: any='123331323.99';
  feeAmount: string;
  exchangeRate: any;
  constructor(
    private global: GlobalService,
    private alertService: AlertService,
    private rest: RestService,
  ) { }

  ngOnInit() {
    // this.getUserInfo();
  }
  get accType() {
    return this.global.getAccType(this.fromAccDetail.accountType);
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
  getUserInfo() {
    this.rest.getUserInfo({}).then(resp => {
      if (resp.RESP_CODE === 'MPAY1019') {
        this.global.timeout()
      } else if (resp.RESP_STATUS == 'SUCCESS') {
        this.userDetail = resp;
        this.getLinkedAccountNum();
      } else {
        this.alertService.showAlert('ALERT', resp.REASON || resp.RESP_CODE);
      }
    }).catch(err => {
      this.rest.closeLoader();
    });
  }

  getLinkedAccountNum() {
    this.rest.fetchLinkedAccount().then(resp => {
      if (resp.RESP_CODE === 'MPAY1019') {
        this.global.timeout()
      } else if (resp.RESP_STATUS == 'SUCCESS') {
        this.accList = [];
        this.accList = resp.data;
        this.global.getDefaultAccNumber(this.accList).then(res => {
          this.fromAccDetail = res;
          this.ftForm.controls['fromAccount'].setValue(res.accountNo);
          this.selectedCurrency = res.accountCCY;
          this.getAccountBalance(res.accountNo);
        });
      } else {
        this.alertService.showAlert('ALERT',  resp.REASON || resp.RESP_CODE);
      }
    }).catch(err => {
      this.rest.closeLoader();
    });
  }
  async selectFromAccount() {
    await this.global.selectFromAccount(this.accList).then(res => {
      if(!res) return;
      console.log(JSON.stringify(res));
      this.ftForm.controls['fromAccount'].setValue(res.accountNo);
      this.selectedCurrency = res.accountCCY;
      this.fromAccDetail=res;
      this.getAccountBalance(res.accountNo);
    });
  }
  async openOwnToAccount() {
    await this.global.selectFromAccount(this.accList, this.fromAccDetail.accountNo).then(res => {
      if(!res) return;
      console.log(JSON.stringify(res));
      this.ftForm.controls['toAccount'].setValue(res.accountNo);
      this.ftForm.controls['toCurrency'].setValue(res.accountCCY);
    });
  }
  getAccountBalance(accNum: any) {
		this.accountBalance = 0;
    this.rest.getAccountBalance(accNum).then(res => {
      if (res.RESP_CODE === 'MPAY1019') {
        this.global.timeout()
      } else if (res.RESP_STATUS == 'SUCCESS') {
        this.accountBalance = res.BALANCE;
        /* this.txnCurrency = res.CURRENCY;
        this.sourceCurrency = res.CURRENCY;
        this.fromAccDetail = res.ACCOUNT;
        this.exchangerate();
        this.fundTransferType = null; */
      }
      else {
        this.accountBalance = 0;
        this.alertService.showAlert('ALERT', res.REASON || res.RESP_CODE);
      }
    }).catch(err=>{
      this.rest.closeLoader();
    });
	}
  exchangerate() {

  }
  // BIC to BIC Own account transfer
  checkCrossCurrencyForOwnAccTransfer() {
    const fromCurrency = this.global.getTextCurrency(this.ftForm.controls['fromCurrency'].value);
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

  showOwnAccTransferCnfPage() {
    const fromCurrency = this.global.getTextCurrency(this.ftForm.controls['fromCurrency'].value);
    const toCurrency = this.global.getTextCurrency(this.ftForm.controls['toCurrency'].value);
    const cnfData = {
			toAccount: this.ftForm.controls['toAccount'].value,
			amount: this.ftForm.controls['txnAmount'].value,
			remarks: this.ftForm.controls['remarks'].value,
			transferType: 'own',
			fromAccount: this.ftForm.controls['fromAccount'].value,
			mode: "M",
			nickName: this.ftForm.controls['toAccountHolder'].value,
			curCode: fromCurrency,
			accType: this.accType,
			bankId: "BIC",
			beneficiaryType: 'own',
			feeAmount: this.feeAmount,
			toCurCode: toCurrency,
			txnCurrency: fromCurrency,
			exchangeRate: this.exchangeRate,
			fromAccountName: 'Self',
			benfType: 'own'
		};
  }

  // BIC to BIC other account transfer
  checkBenefType() {

  }
}
