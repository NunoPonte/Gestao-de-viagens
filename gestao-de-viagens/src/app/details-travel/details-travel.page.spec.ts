import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsTravelPage } from './details-travel.page';

describe('DetailsTravelPage', () => {
  let component: DetailsTravelPage;
  let fixture: ComponentFixture<DetailsTravelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTravelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
