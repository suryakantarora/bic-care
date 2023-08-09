import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageFavouritePage } from './manage-favourite.page';

describe('ManageFavouritePage', () => {
  let component: ManageFavouritePage;
  let fixture: ComponentFixture<ManageFavouritePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ManageFavouritePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
