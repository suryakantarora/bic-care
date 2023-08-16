import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StatusBar } from '@capacitor/status-bar';
import { NavParams } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';
import html2canvas from 'html2canvas';
import { AlertService } from 'src/app/services/alert/alert.service';
import { SocialShareService } from 'src/app/services/social-share/social-share.service';
import { FileSharer } from '@byteowls/capacitor-filesharer';

@Component({
  selector: 'app-txn-result',
  templateUrl: './txn-result.page.html',
  styleUrls: ['./txn-result.page.scss'],
})
export class TxnResultPage implements OnInit {
  @ViewChild('receipt_screen') receipt_screen: ElementRef;
  @ViewChild('receipt_canvas') receipt_canvas: ElementRef;
  @ViewChild('receipt_downloadLink') receipt_downloadLink: ElementRef;
  txnResult: any = {};
  bgColor = '#13A100';
  constructor(
    private navParam: NavParams,
    public global: GlobalService,
    private socialService: SocialShareService,
    private alertService: AlertService,
  ) {
    this.txnResult = this.navParam.get('txnData');
    console.log(this.txnResult);
    if (this.txnResult.txnStatus === 'S') {
      this.changeStatusBarColor('#13A100');
    } else {
      this.changeStatusBarColor('#f53d3d');
    }
  }

  ngOnInit() {
  }
  changeStatusBarColor(color: string) {
    StatusBar.setBackgroundColor({ color: color }).catch(err => {
      console.log('Status color will not work');
    });
  }
  closeModal() {
    this.changeStatusBarColor('#2E368D');
    this.global.modalCtrl.dismiss();
  }
  getLogoPath(status: string) {
    if (status === 'S') {
      return 'assets/imgs/success.png';
    }
    return 'assets/imgs/failed.png';
  }
  getCurrency(cur: string) {
    return this.global.getTextCurrency(cur);
  }
  formatAmount(amt: string) {
    return this.global.formatAmount(amt);
  }
  maskAccount(acc: string) {
    return this.global.maskAccNumber(acc);
  }
  shareReceipt() {
    html2canvas(this.receipt_screen.nativeElement).then(canvas => {
      this.receipt_canvas.nativeElement.src = canvas.toDataURL();
      this.receipt_downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.socialService.shareFile(this.receipt_canvas.nativeElement.src).then(() => {
      }).catch((err) => {
      });
    });
  }

  async shareFile(base64Data: any, fileName: string='receipt.png') {
    const img=base64Data.replace(/^data:image\/[a-z]+;base64,/, "");
    FileSharer.share({
      filename: fileName,
      contentType: 'image/png',
      base64Data: img,
    }).then(() => {
      console.log('Shared Successfully')
      this.alertService.showToast('File sharing success');
    }).catch(error => {
      console.error("File sharing failed", error.message);
      this.alertService.showToast('File sharing failed');
    });
  }
  get toBankLogo() {
    const toBankId=this.txnResult.toBankId || 'BIC';
    if(toBankId==='BCEL') {
      return 'assets/imgs/bank-logo/27710418.png';
    } else if (toBankId==='LAPNET') {
      return 'assets/imgs/lapnet-sm.png';
    } else if (toBankId==='UMONEY') {
      return 'assets/imgs/umoney.jpg';
    } else if (toBankId==='MMONEY') {
      return 'assets/imgs/lmmdummy.png';
    }
    return 'assets/imgs/bic-logo.png';
  }
}
