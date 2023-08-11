import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.page.html',
  styleUrls: ['./bank-list.page.scss'],
})
export class BankListPage implements OnInit {
  bankList:any=[]; /* [{"memberId":"LDB","memberName":"Lao Development Bank","memberIIN":"70030418","status":"1"},
  {"memberId":"IDB","memberName":"IndoChina Bank","memberIIN":"70140418","status":"1"},
  {"memberId":"MJB","memberName":"Maruhan Japan Bank Lao","memberIIN":"70040418","status":"1"},
  {"memberId":"APB","memberName":"Agricultural Promotion Bank","memberIIN":"70020418","status":"1"},
  {"memberId":"VMB","memberName":"Military Commercial Joint Stock Bank","memberIIN":"70190418","status":"1"},
  {"memberId":"PSV","memberName":"Phongsavanh Bank","memberIIN":"29110418","status":"1"},
  {"memberId":"BFL","memberName":"Banque Franco-Lao","memberIIN":"37160418","status":"1"},
  {"memberId":"BCEL","memberName":"Banque Pour Le Commerce Exterieur Lao","memberIIN":"27710418","status":"1"},
  {"memberId":"JDB","memberName":"Joint Development Bank","memberIIN":"32170418","status":"1"},
  {"memberId":"LVB","memberName":"Lao Viet Bank","memberIIN":"70050418","status":"1"},
  {"memberId":"VTB","memberName":"Vietin Bank","memberIIN":"70120418","status":"1"},
  {"memberId":"ACLE","memberName":"ACLEDA Bank","memberIIN":"70080418","status":"1"},
  {"memberName":"ST Bank","memberId":"STB","status":"1","memberIIN":"70150418"},
  {"memberName":"CAMBODIA","memberId":"CAMBODIA","status":"1","memberIIN":"CAMBODIA"}]; */
  
  constructor(
    private global: GlobalService,
    private rest: RestService,
    private alertService:AlertService
  ) { }

  ngOnInit() {
    this.initBankList();
  }
  fetchImage(id:string) {
    return this.global.getLogoPath(id);
  }
  initBankList() {
    this.rest.fetchBankList().then(resp=>{
      if (resp.RESP_CODE === 'MPAY1019') {
        this.global.timeout()
      } else if (resp.RESP_STATUS == 'SUCCESS') {
        this.bankList= resp.lmpsMemberList;
      } else {
        this.alertService.showAlert('ALERT', resp.REASON || resp.RESP_CODE);
      }
    }).catch(err=> {
    });
  }
  closeModal(data:any) {
    this.global.modalCtrl.dismiss(data);
  }
}
