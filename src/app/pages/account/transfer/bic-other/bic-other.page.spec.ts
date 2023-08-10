import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BicOtherPage } from './bic-other.page';

describe('BicOtherPage', () => {
  let component: BicOtherPage;
  let fixture: ComponentFixture<BicOtherPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BicOtherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
