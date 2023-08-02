import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrOptionPage } from './qr-option.page';

describe('QrOptionPage', () => {
  let component: QrOptionPage;
  let fixture: ComponentFixture<QrOptionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QrOptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
