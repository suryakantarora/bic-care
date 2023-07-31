import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateKycPage } from './update-kyc.page';

describe('UpdateKycPage', () => {
  let component: UpdateKycPage;
  let fixture: ComponentFixture<UpdateKycPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateKycPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
