import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-atm-location',
  templateUrl: './atm-location.page.html',
  styleUrls: ['./atm-location.page.scss'],
})
export class AtmLocationPage implements OnInit {
  atmList:any=[];
  constructor() { }

  ngOnInit() {
    this.initAtmList();
  }
  initAtmList(){
    this.atmList=[
      {status: 'I', atmName: 'SVNK Service Unit'},
      {status: 'A', atmName: 'BIC Bank Lao Co. Ltd.'},
      {status: 'A', atmName: 'BIC Bank LPB'},
      {status: 'A', atmName: 'PTT Naxai'},
      {status: 'I', atmName: 'BIC Test Bank'},
    ];
  }
}
