import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmTransferPage } from 'src/app/pages/account/transfer/confirm-transfer/confirm-transfer.page';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';
import { SelectFavoritePage } from 'src/app/shared/modals/select-favorite/select-favorite.page';

@Component({
  selector: 'app-wallet-to-account',
  templateUrl: './wallet-to-account.page.html',
  styleUrls: ['./wallet-to-account.page.scss'],
})
export class WalletToAccountPage implements OnInit {
  @Input() walletDetail:any={};
  transferType='OWN';
  fromCurrency='LAK';
  accList:any=[];
  exchangeRate:any=1;
  fromAccDetail:any={};
  userDetail:any={};
  ftForm:FormGroup = new FormGroup({
    toAccount: new FormControl('', [Validators.required]),
    toAccountHolder: new FormControl(''),
    toCurrency: new FormControl('', [Validators.required]),
    txnAmount: new FormControl('', [Validators.required]),
    remarks: new FormControl(''),
    benefType: new FormControl('N'),
  });
  feeAmount: any;
  otpReference: any;
  benefDetail: any;
  constructor(
    public global: GlobalService,
    private alertService: AlertService,
    private rest: RestService
  ) { 
    
  }

  ngOnInit() {
  }
  clearForm() {
    this.ftForm.reset();
  }
  async getLinkedAccountNum() {
    if(this.accList.length>0) {
      this.openOwnToAccount();
      return;
    }
    this.rest.fetchLinkedAccount().then(resp => {
      if (resp.RESP_CODE === 'MPAY1019') {
        this.global.timeout()
      } else if (resp.RESP_STATUS == 'SUCCESS') {
        this.accList = [];
        this.accList = resp.data;
        this.openOwnToAccount();
      } else {
        this.alertService.showAlert('ALERT', resp.REASON || resp.RESP_CODE);
      }
    }).catch(err => {
      this.rest.closeLoader();
    });
  }
  async openOwnToAccount() {
    await this.global.selectFromAccount(this.accList).then(res => {
      if(!res) return;
      console.log(JSON.stringify(res));
      this.ftForm.controls['toAccount'].setValue(res.accountNo);
      this.ftForm.controls['toCurrency'].setValue(res.accountCCY);
    });
  }

  
  // Wallet to own acc transfer ends here


  // Wallet to other bic account transfer code goes here
  checkBenefType() {
    const benefType = this.ftForm.controls['benefType'].value;
    if (benefType === 'N') {
      this.validateToAccNumber('S', 'BIC');
    } else {
      this.checkCrossCurrencyTransfer('O');
    }
  }
  async openBicBeneficiary() {
    const modal = await this.global.modalCtrl.create({
      component: SelectFavoritePage,
      handle: false,
      breakpoints: [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      showBackdrop: true,
      backdropDismiss: false,
      initialBreakpoint: 0.9,
      cssClass:'action-modal-sheet'
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
  validateToAccNumber(type: string, bankId: string) {
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
        this.checkCrossCurrencyTransfer('O');
      } else {
        this.alertService.showAlert('ALERT', res?.REASON || res?.RESP_CODE || 'SMTHNG_WENT_WRNG');
      }
    }).catch(err => {
      this.rest.closeLoader();
    });
  }

  // common method for both type

  // Wallet to own acc transfer code goes here

  checkCrossCurrencyTransfer(type:string) {
    const toCurrency=this.ftForm.controls['toCurrency'].value;
    const fromCurrency='LAK';
    if(this.global.getTextCurrency(toCurrency)) {
			// same to same currency allowed
			console.log('Same to same currency allowed');
			this.showTransferCnfPage(type);
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
			this.showTransferCnfPage(type);
		} else if (fromCurrency !== 'LAK' && toCurrency === 'LAK') {
			// Other currency to LAK allowed
			console.log('Other currency to LAK allowed');
			this.showTransferCnfPage(type);
    }
  }

  async showTransferCnfPage(type:string) {
    const fromCurrency = this.global.getTextCurrency(this.fromCurrency);
    const toCurrency = this.global.getNumericCurrency(this.ftForm.controls['toCurrency'].value);
    const txnAmount = this.ftForm.controls['txnAmount'].value;
    const formattedAmount = this.global.formattedAmount(txnAmount, fromCurrency);
    const cnfData = {
			fromAccount: this.walletDetail.mobileNo,
      fromAccountHolder: this.walletDetail.custName,
			curCode: fromCurrency,
			txnCurrency: fromCurrency,   // can be changed based on which currency exchange rate is to be applied
			toAccount: this.ftForm.controls['toAccount'].value,
			toCurCode: toCurrency,
			toAccountHolder: this.walletDetail.custName,
			nickName: this.walletDetail.custName,
			amount: formattedAmount,
			remarks: this.ftForm.controls['remarks'].value,
			feeAmount: this.feeAmount || '0',
			exchangeRate: this.exchangeRate || 1,
			transferType: type==='S'?'own':'bic',
			mode: "M",
			bankId: "BIC",
			beneficiaryType: type==='S'?'own':'bic',
			fromAccountName: this.walletDetail.custName,
			benfType: type==='S'?'own':'bic',
      paymentFrom:'W',
      paymentTo:'A'
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
      backdropBreakpoint: 0.2,
      cssClass: 'action-sheet-modal'
    });
    await modal.present();
    const {data} = await modal.onDidDismiss();
    if(data==='Y') {
      this.initFundTransfer(cnfData);
    }
  }
  async initFundTransfer(cnfData:any) {

  }
}
