import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KycStatusPage } from './kyc-status.page';

describe('KycStatusPage', () => {
  let component: KycStatusPage;
  let fixture: ComponentFixture<KycStatusPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(KycStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
