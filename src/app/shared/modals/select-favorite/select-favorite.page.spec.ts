import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectFavoritePage } from './select-favorite.page';

describe('SelectFavoritePage', () => {
  let component: SelectFavoritePage;
  let fixture: ComponentFixture<SelectFavoritePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SelectFavoritePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
