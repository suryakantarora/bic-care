import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-atm-location',
  templateUrl: './atm-location.page.html',
  styleUrls: ['./atm-location.page.scss'],
})
export class AtmLocationPage implements OnInit {
  atmList:any=[];
  constructor(
    private rest: RestService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.fetchAtmList();
  }
  async fetchAtmList() {
    console.log('Sending request');
    this.rest.fetchAtmList().then(res=>{
      console.log('ATM List Resp: ' + JSON.stringify(res));
      if(res.RESP_STATUS==='SUCCESS'){
        this.atmList=res.data;
      } else {
        this.atmList=[];
        this.alertService.showAlert('ALERT', res.RESP_CODE);
      }
    }).catch(err => {
      console.error('ATM List Error: ' + JSON.stringify(err));
    })
  }
}
// 0008001009009