import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FtBicBicPage } from './ft-bic-bic.page';

describe('FtBicBicPage', () => {
  let component: FtBicBicPage;
  let fixture: ComponentFixture<FtBicBicPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FtBicBicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
