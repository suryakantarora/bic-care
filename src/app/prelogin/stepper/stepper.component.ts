import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent  implements OnInit {
  @Input() activeIndex:number=1;
  @Input() totalSteppers:number=5;
  @Output() clickedTab = new EventEmitter<number>();
  steppers:any=[];
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
