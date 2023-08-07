import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProvinceListPage } from './province-list.page';

describe('ProvinceListPage', () => {
  let component: ProvinceListPage;
  let fixture: ComponentFixture<ProvinceListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProvinceListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
