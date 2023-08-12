import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bic-mmoney',
  templateUrl: './bic-mmoney.component.html',
  styleUrls: ['./bic-mmoney.component.scss'],
})
export class BicMmoneyComponent  implements OnInit {
  @Input() fromAccDetail:any;
  @Input() accList:any;
  @Input() userDetail:any;
  @Input() exchangeRate:any;
  constructor() { }

  ngOnInit() {}

}
