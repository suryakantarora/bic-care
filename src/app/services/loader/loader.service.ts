import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { LoadingPage } from 'src/app/shared/popovers/loading/loading.page';
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public loading = true;
  public isLoading = new BehaviorSubject(false);
  constructor(
    private popoverCtrl: PopoverController
  ) { }

  async start() {
    const popover= await this.popoverCtrl.create({
      component: LoadingPage,
      cssClass: 'custom-loading'
    });
    popover.present();
  }
  stop() {
    this.popoverCtrl.dismiss().then(() =>{
      console.log('Loader stopped');
    }).catch((e) => {
      console.log('Loader stopped with exception: ' + e);
    });
  }
}
