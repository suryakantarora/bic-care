import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BillPaymentPage } from './bill-payment.page';

describe('BillPaymentPage', () => {
  let component: BillPaymentPage;
  let fixture: ComponentFixture<BillPaymentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BillPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
