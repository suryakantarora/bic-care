import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaptureIdPage } from './capture-id.page';

describe('CaptureIdPage', () => {
  let component: CaptureIdPage;
  let fixture: ComponentFixture<CaptureIdPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CaptureIdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
