import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListLocalPage } from './list-local.page';

describe('ListLocalPage', () => {
  let component: ListLocalPage;
  let fixture: ComponentFixture<ListLocalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLocalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
