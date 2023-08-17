import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-select-favorite',
  templateUrl: './select-favorite.page.html',
  styleUrls: ['./select-favorite.page.scss'],
})
export class SelectFavoritePage implements OnInit {
  benefList: any=[];
  filterBenefList: any=[];
  showLoaders=true;
  showDetail: string;

  constructor(
    public global: GlobalService,
    private rest: RestService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.initBenefList();
  }
  closeModal(data:any) {
    this.global.modalCtrl.dismiss(data);
  }
  showDetailOfBenef(id:string) {
    if (this.showDetail=== id) {
      this.showDetail= '';
    } else {
      this.showDetail= id;
    }
  }
  getImageLogo(bankId:string) {
    if (bankId === 'BIC') {
      return 'assets/imgs/bic-logo.png';
    } else {
      return this.global.getLogoPath(bankId);
    }
  }
  initBenefList() {
    this.rest.fetchBeneficiary().then(resp => {
      if (resp.RESP_CODE === 'MPAY1019') {
        this.closeModal('');
        this.global.timeout()
      } else if (resp.RESP_STATUS == 'SUCCESS') {
        this.benefList=[];
        this.benefList=resp.data;
        this.filterBenefList=resp.data;
        this.showLoaders=false;
      } else {
        this.alertService.showAlert('ALERT', resp.REASON || resp.RESP_CODE);
      }
    }).catch(err => {
      this.rest.closeLoader();
    });
  }
  fetchInterBeneficiary() {
    this.rest.fetchInterBeneficiary().then(resp => {
      if (resp.RESP_CODE === 'MPAY1019') {
        this.closeModal('');
        this.global.timeout()
      } else if (resp.RESP_STATUS == 'SUCCESS') {
        this.benefList=[];
        this.benefList=resp.data;
        this.filterBenefList=resp.data;
        this.showLoaders=false;
      } else {
        this.alertService.showAlert('ALERT', resp.REASON || resp.RESP_CODE);
      }
    }).catch(err => {
      this.rest.closeLoader();
    });
  }
  searchBenef(event:any) {
    const query = event.target.value.toLowerCase();
    this.benefList = this.filterBenefList.filter((d:any) => d.accountName.toLowerCase().indexOf(query) > -1);
  }
}
