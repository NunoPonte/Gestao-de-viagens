import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListTravelsPage } from './list-travels.page';

describe('ListTravelsPage', () => {
  let component: ListTravelsPage;
  let fixture: ComponentFixture<ListTravelsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTravelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
