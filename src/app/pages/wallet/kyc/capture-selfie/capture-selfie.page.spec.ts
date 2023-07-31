import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaptureSelfiePage } from './capture-selfie.page';

describe('CaptureSelfiePage', () => {
  let component: CaptureSelfiePage;
  let fixture: ComponentFixture<CaptureSelfiePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CaptureSelfiePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
