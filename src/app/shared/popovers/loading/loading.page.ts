import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {
  loading: boolean=false;
  loader:any;
  lodaerStarted:boolean=false;
  constructor(public loaderService: LoaderService, private popoverCtrl:PopoverController) {
    this.loading=false;
    console.log('Loader component loaded');
    this.loaderService.isLoading.subscribe((isLoading) => {
      /* this.loading = isLoading;
      console.log('is Loading: ' + this.loading);
      this.loaderService.loading=isLoading; */
      if(isLoading) {
        this.start('Please wait');
        this.lodaerStarted=true;
      } else if (this.lodaerStarted) {
        this.stop();
        this.lodaerStarted=false;
      }
    });
   }

  ngOnInit() {
  }
  async start(data:string){
    console.log('Show Loading: true')
  }
  stop() {
    console.log('Show Loading: false')
  }
}
