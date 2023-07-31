import { Component, OnInit, ViewChild } from '@angular/core';
import { CaptureSelfiePage } from '../capture-selfie/capture-selfie.page';
import { AlertService } from 'src/app/services/alert/alert.service';
import { RestService } from 'src/app/services/rest/rest.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-update-kyc',
  templateUrl: './update-kyc.page.html',
  styleUrls: ['./update-kyc.page.scss'],
})
export class UpdateKycPage implements OnInit {
  @ViewChild(CaptureSelfiePage, { static: false }) selfiePage: CaptureSelfiePage;
  activeIndex=3;
  selfie:string='';
  idCard:string='';
  currentStepper='1';
  constructor(
    private alertService: AlertService,
    private rest: RestService,
    private global: GlobalService
  ) { }

  ngOnInit() {
  }
  goNext() {
    if(this.activeIndex>=1) {
      this.activeIndex+=1;
    }
  }
  async openCamera() {
    console.log('Opening camera');
    this.goNext();
  }
  goBack() {
    if(this.activeIndex>1) {
      this.activeIndex-=1;
    }
  }
  captureSelfie(ev:any) {
    console.log('Captured Selfie: ');
    this.selfie=ev;
  }
  captureIdCard(ev:any) {
    console.log('Captured ID: ');
    this.idCard=ev;
  }
  triggerCaptureSelfie() {
    console.log('Clicked on capture selfie');
    this.selfiePage.captureSelfie();
  }
  takePicture() {
    this.selfie='';
    this.selfiePage.takePicture();
  }
  reTakePicture() {
    this.selfie='';
    this.selfiePage.takePicture();
  }
  stopCamera() {
    this.selfiePage.stopCamera();
  }
  proceedForIdCard() {
    this.idCard='';
    this.goNext();
  }

  takeIdPicture() {
    this.idCard='';
    this.selfiePage.takePicture();
  }
  reTakeIdPicture() {
    this.idCard='';
    this.selfiePage.takePicture();
  }
  submitForm() {
    
  }
}
