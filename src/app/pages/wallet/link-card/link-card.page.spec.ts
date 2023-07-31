import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkCardPage } from './link-card.page';

describe('LinkCardPage', () => {
  let component: LinkCardPage;
  let fixture: ComponentFixture<LinkCardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LinkCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
