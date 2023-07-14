import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent  implements OnInit {
  @Input() activeIndex:number=1;
  @Output() clickedTab = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {}
  getNum(num:any){
    return Number(num);
  }
  sendOutput(num:number){
    if(num <= this.activeIndex) {
      this.clickedTab.emit(num);
    }
  }
}
