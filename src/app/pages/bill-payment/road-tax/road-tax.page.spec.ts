import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoadTaxPage } from './road-tax.page';

describe('RoadTaxPage', () => {
  let component: RoadTaxPage;
  let fixture: ComponentFixture<RoadTaxPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RoadTaxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
