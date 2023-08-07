import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-province-list',
  templateUrl: './province-list.page.html',
  styleUrls: ['./province-list.page.scss'],
})
export class ProvinceListPage implements OnInit {
  provinceList: any=[];
  constructor(
    private modalCtrl: ModalController,
    private navParam: NavParams
  ) { 
    this.provinceList=this.navParam.get('provinceList');
  }

  ngOnInit() {
  }
  closeModal(data:any) {
    this.modalCtrl.dismiss(data);
  }
}
