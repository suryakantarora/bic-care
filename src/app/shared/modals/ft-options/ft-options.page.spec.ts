import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FtOptionsPage } from './ft-options.page';

describe('FtOptionsPage', () => {
  let component: FtOptionsPage;
  let fixture: ComponentFixture<FtOptionsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FtOptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
