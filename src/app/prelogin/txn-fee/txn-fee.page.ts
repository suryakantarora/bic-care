import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-txn-fee',
  templateUrl: './txn-fee.page.html',
  styleUrls: ['./txn-fee.page.scss'],
})
export class TxnFeePage implements OnInit {
  feeList: any = [];
  activeTab = 'TXN_FEE';
  txnCurrency = 'LAK';
  lakData:any = [];
  usdData:any=[];
  thbData:any=[];
  bicToBicTxn:any=[];
  offUsTxn:any=[];
  bicToBcelTxn:any=[];
  mMoneyTxn:any=[];
  // lakTxnFeeType:any = [{txnType:'OFFUS_FT',desc:'Other Bank Txn'},{txnType:'UMONEY_FEE',desc:'Umoney Fee'}, {txnType:'MMONEY_FEE',desc:'Mmoney Fee'}]
  txnType:any={LAK:[], USD:[], THB:[]}

  constructor(
    private alertService: AlertService,
    private global: GlobalService,
    private rest: RestService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.fetchTxnFee();
    this.fetchTxnLimit();

  }
  pop() {
    this.navCtrl.pop();
  }

  getTxnTypes(data:any){
    // need to write login here for how many types of transactions are there in data
    const temp1=[];
    const temp2: any[]=[];  
    for( let i of data){
      for(let j of Object.keys(i)){
        if(j === 'txnType'){
          temp1.push(i[j]);
        }
      }
    }
    for(let i of temp1){
      if(!temp2.includes(i)){
       temp2.push(i);
      }
    }
    return temp2;
  }

  async fetchTxnFee() {
    this.rest.fetchTxnFee().then(res => {
      // console.log('TXN Fee: ' + JSON.stringify(res));
      if(res.RESP_STATUS === 'SUCCESS'){
        const data = res.data;
        this.txnFeeData(data);
        console.log('THE TYPES ARE :'+JSON.stringify(this.txnType));
      } else{
        this.alertService.showAlert('Alert',res.RESP_STATUS);
      }
    }, err => {
      console.log('Error: ' + err);
    });
  }

  async fetchTxnLimit(){
    this.rest.fetchTxnLimit().then((res:any)=>{
      if(res.RESP_STATUS === 'SUCCESS'){
        const data = res.data;
        this.txnLimitData(data);
      }
    })
  }


  txnFeeData(data:any){
    for( let i of data){
      if(i.feeCCY === 'LAK'){
        this.lakData.push(i);
      } else if(i.feeCCY === 'USD'){
        this.usdData.push(i);
      }else if(i.feeCCY === 'THB'){
        this.thbData.push(i);
      }
    }
    this.txnType.LAK = this.getTxnTypes(this.lakData);
    this.txnType.USD = this.getTxnTypes(this.usdData);
    this.txnType.THB = this.getTxnTypes(this.thbData); 
  }


  txnLimitData(data:any){
    for(let i of data){
      if(i.txnType === 'BIC_BIC'){
        this.bicToBicTxn.push(i);
      }else if(i.txnType === 'OFFUS_FT'){
        this.offUsTxn.push(i);
      }else if(i.txnType === 'BIC_BCEL'){
        this.bicToBcelTxn.push(i);
      }else if(i.txnType === 'MMONEY'){
        this.mMoneyTxn.push(i);
      }
    }    

  }

  currencyFormatter(data:any){
    // return this.currencyPipe.transform(data,'','symbol');
    // if(currencyCode === 'LAK'){
    //   return formatNumber(data,"en-US");
    // } else{
    //   return this.decimalPipe.transform(data,'0.2.2')
    // }
    return this.global.formatAmount(data);
}
}
