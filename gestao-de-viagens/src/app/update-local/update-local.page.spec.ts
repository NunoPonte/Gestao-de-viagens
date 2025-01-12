import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateLocalPage } from './update-local.page';

describe('UpdateLocalPage', () => {
  let component: UpdateLocalPage;
  let fixture: ComponentFixture<UpdateLocalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLocalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
