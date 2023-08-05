import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrDetailsPage } from './qr-details.page';

describe('QrDetailsPage', () => {
  let component: QrDetailsPage;
  let fixture: ComponentFixture<QrDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QrDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
