import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdlPaymentPage } from './edl-payment.page';

describe('EdlPaymentPage', () => {
  let component: EdlPaymentPage;
  let fixture: ComponentFixture<EdlPaymentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EdlPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
