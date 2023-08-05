import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaterBillPage } from './water-bill.page';

describe('WaterBillPage', () => {
  let component: WaterBillPage;
  let fixture: ComponentFixture<WaterBillPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WaterBillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
