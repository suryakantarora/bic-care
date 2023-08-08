import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmTransferPage } from './confirm-transfer.page';

describe('ConfirmTransferPage', () => {
  let component: ConfirmTransferPage;
  let fixture: ComponentFixture<ConfirmTransferPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConfirmTransferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
