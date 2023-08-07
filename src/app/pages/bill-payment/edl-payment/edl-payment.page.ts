import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Device } from '@capacitor/device';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';
import { ProvinceListPage } from 'src/app/shared/modals/province-list/province-list.page';

@Component({
  selector: 'app-edl-payment',
  templateUrl: './edl-payment.page.html',
  styleUrls: ['./edl-payment.page.scss'],
})
export class EdlPaymentPage implements OnInit {
  edlEnquiryForm= new FormGroup({
    province: new FormControl('', [Validators.required]),
    billNo: new FormControl('', [Validators.required])
  })
  deviceId: string;
  provinceList: any=[];
  pageStatus=1;
  constructor(
    private rest: RestService,
    private alertService: AlertService,
    private global: GlobalService
  ) { }

  ngOnInit() {
    this.getDeviceId();
  }
  
  async getDeviceId() {
    await Device.getId().then(res => {
      console.log('Device ID: ' + JSON.stringify(res));
      this.deviceId=res.identifier;
    }).catch((err) => {
      console.error(err)
    });
  }
  async openProvinceList() {
    if(this.provinceList.length<=0) {
      this.alertService.showToast('NO_DATA_FOUND');
      return;
    } 
    const modal= await this.global.modalCtrl.create({
      component: ProvinceListPage,
      componentProps: {provinceList: this.provinceList}
    });
    await modal.present();
    const {data} = await modal.onDidDismiss();
    console.log('Selected Province: ' + JSON.stringify(data));
  }
  searchBillNumber() {
    this.alertService.showToast('Please enter account number')
  }
  fetchProvinceList() {
    this.rest.fetchProvinceList(this.deviceId).then(resp => {
      if (resp.RESP_CODE === 'MPAY1019') {
        this.global.timeout();
      } else if (resp.RESP_STATUS === 'SUCCESS') {
        this.provinceList=resp.PROVINCE_LIST;
      } else {
        this.global.pop();
        this.alertService.showAlert('ALERT', resp.REASON || resp.RESP_CODE);
      }
    }).catch(err =>{
      this.rest.closeLoader();
    });
  }
}
