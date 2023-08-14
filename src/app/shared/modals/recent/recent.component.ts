import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss'],
})
export class RecentComponent  implements OnInit {
  @Input() recent:any=[];
  @Output() viewDetail: EventEmitter<any>= new EventEmitter();
  showRecent=true;
  constructor(
    public global: GlobalService
  ) { }

  ngOnInit() {}
  showTxnDetail(txn: any) {
    this.viewDetail.emit(txn);
  }
  closeModal() {
    this.viewDetail.emit('EXIT');
  }
}
