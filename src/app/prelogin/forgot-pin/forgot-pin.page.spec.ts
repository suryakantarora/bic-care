import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPinPage } from './forgot-pin.page';

describe('ForgotPinPage', () => {
  let component: ForgotPinPage;
  let fixture: ComponentFixture<ForgotPinPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ForgotPinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
