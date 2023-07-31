import { Injectable } from '@angular/core';
import { Share } from '@capacitor/share';
import { FileSharer } from '@byteowls/capacitor-filesharer';
import { Toast } from '@capacitor/toast';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SocialShareService {

  constructor(
    private translate: TranslateService
  ) { }
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
  async shareFile(base64Data: any, fileName: string='') {
    const img=base64Data.replace(/^data:image\/[a-z]+;base64,/, "");
    FileSharer.share({
      filename: fileName,
      contentType: '',
      base64Data: img,
    }).then(() => {
      console.log('Shared Successfully')
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
