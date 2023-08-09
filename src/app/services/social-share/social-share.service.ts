import { Injectable } from '@angular/core';
import { Share } from '@capacitor/share';
import { FileSharer, ShareFileOptions } from '@byteowls/capacitor-filesharer';
import { Toast } from '@capacitor/toast';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SocialShareService {

  constructor(
    private translate: TranslateService
  ) { }
  async shareText(title:string='', text:string, url:string='') {
    await Share.share({
      title: title,
      text: text,
      url: url,
      dialogTitle: 'BIC Care',
    }).then(res => {
      console.log('Shared Successfully')
    }).catch(err => {
      console.error('Sharing failed: ' + JSON.stringify(err));
    });
  }
  async share(url: any, title:string='', text:string='') {
    await Share.share({
      title: 'BIC QR Code',
      text: 'Scan this QR to transfer amount',
      url: url,
      dialogTitle: 'BIC Care',
    }).then(res => {
      console.log('Shared Successfully')
    }).catch(err => {
      console.error('Sharing failed: ' + JSON.stringify(err));
    });
  }
  async fileShare(base64Data:string){
    FileSharer.share({
      filename: "qr.png",
      contentType: "image/png",
      base64Data: base64Data
  }).then(() => {
      // do sth
      console.error("File sharing Success");
  }).catch(error => {
      console.error("File sharing failed", error.message);
  });
  }
  async androidFileShare(base64Data:any, fileName:string='BIC_QR.png'){
    const img=base64Data.replace(/^data:image\/[a-z]+;base64,/, "");
    const option: ShareFileOptions = {
      filename: fileName,
      contentType: 'png',
      base64Data: img,
      path: img,
    };
    FileSharer.share(option).then(() => {
      console.log('Shared Successfully')
    }).catch(error => {
      console.error("File sharing failed", error.message);
      this.showToast('File sharing failed');
    });
  }
  async shareFile(base64Data: any, fileName: string='bic.png') {
    const img=base64Data.replace(/^data:image\/[a-z]+;base64,/, "");
    FileSharer.share({
      filename: fileName,
      contentType: 'image/png',
      base64Data: img,
    }).then(() => {
      console.log('Shared Successfully')
      this.showToast('File sharing success');
    }).catch(error => {
      console.error("File sharing failed", error.message);
      this.showToast('File sharing failed');
    });
  }
  async showToast(text:string='Error occured') {
    await Toast.show({
      text: this.translate.instant(text),
      duration: 'long',
      position: 'top'
    });
  }
}
