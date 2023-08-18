import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmTransferPage } from 'src/app/pages/account/transfer/confirm-transfer/confirm-transfer.page';
import { TxnResultPage } from 'src/app/pages/account/transfer/txn-result/txn-result.page';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ContactService } from 'src/app/services/global/contact.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-wallet-to-wallet',
  templateUrl: './wallet-to-wallet.page.html',
  styleUrls: ['./wallet-to-wallet.page.scss'],
})
export class WalletToWalletPage implements OnInit {
  @Input() walletDetail:any={};
  @Input() userInfo:any={};
  ftForm: FormGroup = new FormGroup({
    toAccount: new FormControl('2052592764', [Validators.required, Validators.minLength(10)]),
    txnAmount: new FormControl('10000', [Validators.required]),
    toAccountHolder: new FormControl('Chandrasekhar Azad'),
    remarks: new FormControl('test'),
    txnFee: new FormControl('0'),
    toBankId: new FormControl('BIC'),
    transferType: new FormControl('W2W')
  });
  constructor(
    private contactService: ContactService,
    public global: GlobalService,
    private alertService: AlertService,
    private rest: RestService
  ) { }

  ngOnInit() {
  }
  get f() { return this.ftForm.controls;}
  initUserDetails(event:any) {

  }
  initWalletDetails(event:any) {
    this.walletDetail=event;
  }
  getContact() {
    this.contactService.selectContact().then(res => {
      this.f['toAccount'].setValue(res);
    });
  }
  validateForm() {
    const amt= this.global.formatToNumeric(this.f['txnAmount'].value);
    this.confirmScreen(amt);
  }
  async confirmScreen(amt:any) {
    console.log(this.walletDetail);
    const cnfData:any = {
      txnDate: new Date().toISOString(),
			remarks: this.ftForm.controls['remarks'].value,
			fromAccount: this.walletDetail.mobileNo,
			fromAccName: this.userInfo.userName || 'NA',
			fromCurrency: this.walletDetail.walletCurrency,
			curCode: this.walletDetail.walletCurrency,
			toAccount: this.ftForm.controls['toAccount'].value,
			toAccName: this.ftForm.controls['toAccountHolder'].value,
			toCurrency: 'LAK',
			txnFee: this.ftForm.controls['txnFee'].value,
			feeAmount: this.ftForm.controls['txnFee'].value,
			amount: amt,
			toBankId: this.ftForm.controls['toBankId'].value,
      fromAccountHolder: this.userInfo.userName || 'Test',
      paymentTo: 'W',
      paymentFrom: 'W'
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
      this.transferResp({TXN_ID:'21321313213121321'}, cnfData, 'S');
    }
  }

  async transferResp(resp:any, txnData:any, status:string) {
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
