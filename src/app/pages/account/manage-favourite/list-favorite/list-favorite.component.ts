import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-list-favorite',
  templateUrl: './list-favorite.component.html',
  styleUrls: ['./list-favorite.component.scss'],
})
export class ListFavoriteComponent  implements OnInit {
  benefList: any=[];
  filterBenefList: any=[];
  showDetail:string;
  constructor(
    private rest: RestService,
    public global: GlobalService,
    private alertService: AlertService
  ) { }

  ngOnInit() { 
    this.initBenefList();
  }
  shoeDetailOfBenef(id:string) {
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
        this.global.timeout()
      } else if (resp.RESP_STATUS == 'SUCCESS') {
        this.benefList=[];
        this.benefList=resp.data;
        this.filterBenefList=resp.data;
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
