import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FtBicBcelPage } from './ft-bic-bcel.page';

describe('FtBicBcelPage', () => {
  let component: FtBicBcelPage;
  let fixture: ComponentFixture<FtBicBcelPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FtBicBcelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
