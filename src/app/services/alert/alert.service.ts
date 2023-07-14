import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AlertPage } from 'src/app/shared/popovers/alert/alert.page';
import { Toast } from '@capacitor/toast';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private popover: PopoverController,
  ) { }
  showToast = async (msg:string) => {
    await Toast.show({
      text: msg,
      duration: 'long',
      position: 'top'
    });
  };
  async showAlert(title: string, message: string) {
    const type = 'ALERT';
    const img = 'assets/imgs/alert-2.png';
    const popover = await this.popover.create({
      component: AlertPage,
      componentProps: { title, message, type, img },
      mode: 'ios',
      backdropDismiss: true,
      showBackdrop: true,
      cssClass: 'custom-alert'
    });
    await popover.present();
  }

  async showConfirmAlert(title: string, message: string) {
    const type = 'CNF_ALERT';
    const img = 'assets/imgs/alert.png';
    const popover = await this.popover.create({
      component: AlertPage,
      componentProps: { title, message, type, img },
      mode: 'ios',
      backdropDismiss: true,
      showBackdrop: true,
      cssClass: 'custom-alert'
    });
    return popover;
  }
  async showSuccessAlert(title: string, message: string) {
    const type = 'SUCCESS_ALERT';
    const img = 'assets/imgs/success-2.png';
    const popover = await this.popover.create({
      component: AlertPage,
      componentProps: { title, message, type, img },
      mode: 'ios',
      backdropDismiss: true,
      showBackdrop: true,
      cssClass: 'custom-alert'
    });
    await popover.present();
  }
  async showFailedAlert(title: string, message: string) {
    const type = 'FAIL_ALERT';
    const img = 'assets/imgs/failed.png';
    const popover = await this.popover.create({
      component: AlertPage,
      componentProps: { title, message, type, img },
      mode: 'ios',
      backdropDismiss: true,
      showBackdrop: true,
      cssClass: 'custom-alert'
    });
    await popover.present();
  }
}
