import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.page.html',
  styleUrls: ['./select-date.page.scss'],
})
export class SelectDatePage implements OnInit {
  selectedDate:any;
  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
  }
  close(datetime: any) {
    console.log('datetime: ' + datetime);
    this.popoverCtrl.dismiss(datetime);
  }
}
