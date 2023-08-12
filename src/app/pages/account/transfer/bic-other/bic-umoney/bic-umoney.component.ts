import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bic-umoney',
  templateUrl: './bic-umoney.component.html',
  styleUrls: ['./bic-umoney.component.scss'],
})
export class BicUmoneyComponent  implements OnInit {
  @Input() fromAccDetail:any;
  @Input() accList:any;
  @Input() userDetail:any;
  @Input() exchangeRate:any;

  constructor() { }

  ngOnInit() {}

}
