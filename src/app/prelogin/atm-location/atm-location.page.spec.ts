import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtmLocationPage } from './atm-location.page';

describe('AtmLocationPage', () => {
  let component: AtmLocationPage;
  let fixture: ComponentFixture<AtmLocationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AtmLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
