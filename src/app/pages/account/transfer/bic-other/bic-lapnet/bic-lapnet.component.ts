import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bic-lapnet',
  templateUrl: './bic-lapnet.component.html',
  styleUrls: ['./bic-lapnet.component.scss'],
})
export class BicLapnetComponent  implements OnInit {
  @Input() fromAccDetail:any;
  @Input() accList:any;
  @Input() userDetail:any;
  @Input() exchangeRate:any;
  constructor() { }

  ngOnInit() {}

}
