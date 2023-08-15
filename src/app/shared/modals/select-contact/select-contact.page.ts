import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-select-contact',
  templateUrl: './select-contact.page.html',
  styleUrls: ['./select-contact.page.scss'],
})
export class SelectContactPage implements OnInit {
  contactList: any=[];

  constructor(
    private navParam: NavParams,
    private modalCtrl: ModalController
  ) {
    this.contactList= this.navParam.data || [];
  }

  ngOnInit() {
  }

  closeModal(data:any) {
    this.modalCtrl.dismiss(data);
  }
}
